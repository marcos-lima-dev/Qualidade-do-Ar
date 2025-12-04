import { ImageResponse } from 'next/og';

// Configurações da imagem (Route Segment Config)
export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Função de Geração do Ícone
export default function Icon() {
  return new ImageResponse(
    (
      // Elemento JSX que representa o Favicon
      // Recriamos o visual do seu Header: Fundo Azul + Ícone Branco
      <div
        style={{
          fontSize: 20,
          background: '#2563eb', // bg-blue-600
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px', // rounded-lg
        }}
      >
        {/* SVG do Lucide 'CloudSun' (Desenhado manualmente pois Lucide pode dar erro no Edge Runtime) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="M20 12h2" />
          <path d="m19.07 4.93-1.41 1.41" />
          <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
          <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}