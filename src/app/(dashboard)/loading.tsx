// src/app/(dashboard)/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4 md:p-8 space-y-6">
      {/* Título Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[350px]" />
      </div>

      {/* Grid Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        
        {/* Mapa (Lado Esquerdo - Ocupa 2 colunas) */}
        <div className="lg:col-span-2 h-[400px] lg:h-full rounded-xl border bg-white p-2">
          <Skeleton className="h-full w-full rounded-lg" />
        </div>

        {/* Lista Lateral (Lado Direito - Ocupa 1 coluna) */}
        <div className="space-y-4 h-full overflow-hidden">
          <Skeleton className="h-10 w-full" /> {/* Search bar */}
          
          {/* Vários cards de loading */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg bg-white">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}