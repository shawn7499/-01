'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'

const AICreatePage = dynamic(() => import('@/components/AICreatePage'), {
  ssr: false,
})

export default function AIWorkshop() {
  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black hover:text-gray-300 transition">SHAWN WICK</Link>
          <div className="flex gap-8">
            <Link href="/#about" className="text-gray-400 hover:text-white transition">What I Do</Link>
            <Link href="/#projects" className="text-gray-400 hover:text-white transition">Projects</Link>
            <Link href="/#roadmap" className="text-gray-400 hover:text-white transition">Roadmap</Link>
            <Link href="/#contact" className="text-gray-400 hover:text-white transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-black to-gray-900 pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tight">AI Creative Workshop</h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            Generate stunning images and videos with advanced AI models. Powered by state-of-the-art diffusion technology with 61+ models.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['61+ Models', 'Real-time Generation', 'High Resolution', '24/7 Available'].map((stat, i) => (
              <div key={i} className="px-4 py-2 border border-white rounded text-sm font-semibold">
                {stat}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI Workshop Component */}
      <section className="py-20 bg-gray-900">
        <AICreatePage />
      </section>

      {/* Features */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Features</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: 'Multiple Models', desc: '61+ cutting-edge AI models for diverse creative needs' },
              { title: 'Real-time Generation', desc: 'Instant results with advanced GPU acceleration' },
              { title: 'High Resolution', desc: 'Up to 4K output quality for professional work' },
              { title: 'Custom Parameters', desc: 'Fine-tune every aspect of your generation' },
              { title: '24/7 Available', desc: 'Always online, always ready to create' },
              { title: 'Fast Processing', desc: 'Generate multiple images in seconds' },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border-l-4 border-white pl-6">
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Create?</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">Start generating amazing visuals with our AI workshop. No setup required.</p>
            <Link href="#" className="inline-block px-8 py-4 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all">
              Start Creating
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-3xl font-black mb-4 hover:text-gray-300 transition inline-block">SHAWN WICK</Link>
          <p className="text-gray-500 mb-8">Building the path beyond the universe</p>
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
          <p className="text-gray-600 text-sm">© 2024 SHAWN WICK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
