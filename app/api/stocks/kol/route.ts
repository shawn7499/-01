import { NextResponse } from 'next/server'
import { getStockKolFeed } from '@/lib/stock-kol-radar'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  const feed = await getStockKolFeed()

  return NextResponse.json(feed)
}
