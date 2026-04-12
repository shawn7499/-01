'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { translations } from '@/lib/translations'

const AICreatePage = dynamic(() => import('@/components/AICreatePage'), {
  ssr: false,
})

const aiWorkshopTranslations = {
  en: {
    title: 'AI Creative Workshop',
    description: 'Generate stunning images and videos with advanced AI models. Powered by state-of-the-art diffusion technology with 61+ models.',
    stats: ['61+ Models', 'Real-time Generation', 'High Resolution', '24/7 Available'],
    featuresTitle: 'Features',
    features: [
      { title: 'Multiple Models', desc: '61+ cutting-edge AI models for diverse creative needs' },
      { title: 'Real-time Generation', desc: 'Instant results with advanced GPU acceleration' },
      { title: 'High Resolution', desc: 'Up to 4K output quality for professional work' },
      { title: 'Custom Parameters', desc: 'Fine-tune every aspect of your generation' },
      { title: '24/7 Available', desc: 'Always online, always ready to create' },
      { title: 'Fast Processing', desc: 'Generate multiple images in seconds' },
    ],
    ctaTitle: 'Ready to Create?',
    ctaDesc: 'Start generating amazing visuals with our AI workshop. No setup required.',
    ctaButton: 'Start Creating',
  },
  zh: {
    title: 'AI 创意工坊',
    description: '使用先进的 AI 模型生成令人惊艳的图像和视频。采用最先进的扩散技术，拥有 61+ 模型。',
    stats: ['61+ 模型', '实时生成', '高分辨率', '24/7 可用'],
    featuresTitle: '功能',
    features: [
      { title: '多个模型', desc: '61+ 尖端 AI 模型满足各种创意需求' },
      { title: '实时生成', desc: '通过先进的 GPU 加速即时生成结果' },
      { title: '高分辨率', desc: '最高 4K 输出质量满足专业工作需求' },
      { title: '自定义参数', desc: '微调生成的每个方面' },
      { title: '24/7 可用', desc: '始终在线，随时准备创建' },
      { title: '快速处理', desc: '在几秒内生成多个图像' },
    ],
    ctaTitle: '准备好创建了吗？',
    ctaDesc: '开始使用我们的 AI 工坊生成令人惊艳的视觉效果。无需设置。',
    ctaButton: '开始创建',
  },
}

export default function AIWorkshop() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const t = aiWorkshopTranslations[lang]
  const mainT = translations[lang]

  return (
    <div className="bg-black text-white">
      <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black hover:text-gray-300 transition">SHAWN WICK</Link>
          <div className="flex gap-8">
            <Link href="/#about" className="text-gray-400 hover:text-white transition">{mainT.nav.whatIDo}</Link>
            <Link href="/#projects" className="text-gray-400 hover:text-white transition">{mainT.nav.projects}</Link>
            <Link href="/#roadmap" className="text-gray-400 hover:text-white transition">{mainT.nav.roadmap}</Link>
            <Link href="/#contact" className="text-gray-400 hover:text-white transition">{mainT.nav.contact}</Link>
          </div>
        </div>
      </nav>

      {/* Header with Background Image */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative pt-32 overflow-hidden"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl text-center relative z-20">
          <h1 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tight">{t.title}</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {t.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {t.stats.map((stat, i) => (
              <div key={i} className="px-4 py-2 border border-white rounded text-sm font-semibold bg-white/10 backdrop-blur-sm">
                {stat}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Workshop Component */}
      <section className="py-20 bg-black">
        <AICreatePage />
      </section>

      {/* Features */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">{t.featuresTitle}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {t.features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-4 border-white pl-6 bg-white/5 backdrop-blur-sm p-6 rounded">
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8">{t.ctaTitle}</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">{t.ctaDesc}</p>
            <a href="#" className="inline-block px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all">
              {t.ctaButton}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-3xl font-black mb-4 hover:text-gray-300 transition inline-block">SHAWN WICK</Link>
          <p className="text-gray-500 mb-8">{mainT.footer.description}</p>
          <div className="flex justify-center gap-8 mb-8">
            {[
              { name: 'X', link: 'https://x.com/shawnwick960' },
              { name: 'Telegram', link: 'https://t.me/shawick' },
              { name: 'GitHub', link: 'https://github.com/shawn7499' },
            ].map((link, i) => (
              <a key={i} href={link.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors font-semibold">
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-sm">{mainT.footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
