#!/usr/bin/env python3
"""Extract published posts from a WordPress phpMyAdmin SQL dump into draft JSON.

Adapted from the blog-migration plan's WXR-based extractor: the environment
this ran in had a MySQL dump (from the site's hosting) rather than a WXR XML
export, so this reads `wp_posts` / `wp_postmeta` / `wp_terms` /
`wp_term_taxonomy` / `wp_term_relationships` / `wp_users` directly instead of
parsing `<item>` elements. The *output* shape is identical to what the plan
specifies: one draft JSON file per published post in `--output`, with `body`
already split into `html` / `cta` segments ready for Phase 2c curation.

Usage:
    python3 scripts/extract-wp-posts.py \
        --source .local/db_dom502410.sql \
        --output .local/wp-extract
"""

import argparse
import json
import re
from html import unescape
from pathlib import Path

TABLE_PREFIX_RE = re.compile(r"CREATE TABLE `(wp_[a-f0-9]+_)posts`")


def decode_mysql_escape(s):
    out = []
    i = 0
    while i < len(s):
        if s[i] == "\\" and i + 1 < len(s):
            n = s[i + 1]
            mapping = {
                "0": "\0", "'": "'", '"': '"', "b": "\b", "n": "\n",
                "r": "\r", "t": "\t", "Z": "\x1a", "\\": "\\", "%": "%", "_": "_",
            }
            out.append(mapping.get(n, n))
            i += 2
        else:
            out.append(s[i])
            i += 1
    return "".join(out)


def parse_mysql_values(line):
    fields = []
    i, n = 0, len(line)
    while i < n:
        if line[i] == ",":
            i += 1
            if i < n and line[i] == " ":
                i += 1
            continue
        if line[i] == "'":
            i += 1
            value = []
            while i < n:
                if line[i] == "\\" and i + 1 < n:
                    value.append(line[i : i + 2])
                    i += 2
                    continue
                if line[i] == "'":
                    i += 1
                    break
                value.append(line[i])
                i += 1
            fields.append(decode_mysql_escape("".join(value)))
        elif line[i : i + 4] == "NULL":
            fields.append(None)
            i += 4
        else:
            start = i
            while i < n and line[i] != ",":
                i += 1
            fields.append(line[start:i])
    return fields


def parse_insert_rows(sql, table_name):
    pattern = re.compile(
        r"INSERT INTO `%s` \([^\n]+\) VALUES(.*?)\n(?=INSERT|CREATE|-- |$)" % re.escape(table_name),
        re.DOTALL,
    )
    for block in pattern.findall(sql):
        for raw in block.splitlines():
            raw = raw.strip()
            if not raw.startswith("("):
                continue
            if raw.endswith("),"):
                line = raw[1:-2]
            elif raw.endswith(");"):
                line = raw[1:-2]
            else:
                continue
            row = parse_mysql_values(line)
            if row:
                yield row


def find_table_prefix(sql):
    m = TABLE_PREFIX_RE.search(sql)
    if not m:
        raise SystemExit("Could not find a `..._posts` table in the dump")
    return m.group(1)


def strip_tags(text):
    return unescape(re.sub(r"<[^>]+>", "", text or "")).strip()


def extract_cta(block_html):
    title = re.search(
        r'<[a-z0-9]+[^>]*class="[^"]*impact-cta-title[^"]*"[^>]*>(.*?)</[a-z0-9]+>', block_html, re.S
    )
    btn = re.search(r'<a[^>]*class="[^"]*impact-cta-btn[^"]*"[^>]*href="([^"]*)"[^>]*>(.*?)</a>', block_html, re.S)
    return {
        "type": "cta",
        "title": strip_tags(title.group(1)) if title else "",
        "buttonLabel": strip_tags(btn.group(2)) if btn else "",
        "buttonHref": unescape(btn.group(1)) if btn else "",
        "theme": "teal",
    }


def split_ctas(html_str):
    """Cut each `<div ... class="impact-cta-strip ...">...</div>` (balanced)
    out of the content, producing alternating html / cta segments."""
    segments, pos = [], 0
    while True:
        m = re.search(r'<div[^>]*class="[^"]*impact-cta-strip', html_str[pos:])
        if not m:
            break
        start = pos + m.start()
        depth, end = 0, None
        for t in re.finditer(r"<div\b|</div>", html_str[start:]):
            depth += 1 if t.group(0).startswith("<div") else -1
            if depth == 0:
                end = start + t.end()
                break
        if end is None:
            break
        before = html_str[pos:start].strip()
        if before:
            segments.append({"type": "html", "html": before})
        segments.append(extract_cta(html_str[start:end]))
        pos = end
    tail = html_str[pos:].strip()
    if tail:
        segments.append({"type": "html", "html": tail})
    return segments


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", required=True)
    ap.add_argument("--output", required=True)
    args = ap.parse_args()

    with open(args.source, "r", encoding="utf-8", errors="ignore") as f:
        sql = f.read()

    prefix = find_table_prefix(sql)

    users = {}
    for row in parse_insert_rows(sql, f"{prefix}users"):
        if len(row) < 10:
            continue
        users[row[0]] = row[9] or row[3] or row[1]

    terms = {}
    for row in parse_insert_rows(sql, f"{prefix}terms"):
        if len(row) < 3:
            continue
        terms[row[0]] = {"name": row[1], "slug": row[2]}

    category_tt_ids = {}
    for row in parse_insert_rows(sql, f"{prefix}term_taxonomy"):
        if len(row) < 3:
            continue
        tt_id, term_id, taxonomy = row[0], row[1], row[2]
        if taxonomy == "category":
            category_tt_ids[tt_id] = term_id

    post_category_slugs = {}
    for row in parse_insert_rows(sql, f"{prefix}term_relationships"):
        if len(row) < 2:
            continue
        object_id, tt_id = row[0], row[1]
        term_id = category_tt_ids.get(tt_id)
        if not term_id or term_id not in terms:
            continue
        post_category_slugs.setdefault(object_id, []).append(terms[term_id]["slug"])

    attachments = {}
    for row in parse_insert_rows(sql, f"{prefix}posts"):
        if len(row) < 21 or row[20] != "attachment":
            continue
        attachments[row[0]] = {"guid": row[18], "title": row[5]}

    attachment_meta = {aid: {} for aid in attachments}
    postmeta = {}
    for row in parse_insert_rows(sql, f"{prefix}postmeta"):
        if len(row) < 4:
            continue
        pid, key, value = row[1], row[2], row[3]
        if pid in attachment_meta:
            attachment_meta[pid][key] = value
        postmeta.setdefault(pid, {})[key] = value

    for aid, meta in attachment_meta.items():
        attachments[aid]["file"] = meta.get("_wp_attached_file", "")

    def hero_url(pid):
        thumb_id = postmeta.get(pid, {}).get("_thumbnail_id")
        att = attachments.get(thumb_id)
        return att["guid"] if att else None

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)
    index = []

    for row in parse_insert_rows(sql, f"{prefix}posts"):
        if len(row) < 21:
            continue
        pid, author_id = row[0], row[1]
        post_type, status = row[20], row[7]
        if post_type != "post" or status != "publish":
            continue

        meta = postmeta.get(pid, {})
        slug = row[11]
        content = row[4]

        draft = {
            "title": strip_tags(row[5]),
            "slug": slug,
            "status": "draft",
            "publishedDate": row[3],
            "excerpt": strip_tags(row[6]),
            "author": users.get(author_id, ""),
            "categories": post_category_slugs.get(pid, []),
            "seoTitle": meta.get("_yoast_wpseo_title", ""),
            "seoDescription": meta.get("_yoast_wpseo_metadesc", ""),
            "canonical": meta.get("_yoast_wpseo_canonical", ""),
            "body": split_ctas(content),
            "_wp": {
                "legacyId": int(pid),
                "link": row[18],
                "focusKeyword": meta.get("_yoast_wpseo_focuskw", ""),
                "heroImageUrl": hero_url(pid),
            },
        }
        (out_dir / f"{slug}.json").write_text(json.dumps(draft, indent=2, ensure_ascii=False))
        index.append(
            {
                "slug": slug,
                "title": draft["title"],
                "ctas": sum(1 for s in draft["body"] if s["type"] == "cta"),
            }
        )

    (out_dir / "index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False))
    print(f"Wrote {len(index)} drafts to {out_dir}")


if __name__ == "__main__":
    main()
