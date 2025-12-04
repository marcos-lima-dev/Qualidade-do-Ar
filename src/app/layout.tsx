// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CloudSun } from "lucide-react"; // Ícone temático

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civitas | Qualidade do Ar Rio",
  description: "Monitoramento em tempo real da qualidade do ar no Rio de Janeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}>
        {/* Header Fixo Profissional */}
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <CloudSun size={20} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-800">
                Civitas<span className="text-blue-600">Rio</span>
              </span>
            </div>
            
            <nav className="text-sm font-medium text-slate-500">
              Desafio Front-end Sênior
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}