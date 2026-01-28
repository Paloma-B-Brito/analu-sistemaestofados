import { useState } from "react";
import "../../App.css"; // Mantendo a correção de caminho para evitar erros

function ModalEntradaMateriaPrima({ onClose }) {
  const [insumo, setInsumo] = useState({
    tipo: "Tecido",
    quantidade: "",
    unidadeMedida: "Metros (m)",
    peso: "",
    valorNota: "",
    fornecedor: ""
  });

  const tiposInsumo = ["Tecido", "Espuma", "Madeira", "Ferragens", "Químicos (Cosméticos)", "Embalagem"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in border border-emerald-100">
        
        {/* HEADER */}
        <div className="bg-[#064e3b] p-6 text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Supply Chain Management</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Conferência de Entrada</h2>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* TIPO E CATEGORIA */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Tipo de Insumo</label>
                <select 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#064e3b] outline-none"
                  onChange={(e) => setInsumo({...insumo, tipo: e.target.value})}
                >
                  {tiposInsumo.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Fornecedor / Origem</label>
                <input 
                  type="text" 
                  placeholder="Ex: Tecidos Império"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-[#064e3b] outline-none"
                  onChange={(e) => setInsumo({...insumo, fornecedor: e.target.value})}
                />
              </div>
            </div>

            {/* MEDIDAS E PESOS */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Quanto mede?</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-[#064e3b] outline-none"
                    onChange={(e) => setInsumo({...insumo, quantidade: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Unidade</label>
                  <select className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-500 outline-none">
                    <option>Metros (m)</option>
                    <option>M² (Quadrado)</option>
                    <option>M³ (Cúbico)</option>
                    <option>Unidades (un)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Quanto pesa? (Kg)</label>
                <input 
                  type="number" 
                  placeholder="0.00 kg"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-[#064e3b] outline-none"
                  onChange={(e) => setInsumo({...insumo, peso: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* VALOR DA NOTA / CUSTO */}
          <div className="mt-6 p-6 bg-[#064e3b]/5 border border-[#064e3b]/10 rounded-3xl flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest">Valor Total da Entrada</p>
              <p className="text-xs text-slate-500 font-bold">Baseado na Nota Fiscal de compra</p>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157]">R$</span>
              <input 
                type="number" 
                placeholder="0.00"
                className="pl-12 pr-6 py-4 bg-white border-2 border-[#064e3b]/20 rounded-2xl font-black text-2xl text-[#064e3b] w-48 outline-none focus:border-[#064e3b]"
                onChange={(e) => setInsumo({...insumo, valorNota: e.target.value})}
              />
            </div>
          </div>

          <button 
            className="w-full mt-8 py-5 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl hover:brightness-110 active:scale-[0.98] transition-all"
            onClick={() => {
                alert("Entrada de Insumo Registrada e Estoque Atualizado!");
                onClose();
            }}
          >
            Confirmar Recebimento
          </button>
        </div>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-center italic">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Inventory Audit Trail Active</p>
        </div>
      </div>
    </div>
  );
}

export default ModalEntradaMateriaPrima;