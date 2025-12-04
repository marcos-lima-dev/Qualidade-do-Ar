// src/app/(dashboard)/page.tsx
import Link from "next/link";
import { getAirQualityData } from "@/services/air-quality";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapWrapper from "@/components/map/MapWrapper";
import Filters from "@/components/dashboard/Filters"; 
import { Flame, Gauge, Wind, MapPin, Signal, ArrowRight } from "lucide-react"; 

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage(props: PageProps) {
  const dados = await getAirQualityData();
  const searchParams = await props.searchParams;
  
  const query = (searchParams.q as string)?.toLowerCase() || "";
  const statusFilter = (searchParams.status as string) || "";

  const dadosFiltrados = dados.filter((item) => {
    const matchNome = item.bairro.toLowerCase().includes(query);
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    return matchNome && matchStatus;
  });

  // 🎨 Estilos dinâmicos baseados no status (Agora com background mais suave para o card)
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'bom': 
        return { 
          color: 'text-emerald-600', 
          border: 'border-l-emerald-500', 
          icon: Wind 
        };
      case 'moderado': 
        return { 
          color: 'text-amber-600', 
          border: 'border-l-amber-500', 
          icon: Gauge 
        };
      case 'ruim': 
        return { 
          color: 'text-orange-600', 
          border: 'border-l-orange-500', 
          icon: Flame 
        };
      case 'pessimo': 
        return { 
          color: 'text-rose-600', 
          border: 'border-l-rose-500', 
          icon: Flame 
        };
      default: 
        return { 
          color: 'text-slate-600', 
          border: 'border-l-slate-300', 
          icon: Wind 
        };
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-6 space-y-6 h-[calc(100vh-64px)] flex flex-col bg-slate-50">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visão Geral</h1>
          <p className="text-slate-500 mt-1">
            Monitorando <span className="font-semibold text-slate-900">{dadosFiltrados.length}</span> estações em tempo real.
          </p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="px-3 py-1 bg-white shadow-sm gap-2 border-slate-200">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span className="text-slate-700">Sistema Online</span>
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* MAPA */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col bg-white border-slate-200 shadow-md p-0 rounded-xl">
           <MapWrapper data={dadosFiltrados} />
        </Card>

        {/* LISTA DE CARDS (Sidebar) */}
        <Card className="flex flex-col h-full bg-slate-100/50 shadow-md border-slate-200 overflow-hidden rounded-xl">
          <CardHeader className="pb-4 border-b bg-white z-10 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-slate-800">Locais</CardTitle>
              <Badge variant="secondary" className="px-2.5 py-0.5 text-xs font-mono">
                {dadosFiltrados.length}
              </Badge>
            </div>
            <Filters />
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
            {dadosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                <Wind size={40} className="mb-2 opacity-20" />
                <p>Nenhum local encontrado.</p>
              </div>
            ) : (
              // Mapeamento dos itens
              dadosFiltrados.map((item) => {
                const style = getStatusStyles(item.status);
                const Icon = style.icon;

                return (
                  <Link 
                    href={`/bairro/${item.id}`} 
                    key={item.id} 
                    className="block group relative no-underline" // no-underline remove o sublinhado azul
                  >
                    {/* O CARD DE VERDADE */}
                    <div className={`
                      bg-white w-full p-4 rounded-xl 
                      border border-slate-200 shadow-sm
                      border-l-[6px] ${style.border} /* A faixa colorida lateral */
                      hover:shadow-lg hover:border-slate-300 hover:-translate-y-1
                      transition-all duration-300 ease-out
                      flex justify-between items-center
                    `}>
                      
                      {/* Lado Esquerdo: Textos */}
                      <div className="flex flex-col gap-1">
                        {/* Nome do Bairro (Forçando cor escura para não ficar azul) */}
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                          {item.bairro}
                        </h3>
                        
                        {/* Badges de Zona e Tipo */}
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                            <MapPin size={10} /> {item.zona}
                          </span>
                          
                          {item.tipo === 'medido' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                              <Signal size={10} /> Oficial
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Lado Direito: Valor AQI */}
                      <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                         <div className="text-right">
                            <div className={`flex items-center justify-end gap-1.5 text-2xl font-black ${style.color}`}>
                               <Icon size={20} strokeWidth={2.5} />
                               {item.aqi}
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">AQI</p>
                         </div>
                      </div>

                    </div>
                  </Link>
                );
              })
            )}
          </CardContent>
        </Card>

      </div>
    </main>
  );
}