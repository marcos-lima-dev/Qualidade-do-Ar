"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Bairro } from "@/types";
import Link from "next/link"; 
import { ArrowRight } from "lucide-react"; 

interface MapProps {
  data: Bairro[];
}

const getStatusColors = (status: string) => {
    switch (status) {
      case 'bom': return { hex: '#10b981', tailwind: 'text-emerald-600 bg-emerald-50' };
      case 'moderado': return { hex: '#f59e0b', tailwind: 'text-amber-600 bg-amber-50' };
      case 'ruim': return { hex: '#f97316', tailwind: 'text-orange-600 bg-orange-50' };
      case 'pessimo': return { hex: '#f43f5e', tailwind: 'text-rose-600 bg-rose-50' };
      default: return { hex: '#64748b', tailwind: 'text-slate-600 bg-slate-50' };
    }
};

const createCustomIcon = (status: string) => {
  const colors = getStatusColors(status);
  
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${colors.hex}" class="w-8 h-8 drop-shadow-md filter">
      <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      <circle cx="12" cy="10.5" r="2.5" fill="white" />
    </svg>
  `;

  return L.divIcon({
    className: "custom-map-pin", 
    html: svgIcon,
    iconSize: [32, 32], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -34] 
  });
};

export default function MapComponent({ data }: MapProps) {
  const rioCenter: [number, number] = [-22.9068, -43.1729];

  return (
    <div className="relative w-full h-full">
      {/* LEGENDA AGORA NO CANTO INFERIOR ESQUERDO (bottom-4 left-4)
         Isso evita cobrir o mapa e os botões de zoom (que costumam ficar na direita)
      */}
      <div className="absolute bottom-6 left-4 z-[1000] bg-white/95 backdrop-blur shadow-lg rounded-lg border border-slate-200 p-2.5 min-w-[130px]">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b pb-1">
          Níveis de Qualidade
        </h4>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-600 shadow-sm"></span>
            <span className="text-[11px] font-semibold text-slate-600">Boa</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-600 shadow-sm"></span>
            <span className="text-[11px] font-semibold text-slate-600">Moderada</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 border border-orange-600 shadow-sm"></span>
            <span className="text-[11px] font-semibold text-slate-600">Ruim</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-600 shadow-sm"></span>
            <span className="text-[11px] font-semibold text-slate-600">Péssima</span>
          </div>
        </div>
      </div>

      <MapContainer 
        center={rioCenter} 
        zoom={11} 
        className="h-full w-full z-0 bg-slate-100"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {data.map((bairro) => {
          const colors = getStatusColors(bairro.status);
          
          return (
          <Marker 
            key={bairro.id} 
            position={[bairro.coordenadas.lat, bairro.coordenadas.lng]}
            icon={createCustomIcon(bairro.status)}
          >
            <Popup className="font-sans leaflet-popup-rounded">
              <div className="flex flex-col min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${colors.tailwind.split(' ')[1].replace('bg-', 'bg-')}`}></div>
                    <h3 className="font-bold text-base text-slate-900 leading-none">{bairro.bairro}</h3>
                </div>
                
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-3">
                    {bairro.tipo === 'medido' ? '📡 Estação Oficial' : '🤖 Dados Estimados'}
                </span>

                <div className={`flex items-center justify-between p-2 rounded-lg ${colors.tailwind} mb-3`}>
                   <span className="text-xs font-semibold uppercase">Índice AQI</span>
                   <span className="font-black text-2xl">{bairro.aqi}</span>
                </div>

                <Link href={`/bairro/${bairro.id}`} className="w-full">
                    <button className="w-full flex items-center justify-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-1.5 rounded transition-colors">
                        Ver detalhes <ArrowRight size={14} />
                    </button>
                </Link>
              </div>
            </Popup>
          </Marker>
        )})}
      </MapContainer>
    </div>
  );
}