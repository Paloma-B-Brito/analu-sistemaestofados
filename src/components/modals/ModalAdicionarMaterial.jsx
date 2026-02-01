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
      alert("Por favor, preencha todos os parâmetros técnicos.");
      return;
    }
    onSalvar(formData); 
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY COM BLUR - Fecha ao clicar fora */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      {/* CONTAINER DO MODAL - No mobile ele sobe como uma "Sheet" */}
      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up border border-emerald-100 flex flex-col">
        
        {/* HEADER FIXO */}
        <div className="bg-[#064e3b] p-6 md:p-8 text-white text-left sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1 italic">
                Supply Chain Management
              </p>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Novo Insumo</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* FORMULÁRIO COM PADDING ADAPTADO */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 text-left">
          
          {/* NOME DO MATERIAL */}
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
              Nome do Material / Especificação
            </label>
            <input 
              required
              type="text" 
              placeholder="Ex: Tecido Linho Europeu"
              className="w-full border-b-2 border-slate-100 py-3 text-base font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all bg-transparent"
              value={formData.material}
              onChange={(e) => setFormData({...formData, material: e.target.value})}
            />
          </div>

          {/* GRID: CATEGORIA E UNIDADE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Categoria</label>
              <select 
                className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-[#064e3b] outline-none focus:ring-2 focus:ring-[#b49157]"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              >
                <option value="Têxtil">Têxtil</option>
                <option value="Preenchimento">Preenchimento</option>
                <option value="Estrutura">Estrutura</option>
                <option value="Acabamento">Acabamento</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Unidade</label>
              <select 
                className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-[#064e3b] outline-none focus:ring-2 focus:ring-[#b49157]"
                value={formData.unidade}
                onChange={(e) => setFormData({...formData, unidade: e.target.value})}
              >
                <option value="Metros">Metros (m)</option>
                <option value="Blocos">Blocos (un)</option>
                <option value="m³">Metros Cúbicos (m³)</option>
                <option value="Kg">Quilos (kg)</option>
              </select>
            </div>
          </div>

          {/* GRID: QTD E CUSTO (Inputs numéricos otimizados) */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Qtd. Entrada</label>
              <input 
                required
                type="number" 
                inputMode="decimal"
                placeholder="0"
                className="w-full border-b-2 border-slate-100 py-3 text-base font-bold text-[#064e3b] outline-none focus:border-[#064e3b] bg-transparent"
                value={formData.quantidade}
                onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Custo Unit (R$)</label>
              <input 
                required
                type="number" 
                inputMode="decimal"
                step="0.01"
                placeholder="0.00"
                className="w-full border-b-2 border-slate-100 py-3 text-base font-bold text-[#064e3b] outline-none focus:border-[#064e3b] bg-transparent"
                value={formData.custoUnidade}
                onChange={(e) => setFormData({...formData, custoUnidade: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 py-5 bg-[#064e3b] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-[#b49157] transition-all active:scale-[0.98] shadow-emerald-900/20 text-xs"
          >
            Registrar Insumo
          </button>
        </form>

        <div className="bg-slate-50 p-6 border-t border-slate-100 text-center pb-10 sm:pb-6">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest italic">
            Monitoramento Analu v3.0 • Cuidado: Ação Irreversível
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalAdicionarMaterial;