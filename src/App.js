import { useState } from "react";

// 1. IMPORTANDO COMPONENTES BASE
import Login from "./pages/Login"; // Conforme seu print, o Login está em /pages
import Header from "./components/Header";

// 2. IMPORTANDO PÁGINAS DE GOVERNANÇA
import Dashboard from "./pages/Dashboard";
import EstoqueFabrica from "./pages/EstoqueFabrica";
import Funcionarios from "./pages/Funcionários";
import GestaoInsumos from "./pages/GestaoInsumos";
import AreaLoja from "./pages/AreaLoja";
import Financeiro from "./pages/Financeiro";

function App() {
  const [logado, setLogado] = useState(false);
  const [pagina, setPagina] = useState("Dashboard");

  // Se não estiver logado, exibe apenas o Login
  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  // Motor de Renderização baseado no Header
  function renderizarPagina() {
    switch (pagina) {
      case "Dashboard":
        return <Dashboard />;
      case "Estoque":
        return <EstoqueFabrica />;
      case "Suprimentos": // Novo nome reconhecido
        return <GestaoInsumos />;
      case "Entregas":
        return <AreaLoja />;
      case "Financeiro": // Novo nome reconhecido
        return <Financeiro />;
      case "Funcionários":
        return <Funcionarios />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col font-sans">
      {/* Header Executivo Analu */}
      <Header
        paginaAtual={pagina}
        setPagina={setPagina}
        onLogout={() => setLogado(false)}
      />

      {/* Conteúdo Principal de Alta Densidade */}
      <main className="flex-1 w-full max-w-full mx-auto p-4 md:p-8 animate-fade-in">
        {renderizarPagina()}
      </main>

      {/* Rodapé de Auditoria */}
      <footer className="p-4 text-center border-t border-slate-100 bg-white">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Analu Executive Suite © 2026 • Security Protocol Active
        </p>
      </footer>
    </div>
  );
}

export default App;