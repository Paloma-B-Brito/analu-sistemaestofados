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
    alert(`${produto.nome} integrado ao catálogo Analu!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY EXECUTIVO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/50 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* CONTEÚDO DO MODAL */}
      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-slide-up border border-emerald-100 max-h-[92vh] flex flex-col">
        
        {/* CABEÇALHO COM IDENTIDADE ANALU */}
        <div className="bg-[#064e3b] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">New Asset Registration</p>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">Cadastrar Item</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* NOME DO PRODUTO */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Identificação do Produto</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Poltrona Bellagio ou Vela Noir"
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#b49157] focus:bg-white rounded-2xl font-bold text-[#064e3b] outline-none transition-all placeholder:text-slate-300"
              onChange={(e) => setProduto({...produto, nome: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CATEGORIA */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Categoria</label>
              <select 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-[#064e3b] outline-none cursor-pointer focus:border-[#064e3b]"
                value={produto.categoria}
                onChange={(e) => setProduto({...produto, categoria: e.target.value})}
              >
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* ESTOQUE INICIAL */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Qtd. Inicial</label>
              <input 
                required
                type="number" 
                inputMode="numeric"
                placeholder="0"
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-[#064e3b] outline-none focus:border-[#064e3b]"
                onChange={(e) => setProduto({...produto, estoqueInicial: e.target.value})}
              />
            </div>
          </div>

          {/* FINANCEIRO DASHBOARD (Custo vs Venda) */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Custo Unitário</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-rose-300">R$</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="w-full pl-9 pr-3 py-3 bg-white border border-rose-100 rounded-xl font-black text-rose-600 outline-none"
                  onChange={(e) => setProduto({...produto, custoProducao: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Preço de Venda</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-emerald-300">R$</span>
                <input 
                  required
                  type="number" 
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="w-full pl-9 pr-3 py-3 bg-white border border-emerald-100 rounded-xl font-black text-emerald-600 outline-none"
                  onChange={(e) => setProduto({...produto, precoVenda: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Especificações Técnicas</label>
            <textarea 
              rows="3"
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#b49157] focus:bg-white rounded-2xl font-medium text-slate-600 outline-none transition-all text-sm resize-none"
              placeholder="Descreva detalhes como materiais, dimensões ou notas olfativas..."
              onChange={(e) => setProduto({...produto, descricao: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.25em] shadow-xl shadow-emerald-900/20 hover:bg-[#b49157] transition-all active:scale-[0.97] text-xs"
          >
            Finalizar Cadastro
          </button>
        </form>

        {/* FOOTER AUDIT */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 text-center pb-8 sm:pb-5">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Analu Unified Database Management v2.6.0</p>
        </div>
      </div>
    </div>
  );
}

export default ModalNovoEstofado;