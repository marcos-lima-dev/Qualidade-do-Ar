// src/components/map/MapComponent.tsx
"use client"; // Obrigatório: mapas só rodam no cliente

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importa o CSS do Leaflet
import L from "leaflet";
import { Bairro } from "@/types";

interface MapProps {
  data: Bairro[];
}

// Função Helper para criar ícones coloridos via CSS (Performance pura!)
const createCustomIcon = (status: string) => {
  let colorClass = "bg-gray-500";
  
  switch (status) {
    case 'bom': colorClass = "bg-green-500 shadow-green-500/50"; break;
    case 'moderado': colorClass = "bg-yellow-500 shadow-yellow-500/50"; break;
    case 'ruim': colorClass = "bg-red-500 shadow-red-500/50"; break;
    case 'pessimo': colorClass = "bg-purple-500 shadow-purple-500/50"; break;
  }

  // HTML do ícone: Um círculo com "pulse" effect
  return L.divIcon({
    className: "custom-pin",
    html: `<div class="w-4 h-4 rounded-full border-2 border-white ${colorClass} shadow-lg animate-pulse"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8], // Centraliza o ponto
    popupAnchor: [0, -10]
  });
};

export default function MapComponent({ data }: MapProps) {
  // Centro aproximado do Rio de Janeiro
  const rioCenter: [number, number] = [-22.9068, -43.1729];

  return (
    // z-0 é importante para o mapa não ficar em cima do Header ou Modais
    <MapContainer center={rioCenter} zoom={11} className="h-full w-full z-0 rounded-lg">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // Estilo Clean (Voyager)
      />
      
      {data.map((bairro) => (
        <Marker 
          key={bairro.id} 
          position={[bairro.coordenadas.lat, bairro.coordenadas.lng]}
          icon={createCustomIcon(bairro.status)}
        >
          <Popup className="font-sans">
            <div className="flex flex-col gap-1 min-w-[150px]">
              <h3 className="font-bold text-base">{bairro.bairro}</h3>
              <span className="text-xs text-slate-500 capitalize">{bairro.zona} • {bairro.tipo}</span>
              
              <div className="mt-2 flex items-center justify-between border-t pt-2">
                 <span className="font-bold text-lg">{bairro.aqi}</span>
                 <span className="text-xs uppercase bg-slate-100 px-2 py-0.5 rounded">AQI</span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}