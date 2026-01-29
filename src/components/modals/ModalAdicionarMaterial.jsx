import { useState } from "react";
import "../../App.css"; // Caminho corrigido para evitar erro de módulo

function ModalAdicionarMaterial({ onClose, onSalvar }) {
  // Estado para capturar as entradas do formulário
  const [formData, setFormData] = useState({
    material: "",
    categoria: "Têxtil",
    unidade: "Metros",
    quantidade: "",
    custoUnidade: ""
  });

  // Função para processar o envio
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica antes de enviar ao "motor" Java ou Front
    if (!formData.material || !formData.quantidade || !formData.custoUnidade) {
      alert("Por favor, preencha todos os parâmetros técnicos.");
      return;
    }
    
    // Dispara a função de salvamento enviada pelo componente pai
    onSalvar(formData); 
    onClose(); // Fecha o modal após o sucesso
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY EXECUTIVO COM BLUR */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up border border-emerald-100">
        
        <div className="bg-[#064e3b] p-6 text-white text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1 italic">
            Supply Chain Management
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Novo Registro de Insumo</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 text-left">
          
          {/* NOME DO MATERIAL */}
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
              Nome do Material / Especificação
            </label>
            <input 
              required
              type="text" 
              placeholder="Ex: Tecido Linho Europeu Importado"
              className="w-full border-b-2 border-slate-100 py-2 text-sm font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all placeholder:text-slate-200"
              value={formData.material}
              onChange={(e) => setFormData({...formData, material: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* CATEGORIA */}
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Categoria
              </label>
              <select 
                className="w-full border-b-2 border-slate-100 py-2 text-sm font-bold text-[#064e3b] outline-none cursor-pointer focus:border-[#064e3b]"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              >
                <option value="Têxtil">Têxtil</option>
                <option value="Preenchimento">Preenchimento</option>
                <option value="Estrutura">Estrutura</option>
                <option value="Acabamento">Acabamento</option>
              </select>
            </div>

            {/* UNIDADE DE MEDIDA */}
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Unidade
              </label>
              <select 
                className="w-full border-b-2 border-slate-100 py-2 text-sm font-bold text-[#064e3b] outline-none cursor-pointer focus:border-[#064e3b]"
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

          <div className="grid grid-cols-2 gap-6">
            {/* QUANTIDADE */}
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Qtd. Entrada
              </label>
              <input 
                required
                type="number" 
                placeholder="0"
                className="w-full border-b-2 border-slate-100 py-2 text-sm font-bold text-[#064e3b] outline-none focus:border-[#064e3b]"
                value={formData.quantidade}
                onChange={(e) => setFormData({...formData, quantidade: e.target.value})}
              />
            </div>

            {/* CUSTO UNITÁRIO */}
            <div>
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Custo Unitário (R$)
              </label>
              <input 
                required
                type="number" 
                step="0.01"
                placeholder="0.00"
                className="w-full border-b-2 border-slate-100 py-2 text-sm font-bold text-[#064e3b] outline-none focus:border-[#064e3b]"
                value={formData.custoUnidade}
                onChange={(e) => setFormData({...formData, custoUnidade: e.target.value})}
              />
            </div>
          </div>

          {/* BOTÃO DE AÇÃO MONOLÍTICO */}
          <button 
            type="submit" 
            className="w-full mt-6 py-4 bg-[#064e3b] text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl hover:bg-[#b49157] transition-all active:scale-[0.98] shadow-emerald-900/20"
          >
            Confirmar Ingresso de Material
          </button>
        </form>

        {/* FOOTER DE RASTREABILIDADE */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest italic">
            Ação monitorada pelo módulo de Auditoria Analu v3.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalAdicionarMaterial;