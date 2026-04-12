'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8000/api'

export default function AICreatePage() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('lowres, bad anatomy, bad hands')
  const [model, setModel] = useState('')
  const [models, setModels] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [taskId, setTaskId] = useState<string | null>(null)

  // 获取可用模型
  const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_BASE}/models`)
      setModels(response.data.models || [])
      if (response.data.models && response.data.models.length > 0) {
        setModel(response.data.models[0].title)
      }
    } catch (error) {
      console.error('Failed to fetch models:', error)
    }
  }

  // 开始生成
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('请输入描述词')
      return
    }

    setGenerating(true)
    try {
      const response = await axios.post(`${API_BASE}/generate`, {
        prompt,
        negative_prompt: negativePrompt,
        model: model || undefined,
        width: 768,
        height: 512,
        steps: 25,
        cfg_scale: 7.0,
      })

      setTaskId(response.data.task_id)
      // 轮询检查状态
      pollTaskStatus(response.data.task_id)
    } catch (error) {
      console.error('Generation failed:', error)
      alert('生成失败，请重试')
      setGenerating(false)
    }
  }

  // 轮询任务状态
  const pollTaskStatus = async (id: string) => {
    const maxAttempts = 120 // 最多轮询2分钟
    let attempts = 0

    const poll = async () => {
      try {
        const response = await axios.get(`${API_BASE}/task/${id}`)
        const { status, result_url, progress } = response.data

        if (status === 'completed') {
          setResult(result_url)
          setGenerating(false)
        } else if (status === 'failed') {
          alert('生成失败')
          setGenerating(false)
        } else if (attempts < maxAttempts) {
          attempts++
          setTimeout(poll, 1000)
        } else {
          alert('生成超时')
          setGenerating(false)
        }
      } catch (error) {
        console.error('Status check failed:', error)
      }
    }

    poll()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-black px-6 py-20">
      {/* 背景星空效果 */}
      <div className="fixed inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI 创意工坊
          </h1>
          <p className="text-xl text-gray-300">用文字描述，让 AI 为你绘制想象</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 输入面板 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-effect p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">生成设置</h2>

            {/* 模型选择 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-300">模型</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="">自动选择</option>
                {models.map((m) => (
                  <option key={m.title} value={m.title}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 正向提示词 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                描述词 (Prompt)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：A beautiful cosmic scene with galaxies and nebulas, 8k, cinematic lighting"
                className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 h-32 resize-none"
              />
            </div>

            {/* 负向提示词 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                反向提示词 (Negative)
              </label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 h-24 resize-none"
              />
            </div>

            {/* 生成按钮 */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                fetchModels()
                handleGenerate()
              }}
              disabled={generating}
              className="w-full btn-primary font-bold text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? '正在生成...' : '✨ 开始创作'}
            </motion.button>
          </motion.div>

          {/* 预览面板 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-effect p-8 rounded-xl flex flex-col items-center justify-center min-h-96"
          >
            {result ? (
              <div className="w-full">
                <img
                  src={result}
                  alt="Generated"
                  className="w-full rounded-lg mb-4"
                />
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={result}
                  download
                  className="w-full btn-primary text-center block"
                >
                  📥 下载图片
                </motion.a>
              </div>
            ) : generating ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-300 text-lg">正在释放创意...</p>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <p className="text-6xl mb-4">🎨</p>
                <p className="text-lg">输入描述词，点击生成按钮开始创作</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
