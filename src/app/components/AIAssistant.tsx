import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Send,
  Sparkles,
  MapPin,
  Clock,
  TrendingUp,
  Navigation,
  Zap,
  Bus,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  suggestions?: string[];
  routeInfo?: {
    from: string;
    to: string;
    duration: string;
    crowdLevel: string;
    transfers: number;
  };
}

interface TripContext {
  from?: string;
  to?: string;
  time?: string;
}

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const extractTripContext = (message: string): Partial<TripContext> => {
  const context: Partial<TripContext> = {};
  const normalized = normalizeText(message);

  const routeMatch = normalized.match(/de\s+([a-z0-9\s]+?)\s+para\s+([a-z0-9\s]+?)(?:\s+as\s+\d{1,2}(?::\d{2})?h?)?$/i);
  if (routeMatch) {
    context.from = routeMatch[1].trim();
    context.to = routeMatch[2].trim();
  }

  const timeMatch = normalized.match(/(?:as|a partir das|por volta de)\s*(\d{1,2})(?::(\d{2}))?\s*h?/i);
  if (timeMatch) {
    const hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2] ?? "0");
    if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
      context.time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    }
  }

  return context;
};

export function AIAssistant() {
  const navigate = useNavigate();
  const [tripContext, setTripContext] = useState<TripContext>({});
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Olá! Sou a IA do Mobility IA. Como posso ajudar você hoje?",
      suggestions: [
        "Ir de Planaltina para Taguatinga",
        "Melhor horário para viajar",
        "Rotas menos lotadas",
        "Verificar lotação atual",
      ],
    },
  ]);
  const [input, setInput] = useState("");

  const quickPrompts = [
    "Preciso sair de Planaltina para Taguatinga às 18h",
    "Qual o melhor horário para evitar lotação?",
    "Quero ir ao Plano Piloto agora",
    "Rotas diretas entre Ceilândia e Gama",
  ];

  const handleSend = (message?: string) => {
    const userMessage = message || input;
    if (!userMessage.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userMessage,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const extractedContext = extractTripContext(userMessage);
    setTripContext((prev) => ({ ...prev, ...extractedContext }));

    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      const lowerMessage = normalizeText(userMessage);
      const mergedContext: TripContext = { ...tripContext, ...extractedContext };

      const isGreeting = /\b(oi|ola|e ai|bom dia|boa tarde|boa noite|salve)\b/.test(lowerMessage);
      const isThanks = /\b(obrigado|obrigada|valeu|agradeco|agradeco)\b/.test(lowerMessage);
      const isBye = /\b(tchau|ate mais|falou|encerrar|fim)\b/.test(lowerMessage);
      const asksHelp = /\b(ajuda|nao sei|não sei|como funciona|por onde comeco|por onde comeco)\b/.test(lowerMessage);
      const asksName = /\b(seu nome|quem e voce|quem e vc|quem e você)\b/.test(lowerMessage);
      const asksCrowd = /\b(lotacao|lotado|cheio|vazio|movimento)\b/.test(lowerMessage);
      const asksBestTime = /\b(horario|horario ideal|melhor hora|melhor horario|que horas)\b/.test(lowerMessage);

      if (isGreeting) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Oi! Que bom te ver por aqui. Me conta de onde você sai, para onde vai e em que horário, que eu te trago a melhor rota com tempo, lotação e segurança.",
          suggestions: [
            "Oi, saio de Ceilândia e vou para o Plano Piloto às 07:30",
            "Quero evitar ônibus lotado",
            "Me ajuda a escolher o melhor horário",
          ],
        };
      } else if (isThanks) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Você é demais. Se quiser, já te ajudo com a próxima viagem também. É só mandar origem, destino e horário.",
          suggestions: ["Nova rota", "Ver melhor horário", "Comparar rotas"],
        };
      } else if (isBye) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Fechado. Quando quiser planejar outra viagem, me chama com um 'oi' que eu monto tudo rapidinho para você.",
          suggestions: ["Planejar rota agora", "Ver lotação atual"],
        };
      } else if (asksName) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Sou a IA de mobilidade do Mobility IA. Posso montar rotas, prever lotação e sugerir o melhor horário para você sair.",
          suggestions: ["Quero uma rota", "Melhor horário para viajar", "Rotas menos lotadas"],
        };
      } else if (asksHelp) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Claro. Pode falar em linguagem natural, por exemplo: 'oi, preciso ir de Samambaia para Asa Norte às 18h'. A partir disso eu comparo rotas e te explico qual vale mais a pena.",
          suggestions: [
            "Ir de Samambaia para Asa Norte às 18h",
            "Quero a rota mais segura",
            "Mostrar rota menos lotada",
          ],
        };
      } else if (userMessage.toLowerCase().includes("planaltina") && userMessage.toLowerCase().includes("taguatinga")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Encontrei a melhor rota para você! Vou mostrar 3 opções, sendo uma rota direta que evita a Rodoviária do Plano Piloto.",
          routeInfo: {
            from: "Planaltina",
            to: "Taguatinga",
            duration: "52 min",
            crowdLevel: "média",
            transfers: 1,
          },
          suggestions: ["Ver rota completa", "Verificar lotação", "Salvar rota"],
        };
      } else if (asksCrowd) {
        const routeHint = mergedContext.from && mergedContext.to
          ? `entre ${mergedContext.from} e ${mergedContext.to}`
          : "na sua rota";
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            `Boa pergunta. Pela previsão ${routeHint}, o pico costuma acontecer entre 17:30 e 19:00. Se puder, tente sair às 17:15 ou após 19:10 para ganhar conforto.`,
          suggestions: ["Ver previsão completa", "Alertar quando estiver vazio", "Quero uma rota menos lotada"],
        };
      } else if (asksBestTime) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Analisando os padrões de tráfego... Os melhores horários para sua viagem são: 9h30-11h (baixa lotação), 14h-16h (média lotação). Evite: 7h-8h30 e 17h30-19h (pico).",
          suggestions: ["Definir alerta", "Ver alternativas"],
        };
      } else if (mergedContext.from && mergedContext.to) {
        const travelTime = mergedContext.time ?? "agora";
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            `Perfeito. Montei uma sugestão para ir de ${mergedContext.from} para ${mergedContext.to} ${travelTime !== "agora" ? `às ${travelTime}` : "agora"}. Se quiser, comparo também uma rota mais rápida e outra mais confortável para você escolher com segurança.`,
          routeInfo: {
            from: mergedContext.from,
            to: mergedContext.to,
            duration: mergedContext.time && Number(mergedContext.time.slice(0, 2)) >= 17 ? "52 min" : "44 min",
            crowdLevel: mergedContext.time && Number(mergedContext.time.slice(0, 2)) >= 17 ? "média" : "baixa",
            transfers: 1,
          },
          suggestions: [
            "Comparar rota rápida e confortável",
            "Ver rota completa",
            "Como economizo mais tempo?",
          ],
        };
      } else if (mergedContext.from && !mergedContext.to) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: `Entendi que você sai de ${mergedContext.from}. Agora me diga seu destino para eu montar as melhores opções.`,
          suggestions: ["Meu destino é Taguatinga", "Meu destino é Plano Piloto", "Meu destino é Águas Claras"],
        };
      } else if (!mergedContext.from && mergedContext.to) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content: `Perfeito, você quer ir para ${mergedContext.to}. Me fala de onde você vai sair para eu fechar a melhor rota.`,
          suggestions: ["Saio de Ceilândia", "Saio de Samambaia", "Saio de Planaltina"],
        };
      } else if (userMessage.toLowerCase().includes("plano piloto") || userMessage.toLowerCase().includes("pp")) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Encontrei 4 linhas que vão ao Plano Piloto. A mais rápida sai em 8 minutos e leva 35 min. Lotação prevista: baixa 🟢",
          suggestions: ["Ver todas as opções", "Ativar notificação"],
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          content:
            "Perfeito, consigo te ajudar com isso. Me manda origem, destino e horário aproximado para eu comparar rotas e te explicar qual opção economiza mais tempo.",
          suggestions: [
            "Saio de Ceilândia para o Plano Piloto às 08h",
            "Quero rota mais segura",
            "Quero rota menos lotada",
          ],
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "Ver rota completa") {
      navigate("/rota");
    } else if (suggestion === "Verificar lotação" || suggestion === "Ver previsão completa") {
      navigate("/lotacao");
    } else {
      handleSend(suggestion);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Assistente IA de Mobilidade</h1>
          </div>
          <p className="text-lg text-slate-600">
            Converse naturalmente e receba as melhores rotas personalizadas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="flex flex-col h-[700px]">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message, idx) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>

                      {/* Route Info Card */}
                      {message.routeInfo && (
                        <Card className="mt-3 p-4 bg-white">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold">
                                {message.routeInfo.from} → {message.routeInfo.to}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span>{message.routeInfo.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-slate-500" />
                                <span>{message.routeInfo.crowdLevel}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Navigation className="w-3 h-3 text-slate-500" />
                                <span>{message.routeInfo.transfers} integração</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start text-xs bg-white hover:bg-slate-50"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua pergunta ou destino..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSend()} className="gap-2">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-600" />
                Perguntas Rápidas
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs h-auto py-3"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <h3 className="font-semibold mb-3">O que a IA pode fazer?</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Encontrar a melhor rota em tempo real</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Prever lotação e horários ideais</span>
                </div>
                <div className="flex items-start gap-2">
                  <Navigation className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Sugerir rotas alternativas</span>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Analisar padrões de tráfego</span>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Status do Sistema</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Precisão da IA</span>
                  <Badge className="bg-green-600">94%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Rotas analisadas hoje</span>
                  <span className="font-semibold">12,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Tempo médio de resposta</span>
                  <span className="font-semibold text-green-600">0.8s</span>
                </div>
              </div>
            </Card>

            {/* Tip */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Bus className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Dica</h4>
                  <p className="text-xs text-slate-700">
                    Seja específico! Informe origem, destino e horário para receber 
                    recomendações mais precisas.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
