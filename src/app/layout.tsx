import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CloudSun } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// 1. MUDANÇA: Título focado no usuário, não no projeto
export const metadata: Metadata = {
  title: "Qualidade do Ar Rio | Monitoramento em Tempo Real",
  description: "Saiba se é seguro praticar atividades ao ar livre no seu bairro agora.",
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
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <CloudSun size={22} />
              </div>
              <div className="flex flex-col leading-none">
                {/* 2. MUDANÇA: Nome direto e funcional */}
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Qualidade do Ar
                </span>
                <span className="text-[10px] font-medium text-blue-600 uppercase tracking-widest">
                  Rio de Janeiro
                </span>
              </div>
            </div>
            
            {/* Link discreto para a prefeitura/tech */}
            <nav className="hidden md:block text-xs font-medium text-slate-400">
              Dados oficiais • Prefeitura do Rio
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}