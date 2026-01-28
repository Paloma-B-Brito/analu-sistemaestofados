import { useState } from "react";
import "../App.css";

// Imports baseados na sua estrutura de arquivos
import ModalNovoEstofado from "../components/modals/ModalNovoEstofado"; 
import ModalEntradaMateriaPrima from "../components/modals/ModalEntradaMateriaPrima"; 
import ModalSaidaProdutoVenda from "../components/modals/ModalSaidaProdutoVenda"; 
import ModalSaidaProdutoEstofado from "../components/modals/ModalSaidaProdutoEstofado"; 
import ModalPerdaProducao from "../components/modals/ModalPerdaProducao"; 
import ModalConsultaGeral from "../components/modals/ModalConsultaGeral"; 

function Dashboard() {
  const [modalAberto, setModalAberto] = useState(null);
  const fecharModal = () => setModalAberto(null);

  return (
    <div className="dashboard-container animate-fade-in">
      
      {/* HEADER EXECUTIVO */}
      <header className="executive-header">
        <div>
          <h1 className="main-title">Executive Portal</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Analu Estofados</p>
        </div>
        
        <div className="bg-white border border-slate-200 px-5 py-2.5 flex items-center gap-4 shadow-sm">
            <span className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest">System Stable</span>
            <span className="w-3 h-3 bg-[#10b981] animate-pulse"></span>
        </div>
      </header>

      {/* KPI GRID - INDICADORES COM VIDA */}
      <div className="kpi-grid">
        <div className="kpi-card loja">
          <label>Ativos / Loja</label>
          <p className="value">1.240</p>
          <p className="text-[9px] font-black text-[#10b981] mt-2">▲ 12% VALORIZADO</p>
        </div>

        <div className="kpi-card fabrica">
          <label>Fábrica / Ativa</label>
          <p className="value">18</p>
          <p className="text-[9px] font-black text-slate-300 mt-2 italic uppercase">Unidades em Linha</p>
        </div>

        <div className="kpi-card alerta">
          <label>Alertas Insumos</label>
          <p className="value" style={{ color: '#8b0000' }}>05</p>
          <p className="text-[9px] font-black text-rose-600 mt-2 animate-pulse uppercase">Ação Crítica</p>
        </div>

        <div className="kpi-card liquidez">
          <label>Liquidez BRL</label>
          <p className="value">45.2k</p>
          <p className="text-[9px] font-black text-[#10b981] mt-2 uppercase">Consolidado Mensal</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Operations Control</span>
        <div className="h-[1px] flex-1 bg-slate-200 opacity-50"></div>
      </div>

      {/* PAINEL DE COMANDOS COMPACTO */}
      <div className="action-grid">
        <button onClick={() => setModalAberto("novo-estofado")} className="action-btn bg-executive">
          <span className="btn-title">Novo Modelo</span>
          <span className="btn-desc">Engineering</span>
        </button>

        <button onClick={() => setModalAberto("entrada-materia")} className="action-btn bg-stone">
          <span className="btn-title">Entrada Insumos</span>
          <span className="btn-desc">Supply Chain</span>
        </button>

        <button onClick={() => setModalAberto("saida-fabrica-loja")} className="action-btn bg-gold">
          <span className="btn-title">Fábrica p/ Loja</span>
          <span className="btn-desc">Logistics</span>
        </button>

        <button onClick={() => setModalAberto("saida-venda")} className="action-btn border-2 border-[#064e3b] bg-white">
          <span className="btn-title" style={{color: '#064e3b'}}>Registrar Venda</span>
          <span className="btn-desc" style={{color: '#064e3b'}}>Revenue</span>
        </button>

        <button onClick={() => setModalAberto("perda-producao")} className="action-btn bg-red">
          <span className="btn-title">Relatar Avaria</span>
          <span className="btn-desc">Loss Control</span>
        </button>

        <button onClick={() => setModalAberto("consulta-geral")} className="action-btn bg-white border border-slate-200">
          <span className="btn-title" style={{color: '#064e3b'}}>🔍 Consultar</span>
          <span className="btn-desc" style={{color: '#94a3b8'}}>Search</span>
        </button>
      </div>

      {/* RENDERIZAÇÃO DOS MODAIS */}
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