/**
 * @file ModalPerdaProducao.jsx
 * @description Gestão de Avarias, Perdas e Controle de Qualidade
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalPerdaProducao({ onClose }) {
  const [avaria, setAvaria] = useState({
    item: "",
    origem: "Loja / Showroom",
    severidade: "Média",
    causa: "Transporte",
    descricao: "",
    acao: "Manutenção"
  });

  const handleSalvar = (e) => {
    e.preventDefault();
    alert(`Protocolo de Perda gerado. O item ${avaria.item} foi encaminhado para: ${avaria.acao.toUpperCase()}.`);
    onClose();
  };

  // Cores dinâmicas baseadas na severidade
  const getSeverityStyle = () => {
    if (avaria.severidade === "Alta") return "bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-900/20";
    if (avaria.severidade === "Média") return "bg-amber-500 text-white border-amber-500";
    return "bg-emerald-500 text-white border-emerald-500";
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans">
      {/* OVERLAY DE ALERTA COM BLUR PROFUNDO */}
      <div 
        className="absolute inset-0 bg-[#450a0a]/70 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden animate-slide-up border border-rose-100 flex flex-col max-h-[95vh]">
        
        {/* HEADER DE INCIDENTE */}
        <div className="bg-[#8b0000] p-8 md:p-10 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-rose-600/20 rounded-[1.5rem] flex items-center justify-center text-2xl border border-rose-400/30">
              ⚠️
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-300 mb-1">Loss & Quality Control</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Relatar Avaria</h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/20 hover:bg-rose-500 transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSalvar} className="p-8 md:p-10 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* IDENTIFICAÇÃO DO ATIVO */}
          <div className="space-y-3 text-left">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Ativo em Conformidade?</label>
            <input 
              required
              type="text" 
              placeholder="Digite o SKU ou Nome do Produto..."
              className="w-full p-5 bg-rose-50/20 border-2 border-rose-100/30 rounded-2xl font-bold text-rose-950 outline-none focus:border-rose-600 focus:bg-white transition-all placeholder:text-rose-200"
              onChange={(e) => setAvaria({...avaria, item: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-left">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Ponto Crítico</label>
              <select 
                className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-slate-700 outline-none focus:border-rose-600 focus:bg-white appearance-none transition-all"
                onChange={(e) => setAvaria({...avaria, origem: e.target.value})}
              >
                <option>Loja / Showroom</option>
                <option>Fábrica / Produção</option>
                <option>Logística de Entrega</option>
                <option>Retorno de Cliente</option>
              </select>
            </div>

            <div className="space-y-3 text-left">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Impacto Financeiro</label>
              <select 
                className={`w-full p-5 border-2 rounded-2xl font-black outline-none transition-all duration-500 appearance-none text-center ${getSeverityStyle()}`}
                onChange={(e) => setAvaria({...avaria, severidade: e.target.value})}
                value={avaria.severidade}
              >
                <option value="Baixa">Baixa (Retoque)</option>
                <option value="Média">Média (Reparo)</option>
                <option value="Alta">Alta (Perda Total)</option>
              </select>
            </div>
          </div>

          {/* DESCRIÇÃO TÉCNICA */}
          <div className="space-y-3 text-left">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Laudo Descritivo</label>
            <textarea 
              rows="3"
              required
              className="w-full p-5 bg-slate-50 border-2 border-slate-50 focus:border-rose-300 focus:bg-white rounded-3xl font-medium text-slate-700 outline-none transition-all text-sm resize-none"
              placeholder="Descreva detalhadamente a natureza do dano..."
              onChange={(e) => setAvaria({...avaria, descricao: e.target.value})}
            ></textarea>
          </div>

          {/* AÇÃO IMEDIATA */}
          <div className="space-y-4">
            <label className="text-[11px] font-black text-rose-800 uppercase tracking-[0.2em] block text-left ml-1">Protocolo de Destino</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "Manutenção", icon: "🛠️", label: "Recuperar" },
                { id: "Descarte", icon: "🗑️", label: "Descartar" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAvaria({...avaria, acao: opt.id})}
                  className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all duration-300 ${
                    avaria.acao === opt.id 
                    ? "border-rose-600 bg-rose-50 text-rose-900 scale-[1.05] shadow-lg shadow-rose-900/5" 
                    : "border-slate-100 text-slate-300 hover:border-rose-200"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#8b0000] text-white rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl shadow-rose-900/30 hover:bg-rose-700 hover:-translate-y-1 transition-all active:scale-[0.95] text-[11px]"
          >
            Emitir Relatório de Perda
          </button>
        </form>

        {/* FOOTER DE AUDITORIA */}
        <div className="bg-rose-50/50 px-10 py-6 border-t border-rose-100 flex flex-col sm:flex-row justify-between items-center gap-4 pb-12 sm:pb-6">
          <p className="text-[9px] font-black text-rose-400 uppercase tracking-[0.3em]">Quality Unit: ANALU-QA-2026</p>
          <div className="flex items-center gap-3 bg-white px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></div>
            <span className="text-[9px] font-black text-rose-900 uppercase tracking-tighter">Gravação em Ledger Ativa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPerdaProducao;