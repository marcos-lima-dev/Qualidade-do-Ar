"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Bairro } from "@/types";

interface MapProps {
  data: Bairro[];
}

const createCustomIcon = (status: string) => {
  let colorClass = "bg-slate-500";
  
  switch (status) {
    case 'bom': colorClass = "bg-emerald-500 shadow-emerald-500/50"; break;
    case 'moderado': colorClass = "bg-amber-500 shadow-amber-500/50"; break;
    case 'ruim': colorClass = "bg-orange-500 shadow-orange-500/50"; break;
    case 'pessimo': colorClass = "bg-rose-500 shadow-rose-500/50"; break;
  }

  return L.divIcon({
    className: "custom-pin",
    html: `<div class="w-4 h-4 rounded-full border-2 border-white ${colorClass} shadow-lg animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
  });
};

export default function MapComponent({ data }: MapProps) {
  const rioCenter: [number, number] = [-22.9068, -43.1729];

  return (
    <div className="relative w-full h-full">
      {/* 👇 AQUI ESTÁ A LEGENDA FLUTUANTE 👇 */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur shadow-xl rounded-lg border border-slate-200 p-3 min-w-[140px]">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 border-b pb-1">
          Legenda
        </h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700">Qualidade Boa</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700">Moderada</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500 border border-orange-600 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700">Ruim</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700">Péssima</span>
          </div>
        </div>
      </div>
      {/* 👆 FIM DA LEGENDA 👆 */}

      <MapContainer 
        center={rioCenter} 
        zoom={11} 
        className="h-full w-full z-0 bg-slate-100"
        zoomControl={false} // Remove zoom padrão para limpar a UI
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {data.map((bairro) => (
          <Marker 
            key={bairro.id} 
            position={[bairro.coordenadas.lat, bairro.coordenadas.lng]}
            icon={createCustomIcon(bairro.status)}
          >
            <Popup className="font-sans">
              <div className="flex flex-col gap-1 min-w-[120px]">
                <h3 className="font-bold text-sm text-slate-900">{bairro.bairro}</h3>
                <span className="text-[10px] text-slate-500 uppercase font-bold">{bairro.tipo}</span>
                <div className="mt-1 pt-1 border-t flex justify-between items-center">
                   <span className="text-xs text-slate-600">AQI</span>
                   <span className="font-bold text-base">{bairro.aqi}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}