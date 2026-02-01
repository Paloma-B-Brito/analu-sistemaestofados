import { useState } from "react";
import "../../App.css";

function ModalSaidaProdutoEstofado({ onClose }) {
  // Mock de estofados que atingiram 100% de progresso na fábrica
  const [prontosParaEnvio, setProntosParaEnvio] = useState([
    { id: "FAB-EAM-042", modelo: "Poltrona Charles Eames", acabamento: "Pau-Ferro", selecionado: false },
    { id: "FAB-CH-005", modelo: "Sofá Chesterfield", acabamento: "Couro Legítimo", selecionado: false },
    { id: "FAB-SLM-012", modelo: "Sofá Slim Minimalista", acabamento: "Linho Europeu", selecionado: false }
  ]);

  const toggleSelecao = (id) => {
    setProntosParaEnvio(prontosParaEnvio.map(item => 
      item.id === id ? { ...item, selecionado: !item.selecionado } : item
    ));
  };

  const totalSelecionado = prontosParaEnvio.filter(i => i.selecionado).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY EXECUTIVO COM BLUR */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[92vh]">
        
        {/* HEADER LOGÍSTICO */}
        <div className="bg-[#064e3b] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1 text-center sm:text-left">Asset Transfer Protocol</p>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none">Saída Fábrica → Loja</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Itens Concluídos (Pronto para Carga)</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Fábrica Analu • Setor B</span>
          </div>
          
          <div className="space-y-3 mb-8">
            {prontosParaEnvio.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleSelecao(item.id)}
                className={`flex justify-between items-center p-5 rounded-3xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                  item.selecionado 
                  ? 'border-[#064e3b] bg-[#064e3b]/5 shadow-lg shadow-emerald-900/5' 
                  : 'border-slate-100 hover:border-emerald-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    item.selecionado 
                    ? 'bg-[#064e3b] text-white rotate-0' 
                    : 'bg-slate-100 text-transparent -rotate-45'
                  }`}>
                    <span className="text-xs font-black">✓</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className={`text-[10px] font-black uppercase tracking-tighter ${item.selecionado ? 'text-[#b49157]' : 'text-slate-400'}`}>
                        {item.id}
                      </p>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="text-[9px] font-bold text-emerald-600 uppercase">Q.C. Passed</span>
                    </div>
                    <p className="text-sm font-black text-[#064e3b] uppercase leading-none">{item.modelo}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{item.acabamento}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                    <span className="text-[8px] font-black px-3 py-1.5 bg-white border border-slate-100 text-slate-400 rounded-full uppercase shadow-sm">
                        Ready
                    </span>
                </div>
              </div>
            ))}
          </div>

          {/* RESUMO DO DESPACHO - CARD FLUTUANTE */}
          <div className="bg-slate-900 p-6 md:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden mb-8">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#b49157]/10 rounded-full blur-2xl"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="text-[9px] font-black text-[#b49157] uppercase tracking-[0.3em] mb-2 opacity-80">Manifesto de Carga</p>
                <p className="text-4xl font-black text-white leading-none">
                  {totalSelecionado < 10 ? `0${totalSelecionado}` : totalSelecionado} 
                  <span className="text-sm font-bold opacity-30 ml-2 uppercase tracking-widest text-white">Itens</span>
                </p>
              </div>
              <div className="h-px w-12 bg-white/10 hidden md:block"></div>
              <div className="text-center md:text-right">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Destino Final</p>
                <div className="flex items-center gap-2 justify-center md:justify-end">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <p className="text-sm font-black text-white uppercase tracking-tighter">Showroom Principal</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={totalSelecionado === 0}
            className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.4em] shadow-xl transition-all active:scale-[0.97] text-xs ${
              totalSelecionado > 0 
              ? 'bg-[#064e3b] text-white hover:bg-emerald-800 shadow-emerald-900/20' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed opacity-50'
            }`}
            onClick={() => {
                alert(`Protocolo de Envio Gerado para ${totalSelecionado} itens! O estoque do Showroom será atualizado.`);
                onClose();
            }}
          >
            Confirmar Despacho
          </button>
        </div>

        {/* RODAPÉ DE RASTREABILIDADE */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 text-center pb-10 sm:pb-5">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            Blockchain Ledger Entry: ANALU-LOG-{new Date().getFullYear()}-001
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalSaidaProdutoEstofado;