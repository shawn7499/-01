import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const DEFAULT_GAINERS_API_URL = 'http://localhost:8004/api/gainers'

export async function GET() {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30000)
  const endpoint = process.env.GAINERS_API_URL || DEFAULT_GAINERS_API_URL

  try {
    const response = await fetch(endpoint, {
      cache: 'no-store',
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Monitor service returned ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Crypto monitor proxy error:', error)

    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error:
          error instanceof Error
            ? error.message
            : 'Unable to reach crypto monitor service',
      },
      { status: 502 }
    )
  } finally {
    clearTimeout(timeout)
  }
}
