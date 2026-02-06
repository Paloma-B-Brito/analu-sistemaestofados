/**
 * @file ModalNovoEstofado.jsx
 * @description Registro de Novos Ativos (Produtos) no Catálogo Unificado
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalNovoEstofado({ onClose }) {
  const [produto, setProduto] = useState({
    nome: "",
    categoria: "Estofado",
    precoVenda: "",
    custoProducao: "",
    estoqueInicial: "",
    descricao: ""
  });

  const categorias = ["Estofado", "Cosméticos", "Decoração", "Acessórios"];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`O item "${produto.nome.toUpperCase()}" foi integrado ao catálogo global com sucesso!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans">
      {/* OVERLAY EXECUTIVO COM BLUR */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-xl overflow-hidden animate-slide-up border border-emerald-50 flex flex-col max-h-[92vh]">
        
        {/* HEADER COM IDENTIDADE ANALU */}
        <div className="bg-[#064e3b] p-8 md:p-10 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Asset Management</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Novo Cadastro</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-[#b49157] transition-all duration-300 border border-white/10"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 overflow-y-auto custom-scrollbar">
          
          {/* NOME DO PRODUTO */}
          <div className="space-y-3 text-left">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Identificação Comercial</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Sofá Milano Couro Tabaco"
              className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-[#b49157] focus:bg-white rounded-2xl font-bold text-[#064e3b] outline-none transition-all placeholder:text-slate-300"
              onChange={(e) => setProduto({...produto, nome: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CATEGORIA */}
            <div className="space-y-3 text-left">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Categoria de Ativo</label>
              <div className="relative">
                <select 
                  className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl font-bold text-[#064e3b] outline-none cursor-pointer focus:border-[#064e3b] appearance-none"
                  value={produto.categoria}
                  onChange={(e) => setProduto({...produto, categoria: e.target.value})}
                >
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">▼</div>
              </div>
            </div>

            {/* ESTOQUE INICIAL */}
            <div className="space-y-3 text-left">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Qtd. Lançamento</label>
              <input 
                required
                type="number" 
                placeholder="0"
                className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl font-black text-[#064e3b] outline-none focus:border-[#064e3b] transition-all"
                onChange={(e) => setProduto({...produto, estoqueInicial: e.target.value})}
              />
            </div>
          </div>

          {/* FINANCEIRO DASHBOARD (Custo vs Venda) */}
          <div className="grid grid-cols-2 gap-6 p-6 bg-slate-900 rounded-[2rem] shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b49157]/5 to-transparent pointer-events-none"></div>
            
            <div className="space-y-3 text-left relative z-10">
              <label className="text-[9px] font-black text-[#b49157] uppercase tracking-widest block">Custo de Produção</label>
              <div className="relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-black text-rose-500/50 italic">R$</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  placeholder="0,00"
                  className="w-full pl-7 bg-transparent border-b border-slate-700 py-2 font-black text-white outline-none focus:border-rose-500 transition-all text-xl"
                  onChange={(e) => setProduto({...produto, custoProducao: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-3 text-left relative z-10">
              <label className="text-[9px] font-black text-emerald-500 uppercase tracking-widest block text-right">Preço de Tabela</label>
              <div className="relative text-right">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-black text-emerald-500/50 italic pointer-events-none">R$</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  placeholder="0,00"
                  className="w-full pr-8 bg-transparent border-b border-slate-700 py-2 font-black text-white outline-none focus:border-emerald-500 transition-all text-xl text-right"
                  onChange={(e) => setProduto({...produto, precoVenda: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* DESCRIÇÃO ESPECÍFICA */}
          <div className="space-y-3 text-left">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Ficha Técnica & Notas</label>
            <textarea 
              rows="3"
              className="w-full p-6 bg-slate-50 border-2 border-transparent focus:border-[#b49157] focus:bg-white rounded-[2rem] font-medium text-slate-600 outline-none transition-all text-sm resize-none"
              placeholder="Descreva materiais, acabamentos e diferenciais..."
              onChange={(e) => setProduto({...produto, descricao: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#064e3b] text-white rounded-[2rem] font-black uppercase tracking-[0.4em] shadow-2xl shadow-emerald-900/30 hover:bg-[#b49157] hover:-translate-y-1 transition-all active:scale-[0.96] text-[11px]"
          >
            Confirmar Integração
          </button>
        </form>

        {/* FOOTER AUDIT */}
        <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 pb-12 sm:pb-6">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
            Cloud Catalog Sync Protocol v2.6
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalNovoEstofado;