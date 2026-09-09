const PREVIEW_ROUTE = '/preview'

export function getAdminPreviewURL(path: string): string | null {
  const previewSecret = process.env.PREVIEW_SECRET
  if (!previewSecret) return null

  const params = new URLSearchParams({ path, previewSecret })
  return `${PREVIEW_ROUTE}?${params.toString()}`
}

export function isSafePreviewPath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//') && !path.includes('\\')
}
