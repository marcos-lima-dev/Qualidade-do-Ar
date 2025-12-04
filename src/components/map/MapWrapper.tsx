// src/components/map/MapWrapper.tsx
"use client"; // <--- A mágica acontece aqui

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { Bairro } from "@/types";

// Movemos a lógica do dynamic para cá
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full bg-slate-200 rounded-lg animate-pulse" />,
});

interface MapWrapperProps {
  data: Bairro[];
}

export default function MapWrapper({ data }: MapWrapperProps) {
  return (
    <div className="h-full w-full min-h-[400px]">
      <MapComponent data={data} />
    </div>
  );
}