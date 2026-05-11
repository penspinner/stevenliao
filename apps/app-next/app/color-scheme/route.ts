import { NextResponse } from 'next/server'

export const POST = () => {
  return NextResponse.json({ ok: true })
}

export const GET = () => {
  return NextResponse.json({ colorScheme: true })
}
