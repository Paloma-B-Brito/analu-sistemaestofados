/**
 * @file App.js
 * @description Core da Aplicação - Gestão de Rotas e Permissões
 * @author © 2026 — Rickman
 */

import { useState, useEffect } from "react";

// 1. IMPORTANDO COMPONENTES BASE
import Login from "./pages/Login"; 
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
  const [role, setRole] = useState(null); // Armazena ADMIN ou LOJA
  const [pagina, setPagina] = useState("Dashboard");

  // Recupera o acesso se o usuário atualizar a página (F5)
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setLogado(true);
      setRole(savedRole);
      // Direcionamento inicial baseado na Role
      if (savedRole === "LOJA") setPagina("Entregas"); 
    }
  }, []);

  const handleLoginSuccess = (userRole) => {
    setLogado(true);
    setRole(userRole);
    // Direcionamento automático baseado no cargo
    if (userRole === "LOJA") {
      setPagina("Entregas");
    } else {
      setPagina("Dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogado(false);
    setRole(null);
  };

  // Se não estiver logado, exibe apenas o Login
  if (!logado) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  // Motor de Renderização com bloqueio de segurança
  function renderizarPagina() {
    // Se for LOJA, ele só pode ver a tela de Entregas/Loja
    if (role === "LOJA") {
      return <AreaLoja />;
    }

    // Se for ADMIN, ele tem acesso ao menu completo
    switch (pagina) {
      case "Dashboard":
        return <Dashboard />;
      case "Estoque":
        return <EstoqueFabrica />;
      case "Suprimentos":
        return <GestaoInsumos />;
      case "Entregas":
        return <AreaLoja />;
      case "Financeiro":
        return <Financeiro />;
      case "Funcionários":
        return <Funcionarios />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col font-sans">
      {/* O Header só mostrará os botões que a ROLE permitir */}
      <Header
        paginaAtual={pagina}
        setPagina={setPagina}
        userRole={role} 
        onLogout={handleLogout}
      />

      <main className="flex-1 w-full max-w-full mx-auto p-4 md:p-8 animate-fade-in">
        {renderizarPagina()}
      </main>

      {/* RODAPÉ PADRONIZADO - LIMPO E PROFISSIONAL */}
      <footer className="p-4 text-center border-t border-slate-100 bg-white">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Analu Executive Suite • Acesso: <span className="text-slate-600">{role}</span> • © 2026 — Rickman
        </p>
      </footer>
    </div>
  );
}

export default App;