import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()
    const match = html.match(/<title>(.*?)<\/title>/)
    const title = match ? match[1] : ''

    return NextResponse.json({ title })
  } catch (error) {
    console.error('Error fetching page title:', error)
    return NextResponse.json({ error: 'Failed to fetch page title' }, { status: 500 })
  }
}

