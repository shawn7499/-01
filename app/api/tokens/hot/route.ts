import { NextResponse } from 'next/server'

import { getHotTokenSignals } from '@/lib/hot-tokens'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get('limit') || '18', 10)
    const signals = await getHotTokenSignals(limit)

    return NextResponse.json({
      total: signals.length,
      generatedAt: new Date().toISOString(),
      signals,
    })
  } catch (error) {
    console.error('Hot token API error:', error)

    return NextResponse.json({
      total: 0,
      generatedAt: new Date().toISOString(),
      signals: [],
      fallback: true,
    })
  }
}
