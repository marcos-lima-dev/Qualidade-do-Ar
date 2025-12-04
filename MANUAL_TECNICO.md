📘 Manual Técnico: CivitasRio (Air Quality Dashboard)
Versão: 1.0.0 Stack: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Shadcn UI, Recharts, Leaflet.

1. Visão Geral da Arquitetura
O projeto foi construído seguindo a arquitetura do Next.js App Router, priorizando Server Components para busca de dados e performance inicial, e Client Components apenas onde há interatividade (mapas, gráficos, filtros).

Fluxo de Dados (Data Flow)
Snippet de código

graph TD
    A[Server: Page Load] -->|Fetch Mock Data| B[Service: getAirQualityData]
    B --> C[Server Component: DashboardPage]
    C -->|Props: Dados Filtrados| D[Client Wrapper: MapWrapper]
    C -->|Props: Dados Filtrados| E[Server: Lista de Cards]
    D -->|Lazy Load| F[Client: MapComponent (Leaflet)]
    G[User: Interaction] -->|URL Params| H[Client: Filters]
    H -->|Update URL| C
Principais Decisões Técnicas
Server-Side Rendering (SSR): A carga inicial de dados e a renderização da lista de bairros ocorrem no servidor, garantindo SEO e LCP (Largest Contentful Paint) otimizados.

Estado via URL: Não utilizamos Redux ou Context API para os filtros. O estado "global" reside na URL (?q=centro&status=ruim), permitindo que links sejam compartilháveis e o estado persista no refresh.

Lazy Loading de Mapas: O Leaflet exige o objeto window, inexistente no servidor. Utilizamos next/dynamic com ssr: false para carregar o mapa apenas no cliente, evitando erros de hidratação.

React Compiler (Experimental): Ativado no next.config para otimização automática de re-renderizações (memoização automática).

2. Estrutura de Diretórios
A organização segue o padrão modular, separando UI genérica de componentes de negócio.

Plaintext

src/
├── app/
│   ├── (dashboard)/       # Grupo de rotas (Layout principal)
│   │   ├── page.tsx       # Controller da Home (Server Side)
│   │   ├── loading.tsx    # Skeleton UI automático
│   │   └── layout.tsx     # Layout Global (Header, Fontes)
│   ├── bairro/[id]/       # Rota Dinâmica (Detalhes)
│   └── globals.css        # Config do Tailwind v4 e Resets
├── components/
│   ├── dashboard/         # Componentes de Negócio
│   │   ├── AirQualityChart.tsx # Gráfico Recharts
│   │   └── Filters.tsx         # Manipulação de URL
│   ├── map/               # Sistema de Mapas
│   │   ├── MapComponent.tsx    # Implementação Leaflet
│   │   └── MapWrapper.tsx      # Isolamento Client-Side
│   └── ui/                # Biblioteca Shadcn (Botões, Cards, etc.)
├── services/              # Camada de Dados
│   └── air-quality.ts     # Mock com delay simulado
├── types/                 # Contratos TypeScript
└── data/                  # JSON estático (Seed Data)
3. Detalhamento dos Componentes
3.1. Sistema de Mapas (src/components/map)
O mapa é o componente mais complexo devido à incompatibilidade com SSR.

MapWrapper.tsx: Atua como uma fronteira de segurança. Ele usa "use client" e importa o mapa real via next/dynamic. Enquanto o mapa carrega, exibe um Skeleton.

MapComponent.tsx: Contém a lógica do Leaflet.

Destaque: Uso de L.divIcon com classes do Tailwind (bg-red-500 animate-pulse) em vez de imagens PNG. Isso reduz drasticamente o peso da página e permite estilização dinâmica baseada no status do ar.

3.2. Dashboard e Filtros (src/app/(dashboard)/page.tsx)
Responsabilidade: Busca dados, processa os Search Params e renderiza o layout.

Filtragem: A filtragem ocorre no Server Side. O componente recebe os parâmetros da URL, filtra o array de dados e passa apenas o resultado para os componentes filhos.

Estilização Condicional: Utiliza uma função getStatusStyles para aplicar classes de cor (bordas, textos, ícones) dinamicamente baseadas no AQI (Bom, Moderado, Ruim).

3.3. Gráficos (AirQualityChart.tsx)
Biblioteca: Recharts.

Correção de Altura: Foi implementado um wrapper div com altura fixa (h-[300px]) ao redor do ResponsiveContainer. Isso corrige um bug conhecido onde o gráfico renderizava com altura -1 ou 0 dentro de Flexbox/Grids com padding.

3.4. Filtros Interativos (Filters.tsx)
Hook: useDebouncedCallback (da lib use-debounce).

Lógica: Ao digitar, aguarda 300ms antes de atualizar a URL. Isso previne que a página recarregue a cada tecla pressionada (Server request spam), garantindo performance suave.

4. Página de Detalhes e Pureza (src/app/bairro/[id])
A página de detalhes exibe histórico e métricas específicas.

Desafio Enfrentado: O erro Date.now() is an impure function.

Solução: O React Compiler exige pureza. Movemos a geração de dados simulados (que usa Date.now()) para uma função auxiliar externa ao componente exportado. Isso estabiliza o render e satisfaz as regras de Hooks.

Rotas Dinâmicas: Uso de generateMetadata (implícito) e validação de params assíncronos (padrão Next.js 15).

5. Estilização e Design System
Tailwind CSS v4
Utilizamos a versão mais recente do Tailwind, que dispensa o tailwind.config.ts. A configuração vive no CSS:

CSS

@theme inline {
  --color-primary: var(--primary);
  /* ... variáveis do Shadcn ... */
}
Reset Global (globals.css)
Foi adicionado um reset específico para garantir que os links (<a>) dentro dos cards não herdassem o estilo padrão do navegador (azul/sublinhado):

CSS

@layer base {
  a {
    @apply no-underline text-inherit;
  }
}
Shadcn UI
Componentes base (Button, Card, Badge, Select) foram instalados via CLI, garantindo acessibilidade (ARIA) e consistência visual sem esforço manual.

6. Qualidade e CI/CD
GitHub Actions (.github/workflows/ci.yml)
Implementamos um pipeline de Integração Contínua que roda a cada push ou pull_request na main.

Checkout: Baixa o código.

Setup Node: Prepara o ambiente Node 20.

Install: npm ci (Clean Install).

Lint: Verifica erros de código e variáveis não usadas.

Build: Tenta compilar o projeto para produção. Se houver erro de TypeScript ou Next.js, o pipeline falha, impedindo deploy de código quebrado.

7. Mock de Dados e API
O arquivo src/services/air-quality.ts simula uma API REST real.

Latência: Introduzimos um delay(1000) artificial.

Objetivo: Isso força a aplicação a exibir os estados de Loading (Skeletons) criados em loading.tsx e MapWrapper, provando que a UI é resiliente a redes lentas.

8. Como Executar o Projeto
Bash

# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento (com Turbopack)
npm run dev

# 3. Rodar Linter (Verificação de qualidade)
npm run lint

# 4. Build de Produção
npm run build
npm start
Documentação gerada automaticamente com base no desenvolvimento do projeto CivitasRio - Dezembro/2025.