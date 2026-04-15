import { NextResponse } from 'next/server'

import { getGmgnBscChineseSignals } from '@/lib/gmgn-hot-tokens'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get('limit') || '12', 10)
    const signals = await getGmgnBscChineseSignals(limit)

    return NextResponse.json({
      total: signals.length,
      generatedAt: new Date().toISOString(),
      source: 'GMGN BSC Chinese',
      signals,
    })
  } catch (error) {
    console.error('Chinese token API error:', error)

    return NextResponse.json({
      total: 0,
      generatedAt: new Date().toISOString(),
      source: 'unavailable',
      signals: [],
      fallback: true,
    })
  }
}
