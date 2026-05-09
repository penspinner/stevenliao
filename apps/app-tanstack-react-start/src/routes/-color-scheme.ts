import { createServerFn } from '@tanstack/react-start'
import { getRequest, setCookie } from '@tanstack/react-start/server'
import { isColorScheme } from 'personal-site'

export const getColorScheme = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getRequest()
  const cookies = request.headers.get('cookie') ?? ''
  const match = cookies.match(/color-scheme=([^;]+)/)
  const maybeColorScheme = match?.[1]
  return isColorScheme(maybeColorScheme) ? maybeColorScheme : 'system'
})

export const updateColorScheme = createServerFn({ method: 'POST' })
  .inputValidator((data) => {
    if (isColorScheme(data)) return data
    throw new Error('Invalid color scheme')
  })
  .handler(async ({ data }) => {
    if (data === 'system') {
      setCookie('color-scheme', '', {
        maxAge: 0,
        path: '/',
        sameSite: 'lax',
      })
    } else {
      setCookie('color-scheme', data, {
        maxAge: 34560000,
        path: '/',
        sameSite: 'lax',
      })
    }
    return { colorScheme: data }
  })
