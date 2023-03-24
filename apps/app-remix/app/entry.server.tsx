import { RemixServer } from '@remix-run/react'
import type { EntryContext } from '@vercel/remix'
import { handleRequest as handleVercelRequest } from '@vercel/remix'

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) => {
  const remixServer = <RemixServer context={remixContext} url={request.url} />
  return handleVercelRequest(request, responseStatusCode, responseHeaders, remixServer)
}

export default handleRequest
