/**
 * @file ModalNovoEstofado.jsx
 * @description Registro de Ativos - Layout High-Density
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState } from "react";

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
    alert(`ITEM INTEGRADO: ${produto.nome.toUpperCase()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
      {/* OVERLAY EXECUTIVO */}
      <div className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-emerald-50 animate-slide-up">
        
        {/* HEADER SLIM */}
        <div className="bg-[#064e3b] px-6 py-4 text-white flex justify-between items-center">
          <div className="text-left">
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#b49157]">Asset Entry</p>
            <h2 className="text-lg font-black uppercase tracking-tighter">Novo Cadastro</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl font-light">✕</button>
        </div>

        {/* FORMULÁRIO COMPACTO */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3 bg-white text-left">
          
          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo / Referência</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Sofá Milano"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-[#b49157] rounded-xl font-bold text-[#064e3b] outline-none text-xs transition-all"
              onChange={(e) => setProduto({...produto, nome: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Categoria</label>
              <select 
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-[#064e3b] outline-none text-[10px]"
                value={produto.categoria}
                onChange={(e) => setProduto({...produto, categoria: e.target.value})}
              >
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Qtd Inicial</label>
              <input 
                required
                type="number" 
                placeholder="0"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-black text-[#064e3b] outline-none text-xs"
                onChange={(e) => setProduto({...produto, estoqueInicial: e.target.value})}
              />
            </div>
          </div>

          {/* DASHBOARD FINANCEIRO INTERNO */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-xl shadow-inner">
            <div className="border-r border-white/5 pr-2">
              <label className="text-[7px] font-black text-rose-400 uppercase mb-0.5 block">Custo Unit.</label>
              <div className="flex items-center">
                <span className="text-[10px] text-white/30 mr-1">R$</span>
                <input 
                  type="number" 
                  className="w-full bg-transparent font-black text-white outline-none text-sm"
                  onChange={(e) => setProduto({...produto, custoProducao: e.target.value})}
                />
              </div>
            </div>
            <div className="pl-2">
              <label className="text-[7px] font-black text-emerald-400 uppercase mb-0.5 block">Preço Venda</label>
              <div className="flex items-center">
                <span className="text-[10px] text-white/30 mr-1">R$</span>
                <input 
                  type="number" 
                  className="w-full bg-transparent font-black text-white outline-none text-sm"
                  onChange={(e) => setProduto({...produto, precoVenda: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Notas Técnicas</label>
            <textarea 
              rows="2"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl font-medium text-slate-600 outline-none text-[10px] resize-none"
              placeholder="Ex: Veludo Cinza, pés de metal..."
              onChange={(e) => setProduto({...produto, descricao: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-[#064e3b] text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-[#b49157] transition-all text-[9px] active:scale-[0.97]"
          >
            Registrar no Acervo
          </button>
        </form>

        {/* FOOTER */}
        <div className="bg-slate-50 py-2 border-t border-slate-100">
          <p className="text-[7px] font-black text-slate-300 uppercase tracking-[0.4em] text-center">
            SCM Rickman Brown
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalNovoEstofado;