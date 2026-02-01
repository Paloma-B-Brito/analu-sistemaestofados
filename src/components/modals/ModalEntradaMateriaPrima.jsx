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

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY EXECUTIVO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh]">
        
        {/* HEADER LOGÍSTICO */}
        <div className="bg-[#064e3b] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Supply Chain Management</p>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Conferência de Entrada</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* TIPO E ORIGEM */}
            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Tipo de Insumo</label>
                <div className="grid grid-cols-2 gap-2">
                  {tiposInsumo.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInsumo({...insumo, tipo: t})}
                      className={`py-3 px-2 rounded-xl text-[10px] font-bold uppercase border transition-all ${
                        insumo.tipo === t 
                        ? "bg-[#064e3b] text-white border-[#064e3b] shadow-md shadow-emerald-900/20" 
                        : "bg-white text-slate-500 border-slate-100 hover:border-[#b49157]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Fornecedor / Origem</label>
                <input 
                  type="text" 
                  placeholder="Ex: Tecidos Império"
                  className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#b49157] focus:bg-white rounded-2xl font-bold text-[#064e3b] outline-none transition-all"
                  onChange={(e) => setInsumo({...insumo, fornecedor: e.target.value})}
                />
              </div>
            </div>

            {/* MÉTRICAS TÉCNICAS */}
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Quantidade</label>
                  <input 
                    type="number" 
                    inputMode="decimal"
                    placeholder="0.00"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-black text-[#064e3b] outline-none focus:ring-2 focus:ring-[#b49157]/20"
                    onChange={(e) => setInsumo({...insumo, quantidade: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Unidade</label>
                  <select 
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-500 outline-none appearance-none cursor-pointer"
                    onChange={(e) => setInsumo({...insumo, unidadeMedida: e.target.value})}
                  >
                    <option>Metros (m)</option>
                    <option>Unidades (un)</option>
                    <option>M² (Área)</option>
                    <option>Kg (Massa)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Peso Verificado (Kg)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    inputMode="decimal"
                    placeholder="0.00"
                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-black text-[#064e3b] outline-none"
                    onChange={(e) => setInsumo({...insumo, peso: e.target.value})}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">KG</span>
                </div>
              </div>
            </div>
          </div>

          {/* FINANCEIRO DA ENTRADA */}
          <div className="mt-8 p-6 bg-[#b49157]/5 border-2 border-dashed border-[#b49157]/20 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-black text-[#b49157] uppercase tracking-widest leading-none mb-1">Valor Total da Nota</p>
              <p className="text-[11px] text-slate-400 font-bold uppercase italic tracking-tighter">Conforme documento fiscal</p>
            </div>
            <div className="relative w-full md:w-auto">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-[#b49157] text-xl">R$</span>
              <input 
                type="number" 
                inputMode="decimal"
                placeholder="0.00"
                className="w-full md:w-56 pl-14 pr-6 py-5 bg-white border-2 border-[#b49157]/10 rounded-2xl font-black text-2xl text-[#064e3b] outline-none focus:border-[#b49157] shadow-inner"
                onChange={(e) => setInsumo({...insumo, valorNota: e.target.value})}
              />
            </div>
          </div>

          <button 
            className="w-full mt-8 py-6 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-emerald-900/20 active:scale-[0.98] transition-all hover:bg-emerald-800"
            onClick={() => {
                alert("Entrada Registrada: Estoque atualizado no ERP Analu.");
                onClose();
            }}
          >
            Confirmar Recebimento
          </button>
        </div>

        {/* AUDIT TRAIL */}
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex justify-center items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Inventory Audit Trail Active • Logged: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalEntradaMateriaPrima;