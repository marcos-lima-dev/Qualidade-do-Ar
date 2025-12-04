"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartProps {
  data: Array<{ data: string; valor: number }>;
}

export default function AirQualityChart({ data }: ChartProps) {
  // Formata os dados para o gráfico ficar legível
  const formattedData = data.map(item => ({
    time: new Date(item.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    aqi: item.valor
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Variação nas últimas horas</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 'auto']} // Começa do 0
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
            />
            <Line 
              type="monotone" 
              dataKey="aqi" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}