/**
 * @file App.js
 * @description Core da Aplicação - Gestão de Rotas e Múltiplas Visões 
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState, useEffect } from "react";

// 1. IMPORTANDO COMPONENTES BASE
import Login from "./pages/Login"; 
import Header from "./components/Header";

// 2. IMPORTANDO PÁGINAS DE GOVERNANÇA
import Dashboard from "./pages/Dashboard";
import EstoqueFabrica from "./pages/EstoqueFabrica";
import Funcionarios from "./pages/Funcionários"; // Ajustado para evitar erro de caractere especial no import
import GestaoInsumos from "./pages/GestaoInsumos";
import AreaLoja from "./pages/AreaLoja";
import Financeiro from "./pages/Financeiro";

function App() {
  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState(null); 
  const [pagina, setPagina] = useState("Dashboard");

  // Hook para persistência de sessão ao recarregar a página
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setLogado(true);
      setRole(savedRole);
      direcionarUsuario(savedRole);
    }
  }, []);

  /**
   * Lógica de Direcionamento Inicial baseada no Perfil
   */
  const direcionarUsuario = (userRole) => {
    if (userRole === "LOJA") setPagina("Entregas");
    else if (userRole === "FABRICA") setPagina("Estoque");
    else setPagina("Dashboard");
  };

  /**
   * Handler de Sucesso do Login (Vindo do componente Login.jsx)
   */
  const handleLoginSuccess = (userRole) => {
    setLogado(true);
    setRole(userRole);
    // Nota: O localStorage já é setado no Login.jsx, 
    localStorage.setItem("userRole", userRole);
    direcionarUsuario(userRole);
  };

  /**
   * Encerramento de Sessão e Limpeza de Cache
   */
  const handleLogout = () => {
    localStorage.clear();
    setLogado(false);
    setRole(null);
    setPagina("Dashboard"); // Reset para o estado inicial
  };

  // Se não estiver logado, o Core renderiza apenas o Portal de Autenticação
  if (!logado) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  /**
   * Motor de Renderização Condicional (Regras de Negócio por Perfil)
   */
  function renderizarPagina() {
    // 1. Bloqueio de Visão para Perfis Operacionais (Single Page View)
    if (role === "LOJA") return <AreaLoja userRole={role} />;
    if (role === "FABRICA") return <EstoqueFabrica userRole={role} />;

    // 2. Governança Dinâmica para Perfil ADMIN
    switch (pagina) {
      case "Dashboard":
        return <Dashboard />;
      case "Estoque":
        return <EstoqueFabrica userRole={role} />;
      case "Suprimentos":
        return <GestaoInsumos />;
      case "Entregas":
        return <AreaLoja userRole={role} />;
      case "Financeiro":
        return <Financeiro />;
      case "Funcionários":
        return <Funcionarios />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col font-sans selection:bg-[#b49157]/20">
      {/* O Header recebe as props para controlar a navegação do ADMIN */}
      <Header
        paginaAtual={pagina}
        setPagina={setPagina}
        userRole={role} 
        onLogout={handleLogout}
      />

      <main className="flex-1 w-full max-w-full mx-auto p-4 md:p-8 animate-fade-in">
        {/* Renderização da Visão Autorizada */}
        {renderizarPagina()}
      </main>

      <footer className="p-4 text-center border-t border-slate-100 bg-white">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Analu Executive Suite • Nível de Acesso: <span className="text-[#b49157] font-bold">{role}</span> • © 2026 Rickman Brown
        </p>
      </footer>
    </div>
  );
}

export default App;