import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lightbulb, ShieldCheck } from "lucide-react"; // Ícones de "Ideia" e "Segurança"

export function AirQualityGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* BOTÃO CHAMATIVO E ANIMADO */}
        <Button 
          size="sm" 
          className="
            bg-blue-600 hover:bg-blue-700 text-white border-0
            shadow-lg shadow-blue-500/30 
            transition-all duration-300 hover:scale-105 hover:-translate-y-0.5
            rounded-full px-5 py-5
            group relative overflow-hidden
          "
        >
          {/* Efeito de brilho passando (opcional, dá um toque premium) */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          
          <div className="flex items-center gap-2 relative z-10">
            {/* Ícone de Lâmpada (Dica) que acende no hover */}
            <Lightbulb size={18} className="text-yellow-300 fill-yellow-300/20 group-hover:fill-yellow-300 transition-colors" />
            <span className="font-semibold tracking-wide">Entenda os Riscos</span>
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <ShieldCheck size={28} />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900">Guia de Saúde</DialogTitle>
          </div>
          <DialogDescription className="text-base text-slate-600">
            O número do AQI não é apenas um dado, é um aviso para sua saúde. Veja como se proteger:
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-3">
          {/* Bom */}
          <div className="flex gap-4 p-4 rounded-xl bg-emerald-50/80 border border-emerald-100 hover:bg-emerald-50 transition-colors">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] shrink-0" />
            <div>
              <h4 className="font-bold text-emerald-900 flex items-center gap-2">Bom (0 - 50) <span className="text-[10px] bg-emerald-200 px-2 py-0.5 rounded-full text-emerald-800">Seguro</span></h4>
              <p className="text-sm text-emerald-700 mt-1">O ar está limpo! Ótimo momento para abrir as janelas e praticar esportes ao ar livre.</p>
            </div>
          </div>

          {/* Moderado */}
          <div className="flex gap-4 p-4 rounded-xl bg-amber-50/80 border border-amber-100 hover:bg-amber-50 transition-colors">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] shrink-0" />
            <div>
              <h4 className="font-bold text-amber-900 flex items-center gap-2">Moderado (51 - 100) <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded-full text-amber-800">Atenção</span></h4>
              <p className="text-sm text-amber-700 mt-1">Aceitável para a maioria. Se você tem <strong>asma ou rinite</strong>, pode sentir um leve desconforto. Tenha seu remédio por perto.</p>
            </div>
          </div>

          {/* Ruim */}
          <div className="flex gap-4 p-4 rounded-xl bg-orange-50/80 border border-orange-100 hover:bg-orange-50 transition-colors">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] shrink-0" />
            <div>
              <h4 className="font-bold text-orange-900 flex items-center gap-2">Ruim (101 - 150) <span className="text-[10px] bg-orange-200 px-2 py-0.5 rounded-full text-orange-800">Alerta</span></h4>
              <p className="text-sm text-orange-700 mt-1">Crianças e idosos devem evitar parques e ruas movimentadas. O ar está pesado e pode causar tosse ou irritação.</p>
            </div>
          </div>

          {/* Péssimo */}
          <div className="flex gap-4 p-4 rounded-xl bg-rose-50/80 border border-rose-100 hover:bg-rose-50 transition-colors">
            <div className="w-3 h-3 mt-1.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] shrink-0" />
            <div>
              <h4 className="font-bold text-rose-900 flex items-center gap-2">Péssimo (150+) <span className="text-[10px] bg-rose-200 px-2 py-0.5 rounded-full text-rose-800">Perigo</span></h4>
              <p className="text-sm text-rose-700 mt-1">Emergência de saúde. <strong>Evite sair de casa.</strong> Use máscara se precisar sair. Feche as janelas.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}