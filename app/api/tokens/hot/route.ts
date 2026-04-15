import { NextResponse } from 'next/server'

import { getGmgnHotTokenSignals } from '@/lib/gmgn-hot-tokens'
import { getHotTokenSignals } from '@/lib/hot-tokens'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get('limit') || '18', 10)
    const gmgnSignals = await getGmgnHotTokenSignals(limit).catch((error) => {
      console.error('GMGN hot token API error:', error)
      return []
    })

    if (gmgnSignals.length > 0) {
      return NextResponse.json({
        total: gmgnSignals.length,
        generatedAt: new Date().toISOString(),
        source: 'GMGN',
        signals: gmgnSignals,
      })
    }

    const signals = await getHotTokenSignals(limit)

    return NextResponse.json({
      total: signals.length,
      generatedAt: new Date().toISOString(),
      source: 'DexScreener fallback',
      signals,
    })
  } catch (error) {
    console.error('Hot token API error:', error)

    return NextResponse.json({
      total: 0,
      generatedAt: new Date().toISOString(),
      source: 'unavailable',
      signals: [],
      fallback: true,
    })
  }
}
