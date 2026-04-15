type RankedChainItem = {
  id: string
  chainId: string
}

type ChineseTokenLike = {
  name?: string | null
  symbol?: string | null
  description?: string | null
  hotReasons?: string[] | null
}

const CJK_TEXT_REGEX = /[\u3400-\u9fff\uf900-\ufaff]/

const CHINESE_NARRATIVE_KEYWORDS = [
  'china',
  'chinese',
  'mandarin',
  'cantonese',
  'yuanbao',
  'renmin',
  'caishen',
  'hongbao',
  'zhongguo',
  'zhongwen',
  'binance life',
]

export function containsChineseText(...parts: Array<string | null | undefined>) {
  return parts.some((part) => typeof part === 'string' && CJK_TEXT_REGEX.test(part))
}

export function hasChineseNarrativeKeyword(...parts: Array<string | null | undefined>) {
  const haystack = parts
    .filter((part): part is string => Boolean(part))
    .join(' ')
    .toLowerCase()

  return CHINESE_NARRATIVE_KEYWORDS.some((keyword) => haystack.includes(keyword))
}

export function isChineseNarrativeToken(token: ChineseTokenLike) {
  return (
    containsChineseText(token.name, token.symbol, token.description, ...(token.hotReasons ?? [])) ||
    hasChineseNarrativeKeyword(token.name, token.symbol, token.description, ...(token.hotReasons ?? []))
  )
}

export function ensureChainCoverage<T extends RankedChainItem>(
  items: T[],
  limit: number,
  chainId: string,
  minimumCount: number
) {
  const safeLimit = Math.max(1, limit)
  const safeMinimum = Math.min(Math.max(0, minimumCount), safeLimit)
  const topItems = items.slice(0, safeLimit)
  const alreadyIncluded = topItems.filter((item) => item.chainId === chainId).length

  if (alreadyIncluded >= safeMinimum) {
    return topItems
  }

  const extras = items
    .slice(safeLimit)
    .filter((item) => item.chainId === chainId)
    .slice(0, safeMinimum - alreadyIncluded)

  if (extras.length === 0) {
    return topItems
  }

  const rankMap = new Map(items.map((item, index) => [item.id, index]))
  const promotedIds = new Set(extras.map((item) => item.id))
  const result = [...topItems]
  let extraIndex = 0

  for (let index = result.length - 1; index >= 0 && extraIndex < extras.length; index -= 1) {
    if (result[index].chainId === chainId || promotedIds.has(result[index].id)) {
      continue
    }

    result[index] = extras[extraIndex]
    extraIndex += 1
  }

  return Array.from(new Map(result.map((item) => [item.id, item])).values()).sort((left, right) => {
    return (rankMap.get(left.id) ?? 0) - (rankMap.get(right.id) ?? 0)
  })
}
