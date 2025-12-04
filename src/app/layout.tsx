import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CloudSun, Info, Linkedin } from "lucide-react"; // Adicionei o ícone do Linkedin

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qualidade do Ar Rio | Demonstração",
  description: "Projeto demonstrativo de interface. Os dados exibidos são apenas exemplos ilustrativos.",
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
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
          
          {/* BARRA DE AVISO AMARELA - Bem explícita e educativa */}
          <div className="bg-amber-100 text-amber-900 text-[11px] md:text-xs py-2 px-4 text-center border-b border-amber-200 flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
            <div className="flex items-center gap-2">
                <Info size={14} className="shrink-0 text-amber-700" />
                <strong>Modo de Demonstração:</strong> 
            </div>
            <p className="opacity-90">
              Os valores abaixo são <u>exemplos ilustrativos</u> para avaliação técnica e não representam a medição real.
            </p>
          </div>

          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            {/* Lado Esquerdo: Logo */}
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
            
            {/* Lado Direito: Link para o LinkedIn */}
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
                <span>Desenvolvido por Marcos Lima</span>
                <Linkedin size={14} />
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}