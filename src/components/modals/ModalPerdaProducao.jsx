import { useState } from "react";
import "../../App.css";

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
    alert(`Relatório de avaria do item ${avaria.item} enviado para a gestão de qualidade!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY DE ALERTA COM BLUR */}
      <div 
        className="absolute inset-0 bg-[#450a0a]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full max-w-xl overflow-hidden animate-slide-up border border-rose-100 flex flex-col max-h-[95vh]">
        
        {/* HEADER DE RISCO / CRÍTICO */}
        <div className="bg-[#8b0000] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-600/30 rounded-2xl flex items-center justify-center text-rose-200 border border-rose-400/30">
              ⚠️
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-300 mb-1">Loss Control & Quality</p>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Relatar Avaria</h2>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition-all"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSalvar} className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* IDENTIFICAÇÃO DO ATIVO */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Item sob Inspeção</label>
            <input 
              required
              type="text" 
              placeholder="SKU, Lote ou Nome do Produto..."
              className="w-full p-4 bg-rose-50/30 border-2 border-rose-100/50 rounded-2xl font-bold text-rose-900 outline-none focus:border-rose-600 focus:bg-white transition-all placeholder:text-rose-200"
              onChange={(e) => setAvaria({...avaria, item: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Local do Dano</label>
              <select 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 outline-none focus:border-rose-600"
                onChange={(e) => setAvaria({...avaria, origem: e.target.value})}
              >
                <option>Loja / Showroom</option>
                <option>Fábrica / Produção</option>
                <option>Expedição / Logística</option>
                <option>Cliente (Pós-Venda)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Severidade</label>
              <select 
                className={`w-full p-4 border-2 rounded-2xl font-black outline-none transition-all ${
                  avaria.severidade === 'Alta' ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-700 border-slate-100'
                }`}
                onChange={(e) => setAvaria({...avaria, severidade: e.target.value})}
              >
                <option value="Baixa">Baixa (Estético)</option>
                <option value="Média">Média (Funcional)</option>
                <option value="Alta">Alta (Perda Total)</option>
              </select>
            </div>
          </div>

          {/* DESCRIÇÃO TÉCNICA */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Descrição do Incidente</label>
            <textarea 
              rows="3"
              className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-rose-200 focus:bg-white rounded-2xl font-medium text-slate-600 outline-none transition-all text-sm resize-none"
              placeholder="Detalhe o estado do item e como a avaria foi detectada..."
              onChange={(e) => setAvaria({...avaria, descricao: e.target.value})}
            ></textarea>
          </div>

          {/* AÇÃO RECOMENDADA - UI DE CARDS */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-rose-700 uppercase tracking-widest block">Decisão Imediata</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAvaria({...avaria, acao: "Manutenção"})}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  avaria.acao === "Manutenção" 
                  ? "border-rose-600 bg-rose-50 text-rose-900" 
                  : "border-slate-100 text-slate-400 hover:border-rose-200"
                }`}
              >
                <span className="text-lg">🛠️</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Recuperar</span>
              </button>
              
              <button
                type="button"
                onClick={() => setAvaria({...avaria, acao: "Descarte"})}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                  avaria.acao === "Descarte" 
                  ? "border-rose-600 bg-rose-50 text-rose-900" 
                  : "border-slate-100 text-slate-400 hover:border-rose-200"
                }`}
              >
                <span className="text-lg">🗑️</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Descartar</span>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-[#8b0000] text-white rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-rose-900/20 hover:bg-rose-700 transition-all active:scale-[0.98] text-xs"
          >
            Emitir Laudo de Perda
          </button>
        </form>

        {/* RODAPÉ DE AUDITORIA */}
        <div className="bg-rose-50/50 px-8 py-5 border-t border-rose-100 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[8px] font-black text-rose-400 uppercase tracking-[0.2em]">Quality Assurance Unit • Analu v3.0</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></div>
            <span className="text-[8px] font-black text-rose-900 uppercase">Protocolo de Auditoria Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPerdaProducao;