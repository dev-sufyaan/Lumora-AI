import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Lumora AI - Interactive Video Learning Platform';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 60,
          color: 'white',
          background: 'linear-gradient(to bottom right, #4f46e5, #8b5cf6)',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div 
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Lumora AI
          </div>
          <div 
            style={{
              fontSize: 40,
              opacity: 0.8,
              maxWidth: '70%',
            }}
          >
            Transform passive video watching into active learning
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 