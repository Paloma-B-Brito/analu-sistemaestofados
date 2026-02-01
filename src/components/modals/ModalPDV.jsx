import { useState } from "react";
import "../../App.css";

function ModalPDV({ onClose, estoqueDisponivel, onFinalizarVenda }) {
  const [passo, setPasso] = useState(1);
  const [venda, setVenda] = useState({
    produtoId: "",
    clienteNome: "",
    clienteCPF: "",
    formaPagamento: "Cartão de Crédito"
  });

  const produtoSelecionado = estoqueDisponivel.find(p => p.id === venda.produtoId);

  const handleFinalizar = () => {
    if (!venda.produtoId || !venda.clienteNome) return alert("Dados incompletos para faturamento!");
    onFinalizarVenda(venda);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY COM BLUR PROFUNDO */}
      <div className="absolute inset-0 bg-[#064e3b]/70 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh]">
        
        {/* HEADER PDV - Identidade Visual Reforçada */}
        <div className="bg-[#064e3b] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Retail Point of Sale</p>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Faturamento</h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
               <div className={`w-6 h-1 rounded-full transition-all ${passo === 1 ? 'bg-[#b49157]' : 'bg-white/20'}`}></div>
               <div className={`w-6 h-1 rounded-full transition-all ${passo === 2 ? 'bg-[#b49157]' : 'bg-white/20'}`}></div>
            </div>
            <span className="text-[10px] font-black opacity-40 uppercase tracking-widest mt-1">Passo {passo} de 2</span>
          </div>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
          {passo === 1 ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">1. Selecionar Item Disponível</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg uppercase">Estoque em Tempo Real</span>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {estoqueDisponivel.filter(p => p.status === "DISPONÍVEL").map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setVenda({...venda, produtoId: p.id})}
                    className={`flex justify-between items-center p-5 rounded-2xl border-2 transition-all group ${
                      venda.produtoId === p.id 
                      ? 'border-[#b49157] bg-[#b49157]/5 shadow-inner' 
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-left">
                      <p className={`text-[10px] font-black uppercase tracking-tighter ${venda.produtoId === p.id ? 'text-[#b49157]' : 'text-slate-400'}`}>{p.id}</p>
                      <p className="text-sm font-black text-[#064e3b] uppercase leading-tight">{p.modelo}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#064e3b]">R$ {p.preco.toLocaleString()}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Entrega Imediata</p>
                    </div>
                  </button>
                ))}
              </div>

              <button 
                disabled={!venda.produtoId}
                onClick={() => setPasso(2)}
                className="w-full py-5 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.2em] disabled:opacity-20 disabled:grayscale transition-all shadow-xl shadow-emerald-900/10 active:scale-[0.98]"
              >
                Prosseguir para Checkout
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">2. Dados do Cliente & Checkout</h3>
              
              <div className="grid grid-cols-1 gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-slate-50 px-1">Nome Completo</label>
                    <input 
                      type="text" 
                      placeholder="Identifique o comprador" 
                      className="w-full bg-transparent border-b-2 border-slate-200 py-4 font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all"
                      onChange={(e) => setVenda({...venda, clienteNome: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-slate-50 px-1">Documento</label>
                      <input 
                        type="text" 
                        placeholder="000.000.000-00" 
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 font-bold text-[#064e3b] outline-none focus:border-[#b49157]" 
                      />
                    </div>
                    <div className="relative">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-slate-50 px-1">Pagamento</label>
                      <select 
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 font-bold text-[#064e3b] outline-none cursor-pointer focus:border-[#b49157]"
                        onChange={(e) => setVenda({...venda, formaPagamento: e.target.value})}
                      >
                        <option>Cartão de Crédito</option>
                        <option>PIX / Transferência</option>
                        <option>Boleto Bancário</option>
                        <option>À Vista (Dinheiro)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD DE RESUMO FINAL - "RECIBO ANALU" */}
              <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b49157]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="flex justify-between items-center opacity-40 text-[9px] font-black uppercase tracking-[0.3em] mb-4">
                  <span>Descrição da Venda</span>
                  <span>Total Consolidado</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-black text-[#b49157] uppercase tracking-widest mb-1">{venda.produtoId}</p>
                    <p className="text-lg font-black uppercase leading-none">{produtoSelecionado?.modelo}</p>
                  </div>
                  <p className="text-3xl font-black text-white tracking-tighter">
                    <span className="text-[#b49157] text-sm mr-2 italic">R$</span>
                    {produtoSelecionado?.preco.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={() => setPasso(1)} 
                  className="flex-1 py-4 bg-slate-100 text-slate-500 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 transition-all text-[10px]"
                >
                  Revisar Item
                </button>
                <button 
                  onClick={handleFinalizar} 
                  className="flex-[2] py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all active:scale-[0.98] text-[10px]"
                >
                  Concluir Transação
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER DE SEGURANÇA */}
        <div className="bg-slate-50 p-6 flex justify-center items-center gap-2 pb-10 sm:pb-6">
          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-ping"></div>
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Secure Transaction Engine • Analu v3.0</p>
        </div>
      </div>
    </div>
  );
}

export default ModalPDV;