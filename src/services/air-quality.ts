// src/services/air-quality.ts

import { Bairro } from '@/types';
import mockData from '@/data/mock-data.json';

// Simula delay de rede (variável entre 500ms e 1.5s para parecer real)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAirQualityData(): Promise<Bairro[]> {
  // Simula "network latency"
  await delay(1000); 

  // Aqui você poderia adicionar lógica para filtrar ou ordenar se fosse um backend real
  return mockData as Bairro[];
}

export async function getBairroById(id: string): Promise<Bairro | undefined> {
  await delay(800);
  // Precisamos garantir a tipagem ao buscar
  const dados = mockData as Bairro[];
  return dados.find((item) => item.id === id);
}