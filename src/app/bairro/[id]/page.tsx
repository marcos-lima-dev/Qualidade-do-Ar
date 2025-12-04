import { getBairroById } from "@/services/air-quality";
// Removi o Badge daqui pois não estava sendo usado
import { Button } from "@/components/ui/button";
import AirQualityChart from "@/components/dashboard/AirQualityChart";
import { ChevronLeft, Wind, MapPin } from "lucide-react"; 
import Link from "next/link";
import { notFound } from "next/navigation";

// ✅ SOLUÇÃO DO ERRO DE DATA:
// Criamos esta função FORA do componente. Assim o React não reclama de impureza.
function gerarHistoricoSimulado(aqiAtual: number) {
  const agora = Date.now();
  return [
    { data: new Date(agora - 5 * 3600000).toISOString(), valor: Math.max(0, aqiAtual - 15) },
    { data: new Date(agora - 4 * 3600000).toISOString(), valor: Math.max(0, aqiAtual - 5) },
    { data: new Date(agora - 3 * 3600000).toISOString(), valor: Math.max(0, aqiAtual + 10) },
    { data: new Date(agora - 2 * 3600000).toISOString(), valor: Math.max(0, aqiAtual + 2) },
    { data: new Date(agora - 1 * 3600000).toISOString(), valor: Math.max(0, aqiAtual - 8) },
    { data: new Date(agora).toISOString(), valor: aqiAtual },
  ];
}

interface DetalhesProps {
  params: Promise<{ id: string }>;
}

export default async function BairroDetailsPage(props: DetalhesProps) {
  const params = await props.params;
  const id = params.id;

  const bairro = await getBairroById(id);

  if (!bairro) {
    notFound();
  }

  // Agora chamamos a função auxiliar
  const historicoSimulado = gerarHistoricoSimulado(bairro.aqi);

  // Lógica de cores para o header
  const getHeaderColors = (status: string) => {
    switch (status) {
      case 'bom': return 'bg-green-50 border-green-200 text-green-700';
      case 'moderado': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'ruim': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'pessimo': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8 space-y-6">
      <Link href="/">
        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
          <ChevronLeft size={20} />
          Voltar para o mapa
        </Button>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{bairro.bairro}</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            <span>{bairro.zona} • {bairro.tipo === 'medido' ? 'Estação Oficial' : 'Dados Estimados'}</span>
          </div>
        </div>
        
        <div className={`flex flex-col items-end px-6 py-3 rounded-xl border ${getHeaderColors(bairro.status)}`}>
            <span className="text-sm font-semibold uppercase tracking-wider">Qualidade do Ar</span>
            <span className="text-3xl font-bold">{bairro.aqi} AQI</span>
            <span className="text-xs font-medium uppercase mt-1 px-2 py-0.5 bg-white/50 rounded">
                {bairro.status}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-h-[350px]">
          <AirQualityChart data={historicoSimulado} />
        </div>

        <div className="space-y-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Wind size={18} />
                Poluentes Monitorados
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="p-4 rounded-lg border bg-white flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-500">PM2.5 (Partículas Finas)</p>
                        <p className="font-mono text-xl">{bairro.poluentes.pm2_5} <span className="text-xs text-slate-400">µg/m³</span></p>
                    </div>
                </div>
                <div className="p-4 rounded-lg border bg-white flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-500">PM10 (Partículas Inaláveis)</p>
                        <p className="font-mono text-xl">{bairro.poluentes.pm10} <span className="text-xs text-slate-400">µg/m³</span></p>
                    </div>
                </div>
                <div className="p-4 rounded-lg border bg-white flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-500">NO2 (Dióxido de Nitrogênio)</p>
                        <p className="font-mono text-xl">{bairro.poluentes.no2} <span className="text-xs text-slate-400">µg/m³</span></p>
                    </div>
                </div>
                 <div className="p-4 rounded-lg border bg-white flex justify-between items-center">
                    <div>
                        <p className="text-xs text-slate-500">O3 (Ozônio)</p>
                        <p className="font-mono text-xl">{bairro.poluentes.o3} <span className="text-xs text-slate-400">µg/m³</span></p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}