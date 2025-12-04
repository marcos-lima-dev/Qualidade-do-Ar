import { getBairroById } from "@/services/air-quality";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AirQualityChart from "@/components/dashboard/AirQualityChart";
import { ChevronLeft, Wind, MapPin } from "lucide-react"; // Requer: npm install lucide-react
import Link from "next/link";
import { notFound } from "next/navigation";

// Definindo a interface para Params no Next.js 15+
interface DetalhesProps {
  params: Promise<{ id: string }>;
}

export default async function BairroDetailsPage(props: DetalhesProps) {
  // 1. Resolve os params (obrigatório await no Next 15)
  const params = await props.params;
  const id = params.id;

  // 2. Busca os dados
  const bairro = await getBairroById(id);

  // 3. Trata erro 404 se não achar
  if (!bairro) {
    notFound();
  }

  // Gera dados fictícios de histórico para o gráfico (já que nosso mock estático não tem array cheio)
  // No "mundo real", isso viria do backend
  const historicoSimulado = [
    { data: new Date(Date.now() - 5 * 3600000).toISOString(), valor: bairro.aqi - 15 },
    { data: new Date(Date.now() - 4 * 3600000).toISOString(), valor: bairro.aqi - 5 },
    { data: new Date(Date.now() - 3 * 3600000).toISOString(), valor: bairro.aqi + 10 },
    { data: new Date(Date.now() - 2 * 3600000).toISOString(), valor: bairro.aqi + 2 },
    { data: new Date(Date.now() - 1 * 3600000).toISOString(), valor: bairro.aqi - 8 },
    { data: new Date().toISOString(), valor: bairro.aqi },
  ];

  return (
    <main className="container mx-auto p-4 md:p-8 space-y-6">
      {/* Botão Voltar */}
      <Link href="/">
        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-blue-600">
          <ChevronLeft size={20} />
          Voltar para o mapa
        </Button>
      </Link>

      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{bairro.bairro}</h1>
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin size={16} />
            <span>{bairro.zona} • {bairro.tipo === 'medido' ? 'Estação Oficial' : 'Dados Estimados'}</span>
          </div>
        </div>
        
        <div className={`flex flex-col items-end px-6 py-3 rounded-xl border ${
            bairro.status === 'bom' ? 'bg-green-50 border-green-200 text-green-700' :
            bairro.status === 'moderado' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
            'bg-red-50 border-red-200 text-red-700'
        }`}>
            <span className="text-sm font-semibold uppercase tracking-wider">Qualidade do Ar</span>
            <span className="text-3xl font-bold">{bairro.aqi} AQI</span>
            <span className="text-xs font-medium uppercase mt-1 px-2 py-0.5 bg-white/50 rounded">
                {bairro.status}
            </span>
        </div>
      </div>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico (Ocupa 2 espaços) */}
        <div className="lg:col-span-2 min-h-[350px]">
          <AirQualityChart data={historicoSimulado} />
        </div>

        {/* Poluentes (Cards Laterais) */}
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