import Link from "next/link";
import { getAirQualityData } from "@/services/air-quality";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MapWrapper from "@/components/map/MapWrapper";
import Filters from "@/components/dashboard/Filters"; 
import { Flame, Gauge, Wind, ArrowRight, MapPin, Signal, Info } from "lucide-react"; 

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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'bom': return { color: 'text-emerald-600', border: 'border-l-emerald-500', icon: Wind };
      case 'moderado': return { color: 'text-amber-600', border: 'border-l-amber-500', icon: Gauge };
      case 'ruim': return { color: 'text-orange-600', border: 'border-l-orange-500', icon: Flame };
      case 'pessimo': return { color: 'text-rose-600', border: 'border-l-rose-500', icon: Flame };
      default: return { color: 'text-slate-600', border: 'border-l-slate-300', icon: Wind };
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-6 space-y-8 h-[calc(100vh-64px)] flex flex-col bg-slate-50">
      
      {/* 1. MUDANÇA: HERO SECTION HUMANIZADA */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Como está o ar hoje?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Confira se o seu bairro está seguro para <span className="font-semibold text-blue-600">atividades físicas</span> e proteja a saúde da sua família.
          </p>
        </div>

        {/* Pequena legenda rápida de contexto */}
        <div className="hidden lg:flex gap-4 text-xs font-medium text-slate-500 bg-white p-3 rounded-lg border shadow-sm">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Bom (0-50)</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Moderado (51-100)</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div>Ruim (100+)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* MAPA */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col bg-white border-slate-200 shadow-md p-0 rounded-xl">
           <MapWrapper data={dadosFiltrados} />
        </Card>

        {/* LISTA LATERAL */}
        <Card className="flex flex-col h-full bg-slate-100/50 shadow-md border-slate-200 overflow-hidden rounded-xl">
          <CardHeader className="pb-4 border-b bg-white z-10 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-bold text-slate-800">Seu Bairro</CardTitle>
                <Badge variant="secondary" className="px-2 py-0.5 text-xs font-mono bg-slate-100 text-slate-600">
                  {dadosFiltrados.length} locais
                </Badge>
              </div>
            </div>
            <Filters />
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
            {dadosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-center">
                <Info size={32} className="mb-2 opacity-50" />
                <p className="text-sm">Não encontramos este local.<br/>Tente buscar por zona (ex: Sul).</p>
              </div>
            ) : (
              dadosFiltrados.map((item) => {
                const style = getStatusStyles(item.status);
                const Icon = style.icon;

                return (
                  <Link 
                    href={`/bairro/${item.id}`} 
                    key={item.id} 
                    className="block group relative no-underline"
                  >
                    <div className={`
                      bg-white w-full p-4 rounded-xl 
                      border border-slate-200 shadow-sm
                      border-l-[6px] ${style.border}
                      hover:shadow-lg hover:border-slate-300 hover:-translate-y-1
                      transition-all duration-300 ease-out
                      flex justify-between items-center
                    `}>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                          {item.bairro}
                        </h3>
                        <div className="flex items-center flex-wrap gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                            <MapPin size={10} /> {item.zona}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                         <div className="text-right">
                            <div className={`flex items-center justify-end gap-1.5 text-xl font-black ${style.color}`}>
                               <Icon size={18} strokeWidth={2.5} />
                               {item.status === 'bom' ? 'Bom' : item.status === 'moderado' ? 'Médio' : 'Ruim'}
                            </div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">
                              Índice {item.aqi}
                            </p>
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