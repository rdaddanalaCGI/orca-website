import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'

import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { getDownloadResource } from '@/lib/gated-resources'
import { pruneRateLimitStore, rateLimit } from '@/lib/rate-limit'
import { verifyUnlockCookieValue } from '@/lib/unlock-cookie'

type RouteParams = { params: Promise<{ resourceId: string }> }

export async function GET(request: Request, { params }: RouteParams) {
  const { resourceId } = await params
  const resource = getDownloadResource(resourceId)

  if (!resource?.pdf) {
    return new NextResponse('Not found', { status: 404 })
  }

  const cookieStore = await cookies()
  const cookie = cookieStore.get('ow_unlock')?.value

  if (!cookie || !verifyUnlockCookieValue(cookie)) {
    return NextResponse.redirect(new URL(resource.canonicalPath, request.url).toString(), {
      status: 302,
    })
  }

  pruneRateLimitStore()

  const headerList = await headers()
  const forwarded = headerList.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0]!.trim() : (headerList.get('x-real-ip') ?? 'unknown')

  const limit = rateLimit({ key: `pdf:${ip}`, limit: 10, windowMs: 60_000 })
  if (!limit.ok) {
    return new NextResponse('Too many requests', { status: 429 })
  }

  const filePath = path.join(process.cwd(), 'private', 'pdfs', resource.pdf.filename)

  let stats
  try {
    stats = await stat(filePath)
  } catch {
    console.error(`[downloads/${resourceId}] missing PDF file`, filePath)
    return new NextResponse('Not found', { status: 404 })
  }

  const readStream = createReadStream(filePath)
  const body = Readable.toWeb(readStream) as ReadableStream

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resource.pdf.title}.pdf"`,
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'private, no-store',
      'Content-Length': stats.size.toString(),
    },
  })
}
