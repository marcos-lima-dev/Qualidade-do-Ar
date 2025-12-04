// src/types/index.ts

export type StatusQualidade = 'bom' | 'moderado' | 'ruim' | 'pessimo';
export type TipoLeitura = 'medido' | 'estimado'; // O nosso diferencial estratégico

export interface Poluentes {
  pm2_5: number;
  pm10: number;
  no2: number;
  o3: number;
}

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface HistoricoItem {
  data: string;
  valor: number;
}

export interface Bairro {
  id: string;
  bairro: string;
  zona: string;
  tipo: TipoLeitura;
  coordenadas: Coordenadas;
  aqi: number; // Índice de Qualidade do Ar (0-500)
  status: StatusQualidade;
  poluentes: Poluentes;
  historico?: HistoricoItem[];
}