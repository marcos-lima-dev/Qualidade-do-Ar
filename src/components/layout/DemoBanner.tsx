"use client";

import { Info, AlertTriangle, CheckCircle2, FlaskConical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DemoBanner() {
  return (
    <div className="bg-amber-100 text-amber-900 text-[11px] md:text-xs py-2 px-4 text-center border-b border-amber-200 flex flex-col md:flex-row items-center justify-center gap-1">
      <div className="flex items-center gap-2">
        <Info size={14} className="shrink-0 text-amber-700" />
        <strong>Modo de Demonstração:</strong>
      </div>
      <p className="opacity-90">
        Os valores abaixo são exemplos ilustrativos para avaliação técnica.
      </p>
      
      {/* O BOTÃO "LEIA MAIS" QUE ABRE O MODAL */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="underline font-bold text-amber-800 hover:text-amber-950 ml-1 cursor-pointer">
            Entenda a origem dos dados.
          </button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-100 rounded-full text-amber-700">
                    <FlaskConical size={24} />
                </div>
                <DialogTitle className="text-xl font-bold text-slate-900">Sobre este Projeto</DialogTitle>
            </div>
            <DialogDescription className="text-base text-slate-600">
              Transparência sobre a metodologia, finalidade e origem das informações exibidas neste dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-blue-600" />
                    Finalidade do Projeto
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                    Este aplicativo foi desenvolvido exclusivamente como parte de um <strong>Desafio Técnico para Desenvolvedor Front-end Sênior</strong>. O objetivo é demonstrar competências em arquitetura de software (Next.js), performance, UX/UI e manipulação de mapas interativos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                        <CheckCircle2 size={16} className="text-green-600" />
                        O que é Real?
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        <li>A <strong>Geografia</strong> (Mapa do Rio).</li>
                        <li>Os <strong>Nomes dos Bairros</strong>.</li>
                        <li>A <strong>Escala de Cores</strong> (Padrão CONAMA).</li>
                        <li>A <strong>Lógica da Interface</strong>.</li>
                    </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-amber-600" />
                        O que é Simulado?
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                        <li>Os <strong>Números do AQI</strong> (Índice).</li>
                        <li>O <strong>Status Atual</strong> (Bom/Ruim).</li>
                        <li>Os <strong>Gráficos Históricos</strong>.</li>
                    </ul>
                </div>
            </div>

            <div className="text-xs text-slate-500 italic mt-4 border-t pt-4">
                * Os dados foram gerados via Mock (Simulação) para garantir que todas as variações visuais (cores, ícones, alertas) pudessem ser testadas e visualizadas pelo avaliador, independente da condição real do clima no momento do acesso.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}