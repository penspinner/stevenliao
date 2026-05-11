import type { ColorScheme } from 'personal-site'
import { isColorScheme } from 'personal-site'
import type { ActionFunctionArgs } from 'react-router'
import { createCookie, data } from 'react-router'

const colorSchemeCookie = createCookie('color-scheme', {
  maxAge: 34560000,
  sameSite: 'lax',
})

const hasColorScheme = (arg: unknown): arg is { colorScheme: ColorScheme } => {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    'colorScheme' in arg &&
    isColorScheme(arg.colorScheme)
  )
}

export const parseColorScheme = async (request: Request): Promise<ColorScheme> => {
  const header = request.headers.get('Cookie')
  const cookieValues: unknown = await colorSchemeCookie.parse(header)
  return hasColorScheme(cookieValues) ? cookieValues.colorScheme : 'system'
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const colorScheme = formData.get('colorScheme')

  if (!isColorScheme(colorScheme)) {
    return data({ message: 'Invalid color scheme' }, { status: 400 })
  }

  return data({ ok: true }, { headers: { 'Set-Cookie': await serializeColorScheme(colorScheme) } })
}

const serializeColorScheme = (colorScheme: ColorScheme) => {
  if (colorScheme === 'system') {
    return colorSchemeCookie.serialize({}, { expires: new Date(0), maxAge: 0 })
  }

  return colorSchemeCookie.serialize({ colorScheme })
}
