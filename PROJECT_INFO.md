# Nexus Mobility AI

**"Conectando Brasília de forma inteligente, previsível e sustentável."**

## Sobre o Projeto

Nexus Mobility AI é uma plataforma completa de mobilidade urbana baseada em Inteligência Artificial que conecta cidadãos, operadores e governo em um único ecossistema. Desenvolvido como protótipo para hackathon, o projeto visa transformar o transporte público do Distrito Federal.

## Solução

Uma plataforma com 7 módulos integrados:

### 1. **Landing Page** (`/`)
Apresentação do projeto com informações sobre módulos, benefícios e ODS atendidos.

### 2. **Mapa Interativo** (`/map`)
- Visualização do mapa do DF com paradas de ônibus
- QR Code virtual para cada parada
- Informações em tempo real: próximo ônibus, lotação prevista, índice de segurança
- Interface interativa com cores indicando níveis de lotação

### 3. **Assistente IA de Mobilidade** (`/assistant`)
- Chatbot inteligente que responde perguntas sobre mobilidade
- Recomendações personalizadas de rotas
- Interface conversacional natural
- Sugestões contextuais baseadas nas necessidades do usuário

### 4. **Resultado de Rotas** (`/route-result`)
- Múltiplas opções de rota (rápida, econômica, confortável)
- Detalhes completos: duração, baldeações, lotação prevista
- Indicadores de segurança para cada rota
- Visualização passo a passo do trajeto

### 5. **Previsão de Lotação** (`/crowd-prediction`)
- Gráficos interativos mostrando lotação por horário
- Previsões baseadas em IA para os próximos ônibus
- Fatores considerados: hora, dia da semana, eventos, histórico
- Recomendações de melhores horários para viajar

### 6. **Segurança Colaborativa** (`/safety`)
- Índice de segurança para cada rota
- Sistema de reportes da comunidade
- Mapa de incidentes recentes
- Estatísticas e dicas de segurança

### 7. **Dashboard Governamental** (`/dashboard`)
- Métricas em tempo real do sistema de transporte
- Gráficos e análises detalhadas
- Mapa de calor de congestionamento por RA
- Alertas e recomendações da IA para gestores
- Performance de linhas e identificação de gargalos

### 8. **Caronas Inteligentes** (`/carpooling`)
- Sistema de compartilhamento de viagens
- Divisão automática de custos
- Motoristas verificados
- Impacto ambiental calculado
- Sistema de avaliações

## Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **React Router** - Navegação entre páginas
- **Tailwind CSS** - Estilização
- **Recharts** - Visualização de dados
- **Motion (Framer Motion)** - Animações
- **Lucide React** - Ícones
- **Radix UI** - Componentes acessíveis
- **Sonner** - Notificações toast

## ODS Atendidos

- **ODS 11**: Cidades e Comunidades Sustentáveis
- **ODS 9**: Inovação e Infraestrutura
- **ODS 10**: Redução das Desigualdades
- **ODS 13**: Ação Contra a Mudança Climática

## Funcionalidades com IA

A IA é utilizada em diversos módulos:

1. **Previsão de Lotação**: Análise de padrões históricos, eventos e horários
2. **Recomendação de Rotas**: Otimização baseada em múltiplos fatores
3. **Assistente Virtual**: Processamento de linguagem natural para interação
4. **Análise de Dados**: Identificação de gargalos e sugestões de melhoria
5. **Matching de Caronas**: Algoritmo que conecta pessoas com trajetos similares

## Modelo de Negócio

- **Governo**: Licença anual da plataforma
- **Concessionárias**: Dashboard premium com métricas avançadas
- **Empresas**: Relatórios de mobilidade corporativa

## Diferenciais

✅ Usa IA e Ciência de Dados  
✅ Foco em UX/UI moderna  
✅ Solução para mobilidade urbana real  
✅ Sustentável e inclusivo  
✅ Gestão pública eficiente  
✅ Solução escalável  
✅ Baixo custo de implementação  
✅ Alto impacto social  

## Navegação

- `/` - Landing page
- `/map` - Mapa interativo
- `/assistant` - Assistente IA
- `/route-result` - Rotas detalhadas
- `/crowd-prediction` - Previsão de lotação
- `/safety` - Segurança colaborativa
- `/dashboard` - Dashboard governamental
- `/carpooling` - Caronas inteligentes

## Dados Demo

Todos os dados são simulados para fins de demonstração do protótipo. Em produção, seriam integrados com:
- APIs de transporte público do DF
- Dados históricos de operação
- Sensores IoT em ônibus e paradas
- Reportes da comunidade em tempo real
- Sistemas governamentais existentes
