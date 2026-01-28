import { useState } from "react";
import "../../App.css"; // Caminho corrigido para evitar erro de compilação

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY EXECUTIVO */}
      <div className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in border border-emerald-100">
        
        {/* HEADER LOGÍSTICO */}
        <div className="bg-[#064e3b] p-6 text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Asset Transfer Protocol</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Saída Fábrica → Loja</h2>
          </div>
          <button onClick={onClose} className="text-white/50 hover:text-white transition">✕</button>
        </div>

        <div className="p-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Itens com Produção 100% Concluída</p>
          
          <div className="space-y-3 max-h-64 overflow-y-auto mb-8 pr-2">
            {prontosParaEnvio.map((item) => (
              <div 
                key={item.id} 
                onClick={() => toggleSelecao(item.id)}
                className={`flex justify-between items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${item.selecionado ? 'border-[#064e3b] bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.selecionado ? 'bg-[#064e3b] border-[#064e3b]' : 'border-slate-300'}`}>
                    {item.selecionado && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#b49157] uppercase">{item.id}</p>
                    <p className="text-sm font-black text-[#064e3b] uppercase leading-none">{item.modelo}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{item.acabamento}</p>
                  </div>
                </div>
                <span className="text-[8px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md uppercase">Pronto</span>
              </div>
            ))}
          </div>

          {/* RESUMO DO DESPACHO */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total p/ Despacho</p>
                <p className="text-3xl font-black text-[#064e3b]">{totalSelecionado} <span className="text-sm opacity-40">Unidades</span></p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Destino</p>
                <p className="text-sm font-black text-[#b49157] uppercase">Showroom Principal</p>
              </div>
            </div>
          </div>

          <button 
            disabled={totalSelecionado === 0}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl transition-all active:scale-[0.98] ${totalSelecionado > 0 ? 'bg-[#064e3b] text-white hover:brightness-110' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            onClick={() => {
                alert(`Protocolo de Envio Gerado para ${totalSelecionado} itens!`);
                onClose();
            }}
          >
            Confirmar Saída de Fábrica
          </button>
        </div>

        {/* RODAPÉ DE RASTREABILIDADE */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Ação registrada no Log de Logística • Analu v2.6</p>
        </div>
      </div>
    </div>
  );
}

export default ModalSaidaProdutoEstofado;