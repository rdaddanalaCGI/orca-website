#!/usr/bin/env python3
"""Curate `.local/wp-extract/<slug>.json` drafts into final
`blog-content/posts/<slug>.json` files, per the blog-migration plan's Phase 2c
checklist:

  1. Clean each `html` segment: strip Word/Google-Docs paste noise
     (`data-*`, `aria-level`, `lang`, `style`, `class`), unwrap `<span>`
     wrappers, collapse stray `&nbsp;`.
  2. Remove `<img>` tags (old-site URLs are dead); where a local copy of the
     post's first image exists under `blog-content/assets/`, use it as the
     `heroImage` instead.
  3. Fix internal links: `orcaworks.ai/blog/<slug>/` -> `/blog/<slug>`; the
     two dead CTA-only routes (`/see-orca-in-action/`, `/meet-an-expert/`)
     -> `/contact`; anything else matching a real static route -> relative;
     otherwise left as an absolute external link.
  4. `author` -> "Orcaworks" (the WP site only ever had the one admin user).
  5. `excerpt` generated from the first cleaned paragraph when WordPress
     never set one (true for all 30 posts here).
  6. `status: "published"`, `robots: "index-follow"` by default.

Usage:
    python3 scripts/curate-wp-drafts.py \
        --drafts .local/wp-extract \
        --assets blog-content/assets \
        --output blog-content/posts
"""

import argparse
import json
import re
from html import unescape
from pathlib import Path

NOISE_ATTR_RE = re.compile(
    r'\s+(?:data-[\w-]+|aria-level|lang|style|class|target)="[^"]*"', re.IGNORECASE
)
SPAN_RE = re.compile(r"</?span[^>]*>", re.IGNORECASE)
DIV_RE = re.compile(r"</?div[^>]*>", re.IGNORECASE)
IMG_RE = re.compile(r"<img\b[^>]*>", re.IGNORECASE)
NBSP_ONLY_LINE_RE = re.compile(r"^\s*(?:&nbsp;|\xa0)+\s*$", re.MULTILINE)
EMPTY_ELEMENT_RE = re.compile(r"<(strong|b|em|i|u)>\s*</\1>", re.IGNORECASE)
MULTI_BLANK_RE = re.compile(r"\n{3,}")

# CTA-only routes that never existed as real pages.
_CTA_ROUTES = {
    "/see-orca-in-action/": "/contact",
    "/meet-an-expert/": "/contact",
}

# Old root-level WordPress post permalinks whose slug changed by the time of
# migration (post_name no longer matches the URL other posts link to it by).
# Everything else under /blog/<slug>/ is handled generically below.
_RENAMED_POST_SLUGS = {
    "/what-are-agentic-graph-systems-a-complete-guide-to-architecture-benefits-and-use-cases/": (
        "/blog/what-are-agentic-graph-systems"
    ),
}

# Old flat AI Agent Handbook chapter URLs -> their new nested Nextra routes
# (build/understand/scale), matched by chapter title against
# src/content/ai-agent-handbook/**/index.mdx frontmatter.
_HANDBOOK_CHAPTERS = {
    "/ai-agent-handbook/anatomy-of-an-agent/": "/ai-agent-handbook/build/anatomy",
    "/ai-agent-handbook/evaluating-performance/": "/ai-agent-handbook/build/evals",
    "/ai-agent-handbook/from-tasks-to-workflow/": "/ai-agent-handbook/build/graphs",
    "/ai-agent-handbook/managing-api-costs-and-throttling/": "/ai-agent-handbook/scale/gateway",
    "/ai-agent-handbook/monitoring-and-observability/": "/ai-agent-handbook/scale/observability",
    "/ai-agent-handbook/security-privacy-and-compliance/": "/ai-agent-handbook/scale/security",
    "/ai-agent-handbook/why-agents/": "/ai-agent-handbook/understand/why-agents",
    "/ai-agent-handbook/why-stochastic-systems-need-rethinking/": "/ai-agent-handbook/understand/eval",
    "/ai-agent-handbook/why-you-need-a-data-pipeline/": "/ai-agent-handbook/understand/data-pipeline",
    "/ai-agent-handbook/working-with-data/": "/ai-agent-handbook/build/rag",
}

# Pages that still exist under the same path -> just made relative.
_STILL_LIVE = [
    "/agentic-automation-platform/",
    "/ai-agent-handbook/",
    "/ai-applications/agentic-ai-bids-and-proposals/",
    "/enterprise-ai-safety-handbook/",
    "/expert-column/abhinav-somaraju/",
    "/faq/",
    "/industries/",
]

# Old pages with no surviving equivalent -> closest existing static page.
# (Not added to src/lib/redirects.ts: url-completeness.test.ts requires every
# redirect destination to be a static path, so a runtime redirect can't target
# /blog/<slug> or a nested handbook route anyway - rewriting the link here is
# the actual fix, same as the /blog/<slug> and handbook-chapter cases above.)
_BEST_FIT = {
    "/agentic-process-automation/": "/agentic-automation-platform",
    "/ai-applications/agentic-process-automation/": "/agentic-automation-platform",
    "/ai-applications/agentic-ai-document-driven-operations/": "/solutions",
    "/industries/agentic-ai-automation-for-construction/": "/solutions/architecture-construction-engineering",
    "/industries/agentic-ai-automation-for-facilities-management/": "/solutions/facilities-management",
    "/orcaworks-real-world-ai-pilots/": "/blog",
}

INTERNAL_LINK_MAP = {
    **_CTA_ROUTES,
    **_RENAMED_POST_SLUGS,
    **_HANDBOOK_CHAPTERS,
    **{path: path.rstrip("/") for path in _STILL_LIVE},
    **_BEST_FIT,
}
# Every mapping above is keyed with a trailing slash except CTA routes (which
# WordPress rendered both ways) - accept both forms for all of them.
INTERNAL_LINK_MAP.update({path.rstrip("/"): dest for path, dest in list(INTERNAL_LINK_MAP.items()) if path.endswith("/")})


def rewrite_internal_links(html_str, known_slugs):
    def repl(m):
        path = m.group(1) or "/"
        mapped = INTERNAL_LINK_MAP.get(path)
        if mapped:
            return f'href="{mapped}"'
        blog_match = re.match(r"^/blog/([a-z0-9-]+)/?$", path)
        if blog_match:
            return f'href="/blog/{blog_match.group(1)}"'
        # WordPress's permalink structure put posts at the root, e.g.
        # /agentic-ai-vs-ai-agents-vs-rpa/ - only rewrite these to /blog/<slug>
        # when the slug is one we actually migrated, so an old top-level page
        # (or a slug we don't recognize) doesn't get misrouted into /blog.
        root_match = re.match(r"^/([a-z0-9-]+)/?$", path)
        if root_match and root_match.group(1) in known_slugs:
            return f'href="/blog/{root_match.group(1)}"'
        if path in ("", "/"):
            return 'href="/"'
        return m.group(0)

    return re.sub(r'href="https?://(?:www\.)?orcaworks\.ai(/[^"]*)?"', repl, html_str)


EMBED_SHORTCODE_RE = re.compile(r"\[embed\](https?://[^\[\s]+)\[/embed\]", re.IGNORECASE)
YOUTUBE_IFRAME_RE = re.compile(
    r'<iframe\b[^>]*title="([^"]*)"[^>]*src="https://www\.youtube\.com/embed/([\w-]+)[^"]*"[^>]*>(?:\s*</iframe>)?',
    re.IGNORECASE,
)


def replace_video_embeds(html_str):
    """The renderer has no iframe support (and the CSP wouldn't allow a
    youtube.com frame-src anyway), so a raw [embed] shortcode or <iframe>
    would otherwise survive as literal text or silently vanish. Replace both
    with a plain link to the video instead of dropping the content."""
    html_str = EMBED_SHORTCODE_RE.sub(lambda m: f'<p><a href="{m.group(1)}">Watch on YouTube</a></p>', html_str)
    html_str = YOUTUBE_IFRAME_RE.sub(
        lambda m: (
            f'<p><a href="https://www.youtube.com/watch?v={m.group(2)}">'
            f'Watch: {m.group(1) or "video"}</a></p>'
        ),
        html_str,
    )
    return html_str


def clean_html(html_str, known_slugs):
    html_str = replace_video_embeds(html_str)
    html_str = rewrite_internal_links(html_str, known_slugs)
    html_str = IMG_RE.sub("", html_str)
    html_str = SPAN_RE.sub("", html_str)
    html_str = DIV_RE.sub("\n", html_str)
    html_str = NOISE_ATTR_RE.sub("", html_str)
    html_str = html_str.replace("&nbsp;", " ").replace("\xa0", " ")
    html_str = NBSP_ONLY_LINE_RE.sub("", html_str)
    html_str = EMPTY_ELEMENT_RE.sub("", html_str)
    html_str = MULTI_BLANK_RE.sub("\n\n", html_str)
    return html_str.strip()


def strip_tags(text):
    return unescape(re.sub(r"<[^>]+>", " ", text or ""))


def make_excerpt(body, limit=157):
    for segment in body:
        if segment["type"] != "html":
            continue
        text = " ".join(strip_tags(segment["html"]).split())
        if text:
            if len(text) <= limit:
                return text
            return text[:limit].rsplit(" ", 1)[0] + "…"
    return ""


def find_first_image_filename(html_str):
    m = re.search(r'<img[^>]+src="([^"]+)"', html_str)
    if not m:
        return None
    return m.group(1).rsplit("/", 1)[-1]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--drafts", required=True)
    ap.add_argument("--assets", required=True)
    ap.add_argument("--output", required=True)
    args = ap.parse_args()

    drafts_dir = Path(args.drafts)
    assets_dir = Path(args.assets)
    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    local_assets = {f.name for f in assets_dir.glob("*") if f.is_file()}
    draft_paths = [p for p in sorted(drafts_dir.glob("*.json")) if p.name != "index.json"]
    known_slugs = {json.loads(p.read_text())["slug"] for p in draft_paths}

    count = 0
    for draft_path in draft_paths:
        draft = json.loads(draft_path.read_text())

        hero_filename = None
        for segment in draft["body"]:
            if segment["type"] == "html":
                fname = find_first_image_filename(segment["html"])
                if fname and fname in local_assets:
                    hero_filename = fname
                    break

        body = []
        for segment in draft["body"]:
            if segment["type"] == "html":
                cleaned = clean_html(segment["html"], known_slugs)
                if cleaned:
                    body.append({"type": "html", "html": cleaned})
            else:
                body.append(
                    {
                        "type": "cta",
                        "title": segment["title"],
                        "buttonLabel": segment["buttonLabel"],
                        "buttonHref": INTERNAL_LINK_MAP.get(
                            re.sub(r"^https?://(?:www\.)?orcaworks\.ai", "", segment["buttonHref"]),
                            segment["buttonHref"],
                        ),
                        "theme": segment["theme"],
                    }
                )

        final = {
            "title": draft["title"],
            "slug": draft["slug"],
            "status": "published",
            "publishedDate": draft["publishedDate"].replace(" ", "T") + "Z",
            "excerpt": draft["excerpt"] or make_excerpt(draft["body"]),
            "author": "Orcaworks",
            "categories": draft["categories"],
            "seoTitle": draft["seoTitle"],
            "seoDescription": draft["seoDescription"],
            "canonical": draft["canonical"],
            "robots": "index-follow",
            "body": body,
        }
        if hero_filename:
            final["heroImage"] = {
                "path": f"blog-content/assets/{hero_filename}",
                "alt": draft["title"],
            }

        (out_dir / f"{draft['slug']}.json").write_text(
            json.dumps(final, indent=2, ensure_ascii=False) + "\n"
        )
        count += 1

    print(f"Curated {count} posts into {out_dir}")


if __name__ == "__main__":
    main()
