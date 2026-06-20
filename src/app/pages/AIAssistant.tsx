import { useState, useRef, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Send, Bot, User, Clock, Users, Route, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

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
        "Olá! Sou o assistente de mobilidade do Nexus AI. Como posso ajudá-lo a se locomover pelo DF hoje?",
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

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let response: Message;

      // Simple keyword matching for demo
      if (userMessage.toLowerCase().includes("planaltina") && userMessage.toLowerCase().includes("taguatinga")) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content:
            "Encontrei a melhor rota para você ir de Planaltina para Taguatinga às 18h! Aqui estão os detalhes:",
          timestamp: new Date(),
          routeData: {
            from: "Planaltina",
            to: "Taguatinga",
            duration: "55 min",
            crowdLevel: "medium",
            routes: ["0.401", "0.202"],
          },
        };
      } else if (userMessage.toLowerCase().includes("ceilândia") && userMessage.toLowerCase().includes("plano piloto")) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content:
            "Achei duas opções boas para você ir de Ceilândia para o Plano Piloto:",
          timestamp: new Date(),
          routeData: {
            from: "Ceilândia",
            to: "Plano Piloto",
            duration: "45 min",
            crowdLevel: "high",
            routes: ["0.300", "0.100"],
          },
        };
      } else if (userMessage.toLowerCase().includes("gama")) {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content: "Para ir ao Gama agora, recomendo:",
          timestamp: new Date(),
          routeData: {
            from: "Plano Piloto",
            to: "Gama",
            duration: "50 min",
            crowdLevel: "low",
            routes: ["0.600"],
          },
        };
      } else {
        response = {
          id: Date.now().toString(),
          type: "assistant",
          content:
            "Entendi! Deixe-me buscar as melhores rotas para você. Pode me dar mais detalhes sobre sua origem, destino e horário?",
          timestamp: new Date(),
          suggestions: [
            "Sair de Ceilândia",
            "Ir para Taguatinga",
            "Horário: manhã (6h-12h)",
            "Horário: tarde (12h-18h)",
          ],
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
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
    setInput(suggestion);
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Assistente IA de Mobilidade</h1>
            <p className="text-gray-600">
              Converse comigo e descubra a melhor forma de se locomover pelo DF
            </p>
          </div>

          <Card className="h-[calc(100vh-280px)] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                      <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="size-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] ${
                        message.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200"
                      } rounded-2xl p-4`}
                    >
                      <p className="text-sm">{message.content}</p>

                      {/* Route Data Card */}
                      {message.routeData && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
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
                            <div className="text-xs text-gray-500 mb-2">Linhas:</div>
                            <div className="flex gap-2">
                              {message.routeData.routes.map((route) => (
                                <Badge key={route} variant="outline">
                                  {route}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Link to="/route-result">
                            <Button size="sm" className="w-full mt-2 gap-2">
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
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.type === "user" && (
                      <div className="size-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <User className="size-5 text-white" />
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
                  <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Bot className="size-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="size-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <CardContent className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua pergunta sobre mobilidade..."
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                  <Send className="size-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
