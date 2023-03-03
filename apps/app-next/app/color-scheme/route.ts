import { NextResponse } from 'next/server'

export const POST = async () => {
  return NextResponse.json({ ok: true })
}

export const GET = async () => {
  return NextResponse.json({ colorScheme: true })
}
