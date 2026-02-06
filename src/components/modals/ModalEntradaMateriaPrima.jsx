/**
 * @file ModalEntradaMateriaPrima.jsx
 * @description Controle de Entrada de Insumos e Matéria-Prima (ERP Integration)
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalEntradaMateriaPrima({ onClose }) {
  const [insumo, setInsumo] = useState({
    tipo: "Tecido",
    quantidade: "",
    unidadeMedida: "Metros (m)",
    peso: "",
    valorNota: "",
    fornecedor: ""
  });

  const tiposInsumo = ["Tecido", "Espuma", "Madeira", "Ferragens", "Químicos", "Embalagem"];

  const handleConfirmar = () => {
    if (!insumo.fornecedor || !insumo.valorNota) {
      return alert("Por favor, preencha os dados do fornecedor e o valor da nota fiscal.");
    }
    alert(`Entrada de ${insumo.tipo} via ${insumo.fornecedor.toUpperCase()} registrada com sucesso!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans">
      {/* OVERLAY EXECUTIVO COM BLUR PROFUNDO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/70 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] w-full max-w-2xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh]">
        
        {/* HEADER LOGÍSTICO */}
        <div className="bg-[#064e3b] p-8 md:p-10 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Supply Chain Management</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Conferência de Entrada</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-2xl text-white hover:bg-[#b49157] transition-all border border-white/10"
          >
            ✕
          </button>
        </div>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* TIPO E ORIGEM */}
            <div className="space-y-6 text-left">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-4">Natureza do Insumo</label>
                <div className="grid grid-cols-2 gap-3">
                  {tiposInsumo.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInsumo({...insumo, tipo: t})}
                      className={`py-4 px-2 rounded-2xl text-[10px] font-black uppercase tracking-tighter border-2 transition-all duration-300 ${
                        insumo.tipo === t 
                        ? "bg-[#064e3b] text-white border-[#064e3b] shadow-lg shadow-emerald-900/20 scale-[1.02]" 
                        : "bg-white text-slate-400 border-slate-100 hover:border-[#b49157]/50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Fornecedor / Origin</label>
                <input 
                  type="text" 
                  placeholder="Ex: Têxtil Premium Brasil"
                  className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-[#b49157] focus:bg-white rounded-[1.5rem] font-bold text-[#064e3b] outline-none transition-all placeholder:text-slate-300"
                  onChange={(e) => setInsumo({...insumo, fornecedor: e.target.value})}
                />
              </div>
            </div>

            {/* MÉTRICAS TÉCNICAS */}
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Quantidade</label>
                  <input 
                    type="number" 
                    inputMode="decimal"
                    placeholder="0.00"
                    className="w-full p-5 bg-white border-2 border-slate-50 rounded-2xl font-black text-[#064e3b] outline-none focus:border-[#b49157] transition-all shadow-sm"
                    onChange={(e) => setInsumo({...insumo, quantidade: e.target.value})}
                  />
                </div>
                <div className="text-left space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Unidade</label>
                  <select 
                    className="w-full p-5 bg-white border-2 border-slate-50 rounded-2xl font-bold text-slate-600 outline-none appearance-none cursor-pointer focus:border-[#b49157] shadow-sm"
                    onChange={(e) => setInsumo({...insumo, unidadeMedida: e.target.value})}
                  >
                    <option>Metros (m)</option>
                    <option>Unidades (un)</option>
                    <option>M² (Área)</option>
                    <option>Kg (Massa)</option>
                  </select>
                </div>
              </div>

              <div className="text-left space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Peso Verificado na Balança</label>
                <div className="relative">
                  <input 
                    type="number" 
                    inputMode="decimal"
                    placeholder="0.00"
                    className="w-full p-5 bg-white border-2 border-slate-50 rounded-2xl font-black text-[#064e3b] outline-none focus:border-[#b49157] transition-all shadow-sm"
                    onChange={(e) => setInsumo({...insumo, peso: e.target.value})}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">Kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* FINANCEIRO DA ENTRADA - DESTAQUE ANALU */}
          <div className="mt-10 p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#b49157]/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="text-center md:text-left">
                <p className="text-[11px] font-black text-[#b49157] uppercase tracking-[0.3em] mb-2">Montante Total da Operação</p>
                <p className="text-xs text-slate-400 font-bold uppercase italic tracking-tighter opacity-70">Sincronização imediata com Contas a Pagar</p>
              </div>
              
              <div className="relative w-full md:w-auto">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-[#b49157] text-2xl italic">R$</span>
                <input 
                  type="number" 
                  inputMode="decimal"
                  placeholder="0,00"
                  className="w-full md:w-64 pl-16 pr-8 py-6 bg-white/5 border-2 border-white/10 rounded-3xl font-black text-3xl text-white outline-none focus:border-[#b49157] focus:bg-white/10 transition-all text-right"
                  onChange={(e) => setInsumo({...insumo, valorNota: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleConfirmar}
            className="w-full mt-10 py-7 bg-[#064e3b] text-white rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-900/30 active:scale-[0.96] transition-all duration-300 hover:bg-emerald-800 hover:-translate-y-1 text-[11px]"
          >
            Confirmar Recebimento & Atualizar Estoque
          </button>
        </div>

        {/* AUDIT TRAIL */}
        <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 pb-12 sm:pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">ERP Inventory Protocol Active</p>
          </div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter italic">
            ID Operação: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalEntradaMateriaPrima;