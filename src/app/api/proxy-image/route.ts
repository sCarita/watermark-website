import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 })
    }

    // Fetch the image from Firebase Storage
    const imageResponse = await fetch(imageUrl)

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${imageResponse.status}` },
        { status: imageResponse.status },
      )
    }

    // Get the image data
    const imageData = await imageResponse.arrayBuffer()

    // Determine content type
    const contentType = imageResponse.headers.get('content-type') || 'image/png'

    // Return the image with appropriate headers
    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment',
      },
    })
  } catch (error) {
    console.error('Error in proxy-image API:', error)
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 },
    )
  }
}
