import { ImageResponse } from 'next/og';
import { Landmark } from 'lucide-react';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#121214',
          borderRadius: '50%',
          border: '2px solid #E5B83B',
          color: '#E5B83B',
          fontSize: 15,
          fontWeight: 800,
          fontFamily: 'serif',
        }}
      >
        SN
      </div>
    ),
    { ...size }
  );
}
