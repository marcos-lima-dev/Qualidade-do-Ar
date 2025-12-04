import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CloudSun, Linkedin } from "lucide-react";
// Importamos o novo banner interativo
import { DemoBanner } from "@/components/layout/DemoBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Título que aparece na aba do navegador
  title: "Qualidade do Ar Rio",
  
  // Descrição para SEO (Google)
  description: "Monitoramento em tempo real da qualidade do ar nos bairros do Rio de Janeiro. Dados demonstrativos.",
  
  // Configuração para WhatsApp, LinkedIn, Twitter (Open Graph)
  openGraph: {
    title: "Qualidade do Ar Rio | Monitoramento",
    description: "Saiba se é seguro praticar atividades ao ar livre no seu bairro agora.",
    url: "https://qualidade-doar.netlify.app/",
    siteName: "Qualidade do Ar Rio",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body 
        className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}
        suppressHydrationWarning={true}
      >
        <div className="sticky top-0 z-50 w-full">
            {/* 1. BARRA DE AVISO (Agora é um componente isolado com Modal) */}
            <DemoBanner />

            {/* 2. HEADER PRINCIPAL */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm hover:scale-105 transition-transform">
                            <CloudSun size={22} />
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-lg font-bold tracking-tight text-slate-900">
                            Qualidade do Ar
                            </span>
                            <span className="text-[10px] font-medium text-blue-600 uppercase tracking-widest">
                            Rio de Janeiro
                            </span>
                        </div>
                    </div>
                    
                    {/* Link LinkedIn */}
                    <nav>
                        <a 
                            href="https://www.linkedin.com/in/marcos-de-sousa-lima-1a6a6320/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="
                            flex items-center gap-2 text-xs font-medium text-slate-500 
                            bg-slate-100 hover:bg-blue-50 hover:text-blue-700 
                            px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-blue-100
                            "
                        >
                            <span className="hidden sm:inline">Desenvolvido por Marcos Lima</span>
                            <span className="sm:hidden">Marcos Lima</span>
                            <Linkedin size={14} />
                        </a>
                    </nav>
                </div>
            </header>
        </div>

        {children}
      </body>
    </html>
  );
}