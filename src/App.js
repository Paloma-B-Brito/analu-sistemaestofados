/**
 * @file App.js
 * @description Core da Aplicação - Estrutura Modular Organizada
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState, useEffect } from "react";

// --- 1. COMPONENTES ESTRUTURAIS ---
import Login from "./pages/Login"; 
import Header from "./components/Header";

// --- 2. PÁGINAS GERAIS (ADMIN) ---
import Dashboard from "./pages/Dashboard";
import KPIs from "./pages/KPIs";             
import Relatorios from './pages/Relatorios';
import Funcionarios from "./pages/Funcionários"; 

// --- 3. MÓDULO FÁBRICA ---
import DashboardFabrica from './pages/fabrica/DashboardFabrica';
import EstoqueFabrica from "./pages/fabrica/EstoqueFabrica";
import GestaoInsumos from "./pages/fabrica/GestaoInsumos";
import Qualidade from './pages/fabrica/Qualidade';   
import Manutencao from './pages/fabrica/Manutencao'; 

// --- 4. MÓDULO LOJA ---
import DashboardLoja from './pages/loja/DashboardLoja';
import AreaLoja from "./pages/loja/AreaLoja";     
import PDV from "./pages/loja/PDV";               
import Pedidos from './pages/loja/Pedidos';       
import Clientes from './pages/loja/Clientes';     

// --- 5. MÓDULO FINANCEIRO ---
import DashboardFinanceiro from './pages/financeiro/DashboardFinanceiro';
import Financeiro from "./pages/financeiro/Financeiro";
import FluxoCaixa from './pages/financeiro/FluxoCaixa'; 
import DRE from './pages/financeiro/DRE';              
import Contas from './pages/financeiro/Contas';         

function App() {
  const [logado, setLogado] = useState(false);
  const [role, setRole] = useState(null); 
  const [pagina, setPagina] = useState("Dashboard");

  // Recupera sessão ao dar F5
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) {
      setLogado(true);
      setRole(savedRole);
    }
  }, []);

  // Define a página inicial baseada no cargo
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
   * MOTOR DE RENDERIZAÇÃO (ROUTER)
   */
  function renderizarPagina() {
    
    // --- 1. VISÃO DO VENDEDOR (LOJA) ---
    if (role === "LOJA") {
      switch (pagina) {
        case "Loja": return <AreaLoja userRole={role} />; 
        case "PDV": return <PDV />;                       
        case "Pedidos": return <Pedidos />;               
        case "Clientes": return <Clientes />;             
        case "Entregas": return <AreaLoja userRole={role} />; 
        case "DashboardLoja": return <DashboardLoja />; 
        default: return <AreaLoja userRole={role} />;
      }
    }

    // --- 2. VISÃO DO OPERADOR (FÁBRICA) ---
    if (role === "FABRICA") {
      switch (pagina) {
        case "Estoque": return <EstoqueFabrica userRole={role} />;
        case "Suprimentos": return <GestaoInsumos />;
        case "Qualidade": return <Qualidade />;
        case "Manutencao": return <Manutencao />;
        case "DashboardFabrica": return <DashboardFabrica />; 
        default: return <EstoqueFabrica userRole={role} />;
      }
    }

    // --- 3. VISÃO DO CEO/ADMIN (ACESSO TOTAL) ---
    switch (pagina) {
      
      // === MÓDULO DASHBOARD GERAL ===
      case "Dashboard": return <Dashboard />;
      case "KPIs": return <KPIs />;
      case "Relatorios": return <Relatorios />;

      // === MÓDULO FÁBRICA ===
      case "DashboardFabrica": return <DashboardFabrica />;
      case "Estoque": return <EstoqueFabrica userRole={role} />;
      case "Suprimentos": return <GestaoInsumos />;
      case "Qualidade": return <Qualidade />;
      case "Manutencao": return <Manutencao />;

      // === MÓDULO LOJA ===
      case "DashboardLoja": return <DashboardLoja />;
      case "Loja": return <AreaLoja userRole={role} />;
      case "PDV": return <PDV />;
      case "Pedidos": return <Pedidos />;
      case "Clientes": return <Clientes />;
      case "Entregas": return <AreaLoja userRole={role} />;

      // === MÓDULO FINANCEIRO ===
      case "DashboardFinanceiro": return <DashboardFinanceiro />;
      case "Financeiro": return <Financeiro />; // Engenharia de Custos
      case "FluxoCaixa": return <FluxoCaixa />;
      case "DRE": return <DRE />;
      case "Contas": return <Contas />;

      // === MÓDULO RH ===
      case "Funcionários": return <Funcionarios />;

      default: return <Dashboard />;
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

      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-6 animate-fade-in relative">
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