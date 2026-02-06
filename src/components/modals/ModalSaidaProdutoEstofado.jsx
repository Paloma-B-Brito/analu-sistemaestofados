/**
 * @file ModalSaidaProdutoEstofado.jsx
 * @description Protocolo de Logística: Saída de Fábrica para Showroom
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalSaidaProdutoEstofado({ onClose }) {
  const [prontosParaEnvio, setProntosParaEnvio] = useState([
    { id: "FAB-EAM-042", modelo: "Poltrona Charles Eames", acabamento: "Pau-Ferro", selecionado: false },
    { id: "FAB-CH-005", modelo: "Sofá Chesterfield", acabamento: "Couro Legítimo", selecionado: false },
    { id: "FAB-SLM-012", modelo: "Sofá Slim Minimalista", acabamento: "Linho Europeu", selecionado: false }
  ]);

  const toggleSelecao = (id) => {
    setProntosParaEnvio(prontosParaEnvio.map(item => 
      item.id === id ? { ...item, selecionado: !item.selecionado } : item
    ));
  };

  const totalSelecionado = prontosParaEnvio.filter(i => i.selecionado).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY COM BLUR PROFUNDO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/70 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh] font-sans">
        
        {/* HEADER LOGÍSTICO EXECUTIVO */}
        <div className="bg-[#064e3b] p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Logistics Protocol</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Despacho de Ativos</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10"
          >
            ✕
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest text-left">Itens em doca de saída</h3>
            <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase">Fábrica Analu • Unidade 01</span>
          </div>
          
          <div className="space-y-4 mb-10">
            {prontosParaEnvio.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleSelecao(item.id)}
                className={`group flex justify-between items-center p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer ${
                  item.selecionado 
                  ? 'border-[#064e3b] bg-emerald-50/30 scale-[1.02] shadow-xl shadow-emerald-900/5' 
                  : 'border-slate-50 hover:border-slate-200 bg-white hover:translate-x-1'
                }`}
              >
                <div className="flex items-center gap-6">
                  {/* CHECKBOX CUSTOM */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                    item.selecionado 
                    ? 'bg-[#064e3b] border-[#064e3b] text-white rotate-0' 
                    : 'bg-white border-slate-100 text-transparent -rotate-90'
                  }`}>
                    <span className="text-sm font-black italic">✓</span>
                  </div>
                  
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-[9px] font-black uppercase tracking-widest ${item.selecionado ? 'text-[#b49157]' : 'text-slate-300'}`}>
                        {item.id}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                      <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">Pronto</span>
                    </div>
                    <p className={`text-base font-black uppercase leading-none transition-colors ${item.selecionado ? 'text-[#064e3b]' : 'text-slate-700'}`}>
                      {item.modelo}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">{item.acabamento}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MANIFESTO DE CARGA (DARK CARD) */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden mb-10 group">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#b49157]/10 rounded-full blur-3xl group-hover:bg-[#b49157]/20 transition-all duration-700"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-[#b49157] uppercase tracking-[0.4em] mb-3">Manifesto de Carga</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white leading-none">
                    {totalSelecionado < 10 ? `0${totalSelecionado}` : totalSelecionado}
                  </span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Unidades Selecionadas</span>
                </div>
              </div>
              
              <div className="w-px h-12 bg-white/10 hidden md:block"></div>
              
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Destino de Transferência</p>
                <div className="flex items-center gap-3 justify-center md:justify-end">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#b49157] shadow-[0_0_15px_rgba(180,145,87,0.5)]"></div>
                  <p className="text-sm font-black text-white uppercase tracking-tighter">Showroom Principal</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={totalSelecionado === 0}
            className={`w-full py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-[0.96] text-[11px] ${
              totalSelecionado > 0 
              ? 'bg-[#064e3b] text-white hover:bg-emerald-800 shadow-emerald-900/30' 
              : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'
            }`}
            onClick={() => {
                alert(`Protocolo ANALU-LOG Gerado com Sucesso. A carga está liberada para transporte.`);
                onClose();
            }}
          >
            Confirmar Despacho
          </button>
        </div>

        {/* AUDIT FOOTER */}
        <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 pb-12 sm:pb-6">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center justify-center gap-4">
            <span className="opacity-30">TRACE ID:</span>
            <span className="text-[#b49157]">ANL-{new Date().getTime().toString().slice(-6)}</span>
            <span className="opacity-30">|</span>
            <span>MOD: {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalSaidaProdutoEstofado;