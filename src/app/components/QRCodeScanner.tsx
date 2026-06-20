import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Camera, QrCode, ScanLine, ShieldAlert } from "lucide-react";

type ScannerState = "idle" | "starting" | "active" | "unsupported" | "error";

const DEMO_STOPS = [
  { slug: "rodoviaria-plano-piloto", label: "Rodoviária do Plano Piloto" },
  { slug: "taguatinga-centro", label: "Taguatinga Centro" },
];

function parseStopSlug(rawValue: string): string | null {
  const value = rawValue.trim();

  const paradaMatch = value.match(/\/parada\/([a-z0-9-]+)/i);
  if (paradaMatch?.[1]) {
    return paradaMatch[1].toLowerCase();
  }

  if (/^[a-z0-9-]+$/i.test(value)) {
    return value.toLowerCase();
  }

  return null;
}

export function QRCodeScanner() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<number | null>(null);

  const [state, setState] = useState<ScannerState>("idle");
  const [message, setMessage] = useState("Aponte a câmera para o QR Code da parada.");
  const [lastRead, setLastRead] = useState<string>("");

  const stopCamera = () => {
    if (scanTimerRef.current) {
      window.clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const navigateFromRead = (rawValue: string) => {
    const slug = parseStopSlug(rawValue);
    setLastRead(rawValue);

    if (!slug) {
      setMessage("QR Code lido, mas não reconhecido como parada do Nexus Mobility AI.");
      return;
    }

    setMessage(`QR detectado: abrindo parada ${slug}...`);
    stopCamera();
    navigate(`/parada/${slug}`);
  };

  const startCamera = async () => {
    setState("starting");
    setMessage("Solicitando acesso à câmera...");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState("unsupported");
        setMessage("Seu navegador não suporta acesso à câmera.");
        return;
      }

      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const hasBarcodeDetector = "BarcodeDetector" in window;
      if (!hasBarcodeDetector) {
        setState("active");
        setMessage(
          "Câmera aberta. Seu navegador não possui leitura automática de QR aqui, mas você pode usar os atalhos abaixo."
        );
        return;
      }

      const detector = new (window as any).BarcodeDetector({ formats: ["qr_code"] });

      scanTimerRef.current = window.setInterval(async () => {
        if (!videoRef.current || state === "error") {
          return;
        }

        try {
          const barcodes = await detector.detect(videoRef.current);
          if (barcodes?.length && barcodes[0]?.rawValue) {
            navigateFromRead(barcodes[0].rawValue);
          }
        } catch {
          setState("error");
          setMessage("Não foi possível ler o QR Code automaticamente nesta sessão.");
        }
      }, 900);

      setState("active");
      setMessage("Câmera ativa. Aponte para o QR Code da parada para abrir automaticamente.");
    } catch {
      setState("error");
      setMessage("Permissão de câmera negada ou indisponível. Verifique as permissões do navegador.");
      stopCamera();
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-blue-700">
            <QrCode className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">QR Code Inteligente</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Leitor de QR Code de Paradas</h1>
          <p className="mt-2 text-slate-600">
            Escaneie o QR Code da parada para abrir instantaneamente as informações inteligentes de mobilidade.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="relative aspect-[4/3] w-full bg-slate-950">
              <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-56 w-56 rounded-2xl border-2 border-cyan-300/80 shadow-[0_0_0_9999px_rgba(2,6,23,0.45)]" />
              </div>
              <div className="absolute left-4 top-4">
                <Badge className="bg-black/70 text-white border-slate-700">
                  <ScanLine className="mr-1 h-3.5 w-3.5" />
                  {state === "active" ? "Escaneando" : state === "starting" ? "Iniciando" : "Aguardando"}
                </Badge>
              </div>
            </div>
            <div className="space-y-3 p-4">
              <p className="text-sm text-slate-700">{message}</p>
              {lastRead && (
                <p className="text-xs text-slate-500 break-all">Último QR lido: {lastRead}</p>
              )}
              <div className="flex flex-wrap gap-2">
                <Button onClick={startCamera} className="gap-2 bg-blue-600 text-white hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                  Abrir câmera
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    stopCamera();
                    setState("idle");
                    setMessage("Câmera pausada. Toque em abrir câmera para continuar.");
                  }}
                >
                  Pausar câmera
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-4">
              <h2 className="mb-2 font-semibold text-slate-900">Acesso rápido (demo)</h2>
              <p className="mb-3 text-xs text-slate-600">
                Use estes atalhos para testar quando o dispositivo não permitir leitura automática.
              </p>
              <div className="space-y-2">
                {DEMO_STOPS.map((stop) => (
                  <Button
                    key={stop.slug}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate(`/parada/${stop.slug}`)}
                  >
                    {stop.label}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 text-amber-700 mt-0.5" />
                <p className="text-xs text-amber-800">
                  Para abrir câmera no celular, permita acesso quando o navegador solicitar. Se negar, use
                  "Abrir câmera" novamente após liberar nas configurações do site.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
