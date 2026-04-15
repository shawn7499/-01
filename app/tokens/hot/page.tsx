import TokenRadarPage from '@/components/TokenRadarPage'
import { getGmgnBscChineseSignals, getGmgnHotTokenSignals } from '@/lib/gmgn-hot-tokens'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function HotTokensPage() {
  const [hotSignals, chineseSignals] = await Promise.all([
    getGmgnHotTokenSignals(18).catch((error) => {
      console.error('Failed to load GMGN hot signals:', error)
      return []
    }),
    getGmgnBscChineseSignals(12).catch((error) => {
      console.error('Failed to load GMGN BSC Chinese signals:', error)
      return []
    }),
  ])

  return (
    <TokenRadarPage
      hotSignals={hotSignals}
      chineseSignals={chineseSignals}
      generatedAt={new Date().toISOString()}
    />
  )
}
