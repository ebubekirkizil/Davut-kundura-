import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1px solid #333'
        }}
      >
        <span
          style={{
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'serif',
            letterSpacing: '1px',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          DK
        </span>
      </div>
    ),
    { ...size }
  )
}
