/**
 * @file Dashboard.jsx
 * @description Core do Portal Executivo - Controle de Operações
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../App.css";
import ModalNovoEstofado from "../components/modals/ModalNovoEstofado"; 
import ModalEntradaMateriaPrima from "../components/modals/ModalEntradaMateriaPrima"; 
import ModalSaidaProdutoVenda from "../components/modals/ModalSaidaProdutoVenda"; 
import ModalSaidaProdutoEstofado from "../components/modals/ModalSaidaProdutoEstofado"; 
import ModalPerdaProducao from "../components/modals/ModalPerdaProducao"; 
import ModalConsultaGeral from "../components/modals/ModalConsultaGeral"; 

function Dashboard() {
  const [modalAberto, setModalAberto] = useState(null);
  const fecharModal = () => setModalAberto(null);

  const dataAtual = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="h-screen overflow-hidden flex flex-col p-4 md:p-8 animate-fade-in bg-[#fcfcf9]">
      
      {/* Header Fixo */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#064e3b] uppercase tracking-tighter">Analu - Executive Portal</h1>
          <div className="flex items-center gap-2">
            {/* Marca do Desenvolvedor no Header */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">© 2026 — RICKMAN</p>
            <span className="text-[10px] text-slate-300">|</span>
            <p className="text-[9px] font-medium text-slate-400 uppercase mt-1">{dataAtual}</p>
          </div>
        </div>
        
        <div className="w-full md:w-auto bg-white border border-slate-200 px-5 py-2.5 flex items-center justify-between md:justify-start gap-4 shadow-sm">
            <span className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest">System Stable</span>
            <span className="w-3 h-3 bg-[#10b981] animate-pulse"></span>
        </div>
      </header>

      {/* Área de Conteúdo */}
      <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Indicadores Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 border-l-4 border-[#064e3b] shadow-sm hover:shadow-md transition-shadow">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estoque Showroom</label>
            <p className="text-3xl font-black text-[#064e3b]">1.240</p>
            <p className="text-[9px] font-black text-[#10b981] mt-2">▲ 12% VALORIZADO</p>
          </div>

          <div className="bg-white p-6 border-l-4 border-slate-300 shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Fábrica / Ativa</label>
            <p className="text-3xl font-black text-slate-700">18</p>
            <p className="text-[9px] font-black text-slate-400 mt-2 italic uppercase">Unidades em Linha</p>
          </div>

          <div className="bg-white p-6 border-l-4 border-rose-600 shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Alertas Insumos</label>
            <p className="text-3xl font-black text-rose-800">05</p>
            <p className="text-[9px] font-black text-rose-600 mt-2 animate-pulse uppercase">Ação Crítica</p>
          </div>

          <div className="bg-white p-6 border-l-4 border-[#b49157] shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Liquidez Mensal</label>
            <p className="text-3xl font-black text-slate-700">45.2k</p>
            <p className="text-[9px] font-black text-[#10b981] mt-2 uppercase">Consolidado BRL</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 whitespace-nowrap">Operations Control</span>
          <div className="h-[1px] flex-1 bg-slate-200 opacity-50"></div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
          <button onClick={() => setModalAberto("novo-estofado")} className="flex flex-col items-start p-6 bg-[#064e3b] text-white transition-all active:scale-[0.98] hover:brightness-110 shadow-lg shadow-emerald-900/10">
            <span className="text-xs font-black uppercase tracking-widest mb-1">Novo Modelo</span>
            <span className="text-[9px] opacity-50 uppercase tracking-[0.2em]">Engineering</span>
          </button>

          <button onClick={() => setModalAberto("entrada-materia")} className="flex flex-col items-start p-6 bg-slate-700 text-white transition-all active:scale-[0.98] hover:bg-slate-800">
            <span className="text-xs font-black uppercase tracking-widest mb-1">Entrada Insumos</span>
            <span className="text-[9px] opacity-50 uppercase tracking-[0.2em]">Supply Chain</span>
          </button>

          <button onClick={() => setModalAberto("saida-fabrica-loja")} className="flex flex-col items-start p-6 bg-[#b49157] text-white transition-all active:scale-[0.98] hover:bg-[#a3834e]">
            <span className="text-xs font-black uppercase tracking-widest mb-1">Fábrica p/ Loja</span>
            <span className="text-[9px] opacity-50 uppercase tracking-[0.2em]">Logistics</span>
          </button>

          <button onClick={() => setModalAberto("saida-venda")} className="flex flex-col items-start p-6 border-2 border-[#064e3b] bg-white text-[#064e3b] transition-all active:scale-[0.98] hover:bg-emerald-50">
            <span className="text-xs font-black uppercase tracking-widest mb-1">Registrar Venda</span>
            <span className="text-[9px] opacity-70 uppercase tracking-[0.2em]">Revenue</span>
          </button>

          <button onClick={() => setModalAberto("perda-producao")} className="flex flex-col items-start p-6 bg-rose-700 text-white transition-all active:scale-[0.98] hover:bg-rose-800">
            <span className="text-xs font-black uppercase tracking-widest mb-1">Relatar Avaria</span>
            <span className="text-[9px] opacity-50 uppercase tracking-[0.2em]">Loss Control</span>
          </button>

          <button onClick={() => setModalAberto("consulta-geral")} className="flex flex-col items-start p-6 bg-white border border-slate-200 text-[#064e3b] transition-all active:scale-[0.98] hover:bg-slate-50">
            <span className="text-xs font-black uppercase tracking-widest mb-1">🔍 Consultar</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em]">Search Engine</span>
          </button>
        </div>
      </main>

      {/* Footer com Assinatura Rickman */}
      <footer className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center shrink-0">
        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">© 2026 — RICKMAN DESIGN & ENGINEERING</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[8px] font-bold text-slate-500 uppercase">System Active</span>
          </div>
        </div>
      </footer>

      {/* Modais */}
      {modalAberto === "novo-estofado" && <ModalNovoEstofado onClose={fecharModal} />}
      {modalAberto === "entrada-materia" && <ModalEntradaMateriaPrima onClose={fecharModal} />}
      {modalAberto === "saida-fabrica-loja" && <ModalSaidaProdutoEstofado onClose={fecharModal} />}
      {modalAberto === "saida-venda" && <ModalSaidaProdutoVenda onClose={fecharModal} />}
      {modalAberto === "perda-producao" && <ModalPerdaProducao onClose={fecharModal} />}
      {modalAberto === "consulta-geral" && <ModalConsultaGeral onClose={fecharModal} />}
    </div>
  );
}

export default Dashboard;