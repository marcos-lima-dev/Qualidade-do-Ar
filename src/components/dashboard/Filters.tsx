// src/components/dashboard/Filters.tsx (VERSÃO CORRIGIDA)
"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // <--- Agora vamos usar de verdade

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // ✅ AQUI ESTÁ A CORREÇÃO:
  // Envolvemos a lógica no useDebouncedCallback com 300ms de delay
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300); // 300ms de espera após parar de digitar

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status && status !== "todos") {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <Input
        placeholder="Buscar bairro..."
        className="sm:w-[250px] bg-white"
        // O defaultValue garante que o input não perca o valor ao dar refresh
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <Select 
        onValueChange={handleStatus} 
        defaultValue={searchParams.get("status")?.toString() || "todos"}
      >
        <SelectTrigger className="w-full sm:w-[180px] bg-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Status</SelectItem>
          <SelectItem value="bom">🟢 Bom</SelectItem>
          <SelectItem value="moderado">🟡 Moderado</SelectItem>
          <SelectItem value="ruim">🔴 Ruim</SelectItem>
          <SelectItem value="pessimo">🟣 Péssimo</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}