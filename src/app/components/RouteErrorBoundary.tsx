import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

export function RouteErrorBoundary() {
  const error = useRouteError();

  let title = "Ocorreu um erro inesperado";
  let message = "Algo deu errado ao carregar esta pagina.";
  let code = "Erro";

  if (isRouteErrorResponse(error)) {
    code = String(error.status);

    if (error.status === 404) {
      title = "Pagina nao encontrada";
      message = "A rota que voce tentou acessar nao existe ou foi movida.";
    } else {
      title = error.statusText || title;
      message = typeof error.data === "string" ? error.data : message;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <p className="text-sm font-medium text-slate-500 mb-2">{code}</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{title}</h1>
          <p className="text-slate-600 mb-6">{message}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Ir para inicio
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}