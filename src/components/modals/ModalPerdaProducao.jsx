import { useState } from "react";
import "../../App.css"; // Garantindo o caminho correto para evitar erros

function ModalPerdaProducao({ onClose }) {
  const [avaria, setAvaria] = useState({
    item: "",
    origem: "Loja / Showroom",
    severidade: "Média",
    causa: "Transporte",
    descricao: "",
    acao: "Enviar para Conserto"
  });

  const handleSalvar = (e) => {
    e.preventDefault();
    console.log("Avaria Registrada:", avaria);
    alert(`Relatório de avaria do item ${avaria.item} enviado para a produção!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[#8b0000]/20 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in border border-rose-100">
        
        {/* HEADER DE RISCO */}
        <div className="bg-[#8b0000] p-6 text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200 mb-1">Loss Control & Quality</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Relatar Avaria / Dano</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">✕</button>
        </div>

        <form onSubmit={handleSalvar} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Item Identificado</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Poltrona Eames Lote #42 ou Perfume Analu"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-rose-900 focus:ring-2 focus:ring-rose-500/20 outline-none"
                onChange={(e) => setAvaria({...avaria, item: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Local do Incidente</label>
              <select 
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
                onChange={(e) => setAvaria({...avaria, origem: e.target.value})}
              >
                <option>Loja / Showroom</option>
                <option>Fábrica / Produção</option>
                <option>Expedição / Logística</option>
                <option>Cliente (Pós-Venda)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Severidade</label>
              <select 
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 outline-none"
                onChange={(e) => setAvaria({...avaria, severidade: e.target.value})}
              >
                <option>Baixa (Estético)</option>
                <option>Média (Funcional)</option>
                <option>Alta (Perda Total)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Descrição do Dano</label>
            <textarea 
              rows="3"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-600 outline-none"
              placeholder="Descreva o rasgo, quebra ou defeito de fábrica constatado..."
              onChange={(e) => setAvaria({...avaria, descricao: e.target.value})}
            ></textarea>
          </div>

          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
             <label className="text-[10px] font-black text-rose-700 uppercase tracking-widest block mb-2">Ação Recomendada</label>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-bold text-rose-900">
                   <input type="radio" name="acao" value="Conserto" defaultChecked onChange={() => setAvaria({...avaria, acao: "Enviar para Conserto"})} /> 
                   Manutenção
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-rose-900">
                   <input type="radio" name="auto" value="Descarte" onChange={() => setAvaria({...avaria, acao: "Baixa / Descarte"})} /> 
                   Descarte (Perda)
                </label>
             </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#8b0000] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all active:scale-95"
          >
            Emitir Relatório de Perda
          </button>
        </form>

        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Quality Assurance Unit</p>
          <span className="text-[9px] font-black text-rose-300 uppercase">Atenção: Ação Irreversível</span>
        </div>
      </div>
    </div>
  );
}

export default ModalPerdaProducao;