// src/app/(dashboard)/page.tsx

import Link from "next/link"; // Importante
import { getAirQualityData } from "@/services/air-quality";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapWrapper from "@/components/map/MapWrapper";
import Filters from "@/components/dashboard/Filters"; 

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage(props: PageProps) {
  // 1. Carrega dados brutos
  const dados = await getAirQualityData();
  
  // 2. Resolve os parâmetros da URL
  const searchParams = await props.searchParams;
  const query = (searchParams.q as string)?.toLowerCase() || "";
  const statusFilter = (searchParams.status as string) || "";

  // 3. Aplica a Lógica de Filtragem (Server-Side)
  const dadosFiltrados = dados.filter((item) => {
    const matchNome = item.bairro.toLowerCase().includes(query);
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchNome && matchStatus;
  });

  return (
    <main className="container mx-auto p-4 md:p-6 space-y-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
          <p className="text-slate-500">
            Exibindo <span className="font-semibold text-slate-900">{dadosFiltrados.length}</span> locais filtrados.
          </p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="px-4 py-1">Tempo Real</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* ÁREA DO MAPA (Usa dadosFiltrados!) */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col bg-white border-slate-200 shadow-sm p-0">
           <MapWrapper data={dadosFiltrados} />
        </Card>

        {/* ÁREA DA LISTA */}
        <Card className="flex flex-col h-full bg-white shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="pb-3 border-b space-y-3">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Bairros</span>
              <Badge variant="secondary">{dadosFiltrados.length}</Badge>
            </CardTitle>
            
            {/* Filtros */}
            <Filters />
            
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-0">
            {dadosFiltrados.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                Nenhum bairro encontrado com esses filtros.
              </div>
            ) : (
              <div className="divide-y">
                {dadosFiltrados.map((item) => (
                  // ✅ AQUI ESTÁ A CORREÇÃO: Link envolvendo o item
                  <Link 
                    href={`/bairro/${item.id}`} 
                    key={item.id} 
                    className="block hover:bg-slate-50 transition-colors"
                  >
                    <div className="p-4 flex justify-between items-center cursor-pointer group">
                      <div>
                        <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{item.bairro}</h3>
                        <p className="text-xs text-slate-500 capitalize">{item.zona} • {item.tipo}</p>
                      </div>
                      <div className="text-right">
                         <span className={`text-lg font-bold ${
                            item.status === 'bom' ? 'text-green-600' : 
                            item.status === 'moderado' ? 'text-yellow-600' : 
                            item.status === 'ruim' ? 'text-red-600' : 'text-purple-600'
                         }`}>
                            {item.aqi}
                         </span>
                         <p className="text-[10px] text-slate-400 uppercase">AQI</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  );
}