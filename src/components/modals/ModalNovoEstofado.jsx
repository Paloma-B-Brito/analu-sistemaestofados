import { useState } from "react";
import "../../App.css"; // Correção do caminho para resolver o erro

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
    console.log("Produto Cadastrado:", produto);
    alert(`${produto.nome} cadastrado com sucesso no sistema Analu!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY SUAVE CONFORME O PADRÃO VISUAL */}
      <div className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* CONTEÚDO DO MODAL */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in border border-emerald-100">
        
        {/* CABEÇALHO HERITAGE GREEN */}
        <div className="bg-[#064e3b] p-6 text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">New Asset Registration</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Cadastrar Novo Item</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nome do Produto</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Perfume Analu Noir ou Sofá Madri"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none"
                onChange={(e) => setProduto({...produto, nome: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Categoria</label>
              <select 
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-[#064e3b] outline-none"
                value={produto.categoria}
                onChange={(e) => setProduto({...produto, categoria: e.target.value})}
              >
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Estoque Inicial</label>
              <input 
                required
                type="number" 
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-[#064e3b]"
                onChange={(e) => setProduto({...produto, estoqueInicial: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Custo (R$)</label>
              <input 
                required
                type="number" 
                placeholder="0.00"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-rose-600"
                onChange={(e) => setProduto({...produto, custoProducao: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Venda (R$)</label>
              <input 
                required
                type="number" 
                placeholder="0.00"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-emerald-600"
                onChange={(e) => setProduto({...produto, precoVenda: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Descrição / Detalhes Técnicos</label>
            <textarea 
              rows="3"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-600 outline-none"
              placeholder="Para cosméticos: fragrância, volume. Para estofados: tecido, densidade."
              onChange={(e) => setProduto({...produto, descricao: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            Finalizar Cadastro
          </button>
        </form>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Base de Dados Unificada Analu v2.6.0</p>
        </div>
      </div>
    </div>
  );
}

export default ModalNovoEstofado;