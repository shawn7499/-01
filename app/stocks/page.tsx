import StockKolRadarPage from '@/components/StockKolRadarPage'
import { getStockKolFeed } from '@/lib/stock-kol-radar'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function StocksPage() {
  const feed = await getStockKolFeed()

  return <StockKolRadarPage feed={feed} />
}
