import { createCookie, json } from '@remix-run/node'
import type { ActionArgs } from '@remix-run/node'
import type { ColorScheme } from 'personal-site'

const colorSchemeCookie = createCookie('color-scheme', {
  maxAge: 34560000,
  sameSite: 'lax',
})

export const parseColorScheme = async (request: Request): Promise<ColorScheme> => {
  const header = request.headers.get('Cookie')
  const vals = await colorSchemeCookie.parse(header)
  return vals ? vals.colorScheme : 'system'
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const colorScheme = formData.get('colorScheme')

  if (!validateColorScheme(colorScheme)) {
    return json({ message: `Invalid color scheme: ${colorScheme}` }, { status: 400 })
  }

  return json(
    { ok: true },
    {
      headers: { 'Set-Cookie': await serializeColorScheme(colorScheme) },
    },
  )
}

const serializeColorScheme = (colorScheme: ColorScheme) => {
  if (colorScheme === 'system') {
    return colorSchemeCookie.serialize({}, { expires: new Date(0), maxAge: 0 })
  }

  return colorSchemeCookie.serialize({ colorScheme })
}

const validateColorScheme = (value: unknown): value is ColorScheme => {
  return value === 'dark' || value === 'light' || value === 'system'
}
