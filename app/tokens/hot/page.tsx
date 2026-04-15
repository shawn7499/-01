import TokenRadarPage from '@/components/TokenRadarPage'
import { getGmgnHotTokenSignals } from '@/lib/gmgn-hot-tokens'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function HotTokensPage() {
  const signals = await getGmgnHotTokenSignals(18).catch((error) => {
    console.error('Failed to load GMGN hot signals:', error)
    return []
  })

  return <TokenRadarPage signals={signals} generatedAt={new Date().toISOString()} />
}
