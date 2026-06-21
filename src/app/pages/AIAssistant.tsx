import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Send, Bot, User, Clock, Users, Route, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { AccessibilityInput } from "../components/AccessibilityInput";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  routeData?: {
    from: string;
    to: string;
    duration: string;
    crowdLevel: "low" | "medium" | "high";
    routes: string[];
  };
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Olá! Sou o assistente de mobilidade do Mobility IA. Como posso ajudá-lo a se locomover pelo DF hoje?",
      timestamp: new Date(),
      suggestions: [
        "Preciso ir de Planaltina para Taguatinga às 18h",
        "Qual a melhor rota de Ceilândia para o Plano Piloto?",
        "Ônibus para o Gama agora",
        "Rotas menos lotadas",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const pickOne = <T,>(items: T[], seed: number): T => {
    return items[Math.abs(seed) % items.length];
  };

  const hash = (text: string) => {
    let value = 0;
    for (let i = 0; i < text.length; i += 1) {
      value = (value * 31 + text.charCodeAt(i)) >>> 0;
    }
    return value;
  };

  const extractTrip = (text: string) => {
    const normalized = normalize(text);
    const routeMatch = normalized.match(/de\s+(.+?)\s+para\s+(.+?)(?:\s+as\s+\d{1,2}h?\d{0,2})?$/);
    const timeMatch = normalized.match(/(?:as|a)\s*(\d{1,2})(?:[:h](\d{2}))?/);

    if (!routeMatch) {
      return null;
    }

    const from = routeMatch[1].trim();
    const to = routeMatch[2].trim();
    const hour = timeMatch ? Number(timeMatch[1]) : null;

    return {
      from: from.charAt(0).toUpperCase() + from.slice(1),
      to: to.charAt(0).toUpperCase() + to.slice(1),
      hour,
    };
  };

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let response: Message;

      const normalized = normalize(userMessage);
      const userHash = hash(normalized);
      const parsedTrip = extractTrip(userMessage);
      const greetingWords = ["oi", "ola", "eai", "opa", "bom dia", "boa tarde", "boa noite"];
      const isGreeting = greetingWords.some((word) => normalized.includes(word)) && normalized.length <= 20;
      const isThanks = ["obrigado", "obrigada", "valeu", "vlw"].some((word) => normalized.includes(word));
      const mentionsRouteIntent = ["rota", "onibus", "trajeto", "ir", "chegar", "mobilidade"].some((word) =>
        normalized.includes(word),
      );

      if (isGreeting && !mentionsRouteIntent) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content:
            "Oi! Bora achar sua melhor rota. Me fala de onde voce sai, para onde vai e o horario aproximado.",
          timestamp: new Date(),
          suggestions: [
            "Saio de Ceilandia para Taguatinga as 18h",
            "Quero ir de Sobradinho para UnB as 07h20",
            "De Samambaia para Asa Sul agora",
          ],
        };
      } else if (isThanks) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content: "Tamo junto. Se quiser, ja te passo uma alternativa mais rapida ou com menos lotacao.",
          timestamp: new Date(),
          suggestions: [
            "Quero a rota mais rapida",
            "Quero a rota com menos lotacao",
            "Mostre outra alternativa",
          ],
        };
      } else if (parsedTrip && parsedTrip.hour === null) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content: `Entendi o trecho de ${parsedTrip.from} para ${parsedTrip.to}. Qual horario voce pretende sair?`,
          timestamp: new Date(),
          suggestions: ["As 07h30", "As 12h", "As 18h"],
        };
      } else if (parsedTrip) {
        const peakHour = parsedTrip.hour !== null && ((parsedTrip.hour >= 7 && parsedTrip.hour <= 9) || (parsedTrip.hour >= 17 && parsedTrip.hour <= 19));
        const crowdLevel: "low" | "medium" | "high" = peakHour
          ? "high"
          : parsedTrip.hour !== null && parsedTrip.hour >= 10 && parsedTrip.hour <= 16
          ? "medium"
          : "low";
        const durationBase = 38 + (userHash % 33);
        const routePool = ["0.102", "0.202", "0.300", "0.401", "0.502", "0.600", "0.711"];
        const routeA = pickOne(routePool, userHash);
        const routeB = pickOne(routePool.filter((r) => r !== routeA), userHash + 7);
        const opening = pickOne(
          [
            `Boa, montei uma rota de ${parsedTrip.from} para ${parsedTrip.to}.`,
            `Perfeito, ja organizei uma opcao para ir de ${parsedTrip.from} ate ${parsedTrip.to}.`,
            `Encontrei um trajeto eficiente de ${parsedTrip.from} para ${parsedTrip.to}.`,
          ],
          userHash,
        );
        const rationale =
          crowdLevel === "high"
            ? "Como e horario de pico, priorizei previsibilidade e menos risco de atraso."
            : crowdLevel === "medium"
            ? "Esse horario costuma ter fluxo moderado, entao equilibrei tempo e conforto."
            : "Nesse horario o fluxo tende a ser mais leve, entao foquei em conforto e regularidade.";

        response = {
          id: Date.now().toString(),
          type: "assistant",
          content: `${opening} ${rationale}`,
          timestamp: new Date(),
          routeData: {
            from: parsedTrip.from,
            to: parsedTrip.to,
            duration: `${durationBase} min`,
            crowdLevel,
            routes: [routeA, routeB],
          },
          suggestions: [
            "Quero a opcao com menos baldeacao",
            "Prefiro pagar menos, mesmo que demore um pouco",
            "Tem alternativa com menos lotacao?",
          ],
        };
      } else if (normalized.includes("ceilandia") && normalized.includes("plano piloto")) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content:
            "Separei duas alternativas de Ceilandia para o Plano Piloto, priorizando previsibilidade de chegada.",
          timestamp: new Date(),
          routeData: {
            from: "Ceilândia",
            to: "Plano Piloto",
            duration: "45 min",
            crowdLevel: "high",
            routes: ["0.300", "0.100"],
          },
          suggestions: [
            "Mostre a opcao mais rapida",
            "Quero evitar horarios de pico",
            "Tem rota com menos caminhada?",
          ],
        };
      } else if (normalized.includes("gama")) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content: "Para ir ao Gama agora, recomendo uma rota com fluxo mais tranquilo neste momento.",
          timestamp: new Date(),
          routeData: {
            from: "Plano Piloto",
            to: "Gama",
            duration: "50 min",
            crowdLevel: "low",
            routes: ["0.600"],
          },
          suggestions: [
            "Quero sair em 30 minutos",
            "Tem opcao sem integracao?",
            "Qual ponto de embarque mais proximo?",
          ],
        };
      } else {
        const fallbackReply = pickOne(
          [
            "Pra eu te responder com sentido, me diz origem, destino e horario. Exemplo: de Samambaia para Asa Sul as 18h.",
            "Me fala de onde voce sai, pra onde vai e o horario aproximado. A partir disso eu monto uma recomendacao melhor.",
            "Com origem + destino + horario eu consigo te dar uma resposta mais certeira e menos generica.",
          ],
          userHash,
        );

        response = {
          id: Date.now().toString(),
          type: "assistant",
          content: fallbackReply,
          timestamp: new Date(),
          suggestions: [
            "De Ceilandia para Taguatinga as 18h",
            "De Sobradinho para UnB as 07h20",
            "De Samambaia para Asa Sul as 19h",
            "Do Gama para Rodoviaria as 08h",
          ],
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 900);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    simulateAIResponse(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: suggestion,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    simulateAIResponse(suggestion);
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="pt-20 pb-10 px-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Assistente IA de Mobilidade</h1>
            <p className="mt-1 text-sm text-slate-600">Converse para receber recomendacoes de rota no DF.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr]">
            <Card className="flex h-[600px] flex-col border-slate-200 shadow-sm overflow-hidden">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/50">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${
                        message.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.type === "assistant" && (
                        <div className="size-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                          <Bot className="size-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`w-full max-w-[92%] sm:max-w-[75%] ${
                          message.type === "user"
                            ? "bg-blue-600 text-white rounded-2xl rounded-br-md"
                            : "bg-white border border-gray-100 rounded-2xl rounded-bl-md shadow-sm"
                        } px-4 py-3`}
                      >
                        <p className="break-words text-sm leading-relaxed">{message.content}</p>

                        {/* Route Data Card */}
                        {message.routeData && (
                          <div className="mt-4 space-y-3 rounded-xl bg-gray-50 p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Route className="size-4 text-blue-600" />
                                <span className="font-semibold">
                                  {message.routeData.from} → {message.routeData.to}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="size-4 text-gray-500" />
                                <span>{message.routeData.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="size-4 text-gray-500" />
                                <Badge
                                  className={`text-xs ${getCrowdColor(
                                    message.routeData.crowdLevel
                                  )}`}
                                >
                                  {message.routeData.crowdLevel === "low"
                                    ? "Baixa"
                                    : message.routeData.crowdLevel === "medium"
                                    ? "Média"
                                    : "Alta"}
                                </Badge>
                              </div>
                            </div>

                            <div>
                              <div className="mb-2 text-xs text-gray-500">Linhas:</div>
                              <div className="flex flex-wrap gap-2">
                                {message.routeData.routes.map((route) => (
                                  <Badge key={route} variant="outline">
                                    {route}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Link to="/rota">
                              <Button size="sm" className="mt-2 w-full gap-2">
                                Ver Detalhes da Rota
                                <ArrowRight className="size-4" />
                              </Button>
                            </Link>
                          </div>
                        )}

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="mt-4 space-y-2">
                            <p className="text-xs text-gray-500">Sugestões:</p>
                            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                              {message.suggestions.map((suggestion, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant="outline"
                                  className="h-auto min-h-8 w-full sm:w-auto max-w-full whitespace-normal break-words text-left text-xs leading-5 line-clamp-2"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="mt-2 text-xs opacity-60">
                          {message.timestamp.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.type === "user" && (
                        <div className="size-8 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                          <User className="size-4 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="size-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <Bot className="size-5 text-white" />
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex gap-1">
                        <div className="size-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="size-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <CardContent className="border-t border-gray-100 bg-white p-4">
                <div className="flex gap-2 items-end sm:items-center">
                  <AccessibilityInput
                    value={input}
                    onChange={setInput}
                    placeholder="Digite sua pergunta sobre rotas e transporte..."
                    onEnter={handleSend}
                    className="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 w-10 p-0"
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </div>
  );
}
