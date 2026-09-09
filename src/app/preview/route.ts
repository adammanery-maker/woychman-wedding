import { createPayloadRequest } from 'payload'
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

import config from '@payload-config'
import { isSafePreviewPath } from '@/lib/preview'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('path')
  const previewSecret = url.searchParams.get('previewSecret')
  const configuredSecret = process.env.PREVIEW_SECRET

  if (!configuredSecret || previewSecret !== configuredSecret || !path || !isSafePreviewPath(path)) {
    return NextResponse.json({ error: 'Invalid preview request' }, { status: 400 })
  }

  const payloadRequest = await createPayloadRequest({ config, request })
  if (!payloadRequest.user) {
    const draft = await draftMode()
    draft.disable()
    return NextResponse.json({ error: 'Preview requires an authenticated administrator' }, { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
