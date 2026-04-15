import type { HotTokenSignal } from '@/lib/hot-tokens'

type TokenRadarPageProps = {
  hotSignals: HotTokenSignal[]
  chineseSignals: HotTokenSignal[]
  generatedAt: string
}

function formatCompactNumber(value: number | null) {
  if (value === null || Number.isNaN(value)) return '--'

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: value >= 1000 ? 1 : 2,
  }).format(value)
}

function formatCurrency(value: number | null) {
  if (value === null || Number.isNaN(value)) return '--'

  if (value >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(value)
  }

  return `$${value.toFixed(value >= 0.01 ? 4 : 8)}`
}

function formatPercent(value: number | null) {
  if (value === null || Number.isNaN(value)) return '--'
  const prefix = value > 0 ? '+' : ''
  return `${prefix}${value.toFixed(1)}%`
}

function formatAge(hours: number | null) {
  if (hours === null) return '--'
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} min`
  if (hours < 24) return `${hours.toFixed(1)} h`
  return `${(hours / 24).toFixed(1)} d`
}

function formatTimestamp(value: string) {
  if (!value) return '--'

  return new Date(value).toLocaleString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function linkLabel(signal: HotTokenSignal, url: string, label: string) {
  if (url === signal.dexscreenerUrl || label === 'GMGN') return 'GMGN'
  if (url === signal.explorerUrl || label === 'Explorer') return 'Explorer'
  return label
}

function sectionMeta(signals: HotTokenSignal[]) {
  const chains = Array.from(new Set(signals.map((signal) => signal.chainLabel)))
  return chains.join(' / ') || 'GMGN'
}

export default function TokenRadarPage({
  hotSignals,
  chineseSignals,
  generatedAt,
}: TokenRadarPageProps) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(20,96,78,0.72),transparent_42%),radial-gradient(circle_at_76%_18%,rgba(29,78,216,0.24),transparent_28%),#050505]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
            <div className="flex flex-wrap items-center gap-3">
              <a href="/" className="transition hover:text-white">
                Back Home
              </a>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <a href="/news/signals" className="transition hover:text-white">
                News Signals
              </a>
            </div>
            <div>
              Updated {formatTimestamp(generatedAt)}
            </div>
          </div>

          <div className="mt-10 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100/90">
                Token Radar
              </span>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100/90">
                GMGN Live Feed
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">
              热门代币和 BSC 中文叙事，放到同一个总页里
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/72 sm:text-lg">
              上面保留全站热门代币观察流，下面单独拉出 BNB Chain 中文代币模块，并且扩大到 GMGN 的
              1 小时和 5 分钟趋势窗口，不再只靠总榜事后筛选。
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#all-hot"
                className="rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                All Hot Tokens
              </a>
              <a
                href="#bsc-chinese"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
              >
                BSC Chinese Tokens
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard label="Hot feed" value={String(hotSignals.length)} description={sectionMeta(hotSignals)} />
            <StatCard
              label="BSC Chinese"
              value={String(chineseSignals.length)}
              description="GMGN 1h + 5m dedicated feed"
            />
            <StatCard label="Contracts" value="Ready" description="Chain, address, reasons, and links included" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-amber-300/20 bg-amber-400/8 p-4 text-sm leading-6 text-amber-50/85">
          这页更适合做观察和研究，不构成投资建议。热门不等于安全，中文叙事也不等于有持续性，合约、流动性和持仓结构仍然需要你自己复核。
        </div>

        <TokenSection
          id="all-hot"
          badge="All Hot Tokens"
          title="全站热门代币"
          description="保留全站热门观察流，方便你先看整体热度分布，再决定要不要继续往某条链或某个叙事深挖。"
          signals={hotSignals}
          emptyText="当前没有拿到热门代币数据。"
        />

        <TokenSection
          id="bsc-chinese"
          badge="BSC Chinese"
          title="BNB Chain 中文代币"
          description="这一块不再从总榜里事后筛，而是专门抓 BSC 的 GMGN 1 小时和 5 分钟趋势，再把中文名、中文符号、中文翻译线索和相关叙事单独拉出来。"
          signals={chineseSignals}
          emptyText="当前没有拿到 BSC 中文代币数据。"
        />
      </main>
    </div>
  )
}

function TokenSection({
  id,
  badge,
  title,
  description,
  signals,
  emptyText,
}: {
  id: string
  badge: string
  title: string
  description: string
  signals: HotTokenSignal[]
  emptyText: string
}) {
  return (
    <section id={id} className="scroll-mt-24 py-6 first:pt-0">
      <div className="mb-6">
        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
          {badge}
        </span>
        <h2 className="mt-4 text-3xl font-black sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
          {description}
        </p>
      </div>

      {signals.length === 0 ? (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-20 text-center text-white/65">
          {emptyText}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {signals.map((signal) => (
            <TokenCard key={signal.id} signal={signal} />
          ))}
        </div>
      )}
    </section>
  )
}

function TokenCard({ signal }: { signal: HotTokenSignal }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {signal.imageUrl ? (
            <img
              src={signal.imageUrl}
              alt={signal.name}
              className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg font-bold">
              {signal.symbol.slice(0, 2)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                {signal.chainLabel}
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/65">
                Score {signal.score}
              </span>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                {signal.dexId.toUpperCase()}
              </span>
            </div>

            <h3 className="mt-3 truncate text-2xl font-bold text-white">
              {signal.name} <span className="text-white/55">${signal.symbol}</span>
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/60">{signal.summary}</p>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-sm font-semibold ${(signal.priceChange1h ?? 0) >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
            {formatPercent(signal.priceChange1h)}
          </div>
          <div className="mt-1 text-xs text-white/45">1H change</div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Price" value={formatCurrency(signal.priceUsd)} />
        <MetricCard label="1H volume" value={formatCurrency(signal.volume1h)} />
        <MetricCard label="Liquidity" value={formatCurrency(signal.liquidityUsd)} />
        <MetricCard label="24H change" value={formatPercent(signal.priceChange24h)} />
        <MetricCard label="Age" value={formatAge(signal.ageHours)} />
        <MetricCard label="Buys / Sells" value={`${formatCompactNumber(signal.buys1h)} / ${formatCompactNumber(signal.sells1h)}`} />
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs uppercase tracking-[0.24em] text-white/35">Contract</div>
        <div className="mt-2 break-all text-sm font-semibold text-white/85">{signal.tokenAddress}</div>
      </div>

      <div className="mt-5 grid gap-5">
        <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h4 className="text-sm font-semibold text-emerald-200">Watch thesis</h4>
          <p className="mt-2 text-sm leading-6 text-white/78">{signal.description}</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h4 className="text-sm font-semibold text-cyan-200">Why it is hot</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
            {signal.hotReasons.slice(0, 4).map((reason) => (
              <li key={reason} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <h4 className="text-sm font-semibold text-rose-200">Risk flags</h4>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/75">
            {signal.riskFlags.slice(0, 4).map((risk) => (
              <li key={risk} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-rose-300" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {signal.links.slice(0, 5).map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/30 hover:text-white"
          >
            {linkLabel(signal, link.url, link.label)}
          </a>
        ))}
      </div>
    </article>
  )
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</div>
      <div className="mt-3 text-3xl font-black">{value}</div>
      <div className="mt-2 text-sm text-white/62">{description}</div>
    </div>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-xs uppercase tracking-[0.24em] text-white/35">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
    </div>
  )
}
