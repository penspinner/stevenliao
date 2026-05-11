import { isbot } from 'isbot'
import { I18nProvider } from 'react-aria-components'
import { getLocalizationScript } from 'react-aria-components/i18n'
import { renderToReadableStream } from 'react-dom/server'
import type { EntryContext } from 'react-router'
import { ServerRouter } from 'react-router'

const vercelDeploymentId = process.env.VERCEL_DEPLOYMENT_ID
const vercelSkewProtectionEnabled = process.env.VERCEL_SKEW_PROTECTION_ENABLED === '1'

export const streamTimeout = 10_000

// oxlint-disable-next-line max-params
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const acceptLanguage = request.headers.get('accept-language')
  const lang = acceptLanguage?.split(/[,;]/u)[0] ?? 'en-US'

  let status = responseStatusCode
  const body = await renderToReadableStream(
    <I18nProvider locale={lang}>
      <ServerRouter context={routerContext} url={request.url} />
    </I18nProvider>,
    {
      bootstrapScriptContent: getLocalizationScript(lang),
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(streamTimeout + 1000)]),
      onError(error) {
        console.error(error)
        status = 500
      },
    },
  )

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady
  }

  responseHeaders.set('Content-Type', 'text/html')
  if (vercelSkewProtectionEnabled && vercelDeploymentId !== '') {
    responseHeaders.append('Set-Cookie', `__vdpl=${vercelDeploymentId}; HttpOnly`)
  }

  return new Response(body, {
    headers: responseHeaders,
    status,
  })
}
