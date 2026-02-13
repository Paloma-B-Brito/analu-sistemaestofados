/**
 * @file App.js
 * @description Core da Aplicação - Gestão de Rotas e Múltiplas Visões 
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState, useEffect } from "react";
import Login from "./pages/Login"; 
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import EstoqueFabrica from "./pages/EstoqueFabrica";
import Funcionarios from "./pages/Funcionários"; 
import GestaoInsumos from "./pages/GestaoInsumos";
import AreaLoja from "./pages/AreaLoja";
import Financeiro from "./pages/Financeiro";
import Clientes from './pages/Clientes';
import Relatorios from './pages/Relatorios';
import Qualidade from './pages/Qualidade';
import Manutencao from './pages/Manutencao';
import Pedidos from './pages/Pedidos';
import FluxoCaixa from './pages/FluxoCaixa';
import DRE from './pages/DRE';
import Contas from './pages/Contas';


function App() {
  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState(null); 
  const [pagina, setPagina] = useState("Dashboard");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setLogado(true);
      setRole(savedRole);
    }
  }, []);

  const direcionarUsuario = (userRole) => {
    if (userRole === "LOJA") setPagina("Loja");
    else if (userRole === "FABRICA") setPagina("Estoque");
    else setPagina("Dashboard");
  };

  const handleLoginSuccess = (userRole) => {
    setLogado(true);
    setRole(userRole);
    localStorage.setItem("userRole", userRole);
    direcionarUsuario(userRole);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLogado(false);
    setRole(null);
    setPagina("Dashboard");
  };

  if (!logado) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  /**
   * MOTOR DE RENDERIZAÇÃO (ROTEAMENTO)
   */
  function renderizarPagina() {
    
    // --- PERFIL LOJA (Vendedores) ---
    if (role === "LOJA") {
      switch (pagina) {
        case "Clientes":
        case "CRM":
          return <Clientes />;
        case "Entregas": 
        case "Pedidos":
          return <AreaLoja />; 
        default:
          return <AreaLoja userRole={role} />;
      }
    }

    // --- PERFIL FÁBRICA (Operacional) ---
    if (role === "FABRICA") {
        if (pagina === "Suprimentos") return <GestaoInsumos />;
        return <EstoqueFabrica userRole={role} />;
    }

    // --- PERFIL ADMIN (Acesso Total) ---
    switch (pagina) {
      // Dashboard
      case "Dashboard":
      case "Relatorios":
        return <Dashboard />;

      // Fábrica & Estoque
      case "Estoque":
      case "Qualidade": 
      case "Manutencao":
        return <EstoqueFabrica userRole={role} />;

      case "Suprimentos":
        return <GestaoInsumos />;

      // Loja & Vendas
      case "Loja":
      case "Entregas":
      case "PDV":
        return <AreaLoja userRole={role} />;

      // CRM 
      case "Clientes":
        return <Clientes />;

      // Financeiro
      case "Financeiro":
      case "FluxoCaixa":
      case "DRE":
      case "Contas":
        return <Financeiro />;

      // RH
      case "Funcionários":
        return <Funcionarios />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex flex-col font-sans selection:bg-[#b49157]/20">
      <Header
        paginaAtual={pagina}
        setPagina={setPagina}
        userRole={role} 
        onLogout={handleLogout}
      />

      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-6 animate-fade-in">
        {renderizarPagina()}
      </main>

      <footer className="p-4 text-center border-t border-slate-100 bg-white mt-auto">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Analu Executive Suite • Nível de Acesso: <span className="text-[#b49157] font-bold">{role}</span> • © 2026 Rickman Brown
        </p>
      </footer>
    </div>
  );
}

export default App;