import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function ChineseTokensPage() {
  redirect('/tokens/hot#bsc-chinese')
}
