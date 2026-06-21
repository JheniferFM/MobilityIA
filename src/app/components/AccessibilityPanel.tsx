import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Volume2, Hand, Settings } from "lucide-react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import { LibrasAvatar } from "./LibrasAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";

interface AccessibilityPanelProps {
  className?: string;
}

export function AccessibilityPanel({ className = "" }: AccessibilityPanelProps) {
  const { speak, isSpeaking, stop, setRate, rate, isSupported: ttsSupported } = useTextToSpeech();
  const [librasOpen, setLibrasOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  // Enable screen reader for page content
  const enablePageReader = useCallback(() => {
    const bodyText = document.body.innerText;
    if (bodyText && ttsSupported) {
      speak(bodyText);
      setCurrentText(bodyText);
      setLibrasOpen(true);
    }
  }, [speak, ttsSupported]);

  // Read focused element
  const enableFocusReader = useCallback(() => {
    const focused = document.activeElement as HTMLElement;
    if (focused && ttsSupported) {
      const text = focused.innerText || (focused as HTMLInputElement).value || focused.getAttribute("aria-label") || "Elemento sem conteúdo";
      speak(text);
      setCurrentText(text);
      setLibrasOpen(true);
    }
  }, [speak, ttsSupported]);

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    if (newState) {
      document.documentElement.style.filter = "contrast(1.5)";
    } else {
      document.documentElement.style.filter = "contrast(1)";
    }
  };

  // Toggle screen reader
  const toggleScreenReader = () => {
    setScreenReaderEnabled(!screenReaderEnabled);
  };

  return (
    <>
      <DropdownMenu>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full ${className}`}
          title="Abrir painel de acessibilidade"
        >
          <Settings className="w-4 h-4" />
        </Button>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Acessibilidade</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem
            checked={screenReaderEnabled}
            onCheckedChange={toggleScreenReader}
            disabled={!ttsSupported}
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Leitor de Tela
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem checked={highContrast} onCheckedChange={toggleHighContrast}>
            <span className="w-4 h-4 mr-2 rounded bg-black" />
            Alto Contraste
          </DropdownMenuCheckboxItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={enablePageReader} disabled={!ttsSupported}>
            <Volume2 className="w-4 h-4 mr-2" />
            Ler página inteira
          </DropdownMenuItem>

          <DropdownMenuItem onClick={enableFocusReader} disabled={!ttsSupported}>
            <Volume2 className="w-4 h-4 mr-2" />
            Ler elemento
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="text-xs">Velocidade de fala</DropdownMenuLabel>
          <div className="px-2 py-2">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full"
              title="Ajustar velocidade"
            />
            <p className="text-xs text-gray-600 mt-1">{rate.toFixed(1)}x</p>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setLibrasOpen(true)}>
            <Hand className="w-4 h-4 mr-2 text-purple-600" />
            Avatar LIBRAS
          </DropdownMenuItem>

          {isSpeaking && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={stop}>Parar leitura</DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <LibrasAvatar
        isOpen={librasOpen}
        onClose={() => setLibrasOpen(false)}
        text={currentText}
        onSpeak={ttsSupported ? ((text: string) => speak(text)) : undefined}
      />
    </>
  );
}
