/**
 * @file ModalAdicionarMaterial.jsx
 * @description Registro de Insumos Técnicos para Produção
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalAdicionarMaterial({ onClose, onSalvar }) {
  const [formData, setFormData] = useState({
    material: "",
    categoria: "Têxtil",
    unidade: "Metros",
    quantidade: "",
    custoUnidade: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.material || !formData.quantidade || !formData.custoUnidade) {
      alert("⚠️ Erro de Parâmetro: Preencha todos os dados técnicos antes de prosseguir.");
      return;
    }
    onSalvar(formData); 
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans">
      {/* OVERLAY EXECUTIVO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* CONTAINER DO MODAL - Mobile Sheet Design */}
      <div className="relative bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] w-full max-w-lg max-h-[92vh] overflow-hidden animate-slide-up border border-emerald-50 flex flex-col">
        
        {/* HEADER COM IDENTIDADE VISUAL */}
        <div className="bg-[#064e3b] p-8 md:p-10 text-white text-left sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2 italic opacity-80">
                Supply Chain Management
              </p>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
                Novo Insumo
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#b49157] rounded-2xl text-white transition-all duration-300 border border-white/5"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* FORMULÁRIO */}
        <div className="overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10 text-left">
            
            {/* ESPECIFICAÇÃO DO MATERIAL */}
            <div className="group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block transition-colors group-focus-within:text-[#b49157]">
                Material / Especificação Técnica
              </label>
              <input 
                required
                type="text" 
                placeholder="Ex: Espuma D33 Soft"
                className="w-full border-b-2 border-slate-100 py-4 text-xl font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all bg-transparent placeholder:text-slate-200"
                value={formData.material}
                onChange={(e) => setFormData({...formData, material: e.target.value})}
              />
            </div>

            {/* GRID: CATEGORIA E UNIDADE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Categoria</label>
                <div className="relative">
                  <select 
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-[#064e3b] outline-none focus:ring-2 focus:ring-[#b49157] appearance-none cursor-pointer"
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  >
                    <option value="Têxtil">Têxtil</option>
                    <option value="Preenchimento">Preenchimento</option>
                    <option value="Estrutura">Estrutura</option>
                    <option value="Acabamento">Acabamento</option>
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#b49157] opacity-50">▼</span>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unidade de Medida</label>
                <div className="relative">
                  <select 
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-black text-[#064e3b] outline-none focus:ring-2 focus:ring-[#b49157] appearance-none cursor-pointer"
                    value={formData.unidade}
                    onChange={(e) => setFormData({...formData, unidade: e.target.value})}
                  >
                    <option value="Metros">Metros (m)</option>
                    <option value="Blocos">Blocos (un)</option>
                    <option value="m³">Metros Cúbicos (m³)</option>
                    <option value="Kg">Quilos (kg)</option>
                  </select>
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#b49157] opacity-50">▼</span>
                </div>
              </div>
            </div>

            {/* GRID: QTD E CUSTO */}
            <div className="grid grid-cols-2 gap-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Qtd. Entrada</label>
                <input 
                  required
                  type="number" 
                  inputMode="decimal"
                  placeholder="0"
                  className="w-full bg-transparent border-b-2 border-slate-200 py-2 text-2xl font-black text-[#064e3b] outline-none focus:border-[#064e3b]"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#b49157] uppercase tracking-widest block">Custo Unitário</label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-black text-[#b49157] opacity-50">R$</span>
                  <input 
                    required
                    type="number" 
                    inputMode="decimal"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full bg-transparent border-b-2 border-[#b49157]/20 pl-7 py-2 text-2xl font-black text-[#064e3b] outline-none focus:border-[#b49157]"
                    value={formData.custoUnidade}
                    onChange={(e) => setFormData({...formData, custoUnidade: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-6 bg-[#064e3b] text-white font-black uppercase tracking-[0.4em] rounded-[1.5rem] shadow-2xl hover:bg-[#b49157] transition-all duration-300 active:scale-[0.97] shadow-emerald-900/20 text-[11px]"
            >
              Registrar no Inventário
            </button>
          </form>

          {/* FOOTER INFO */}
          <div className="bg-slate-50 p-8 border-t border-slate-100 text-center pb-12 sm:pb-8">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] flex items-center justify-center gap-2 italic">
              <span className="w-1 h-1 bg-rose-400 rounded-full animate-pulse"></span>
              Analu Inventory System v3.1 • Auditoria em Tempo Real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAdicionarMaterial;