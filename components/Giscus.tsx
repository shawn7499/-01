'use client'

import { useEffect, useRef } from 'react'

interface GiscusProps {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping?: string
  theme?: string
  lang?: string
}

export default function Giscus({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  theme = 'dark_dimmed',
  lang = 'zh-CN',
}: GiscusProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repoId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', theme)
    script.setAttribute('data-lang', lang)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    ref.current.appendChild(script)
  }, [repo, repoId, category, categoryId, mapping, theme, lang])

  return <div ref={ref} className="giscus" />
}
