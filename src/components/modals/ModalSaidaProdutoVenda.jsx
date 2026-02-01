import { useState } from "react";
import '../../App.css';

function ModalSaidaProdutoVenda({ onClose }) {
  const [venda, setVenda] = useState({
    tipoItem: "Estofado",
    produto: "",
    valorBase: 0,
    desconto: 0,
    pagamento: "Cartão de Crédito",
    vendedor: "Ana Paula"
  });

  // Cálculo de valor final em tempo real
  const descontoCalculado = venda.valorBase * (venda.desconto / 100);
  const valorFinal = venda.valorBase - descontoCalculado;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* OVERLAY EXECUTIVO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-3xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh]">
        
        {/* CABEÇALHO POS */}
        <div className="bg-[#064e3b] p-6 md:p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Point of Sale (POS)</p>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Registrar Venda</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* COLUNA 1: CONFIGURAÇÃO DO ITEM (60%) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b pb-2">Informações do Ativo</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Categoria</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#064e3b] rounded-2xl font-bold text-[#064e3b] outline-none transition-all"
                      onChange={(e) => setVenda({...venda, tipoItem: e.target.value})}
                    >
                      <option>Estofado</option>
                      <option>Cosméticos</option>
                      <option>Mobiliário</option>
                      <option>Serviços</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Método</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#064e3b] rounded-2xl font-bold text-[#064e3b] outline-none transition-all"
                      onChange={(e) => setVenda({...venda, pagamento: e.target.value})}
                    >
                      <option>Cartão de Crédito</option>
                      <option>PIX (Analu)</option>
                      <option>Dinheiro</option>
                      <option>Boleto</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Produto / Descrição</label>
                  <input 
                    type="text" 
                    placeholder="Nome do item vendido..."
                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-[#064e3b] rounded-2xl font-bold text-[#064e3b] outline-none transition-all"
                    onChange={(e) => setVenda({...venda, produto: e.target.value})}
                  />
                </div>
              </div>

              {/* ENTRADA DE VALORES */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-1">
                  <label className="text-[9px] font-black text-emerald-700 uppercase tracking-widest block">Valor Base</label>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">R$</span>
                    <input 
                      type="number" 
                      placeholder="0,00"
                      className="bg-transparent w-full text-xl font-black text-[#064e3b] outline-none"
                      onChange={(e) => setVenda({...venda, valorBase: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-rose-50 rounded-3xl border border-rose-100 space-y-1">
                  <label className="text-[9px] font-black text-rose-700 uppercase tracking-widest block">Desconto</label>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-400 font-bold">%</span>
                    <input 
                      type="number" 
                      max="100"
                      placeholder="0"
                      className="bg-transparent w-full text-xl font-black text-rose-600 outline-none"
                      onChange={(e) => setVenda({...venda, desconto: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUNA 2: RESUMO E FECHAMENTO (40%) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white h-full flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b49157]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <div className="space-y-6 relative z-10">
                  <h3 className="text-[10px] font-black text-[#b49157] uppercase tracking-[0.3em]">Resumo Financeiro</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center opacity-60">
                      <span className="text-xs font-bold uppercase tracking-tighter">Subtotal</span>
                      <span className="font-mono">R$ {venda.valorBase.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center text-rose-400">
                      <span className="text-xs font-bold uppercase tracking-tighter text-rose-300">Desconto</span>
                      <span className="font-mono">- R$ {descontoCalculado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="h-px bg-white/10 my-4"></div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-[#b49157] uppercase tracking-[0.2em]">Total Líquido</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-[#b49157]">R$</span>
                        <span className="text-4xl font-black tracking-tighter">
                          {valorFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={venda.valorBase === 0 || !venda.produto}
                  className="w-full mt-8 py-5 bg-[#b49157] hover:bg-[#c5a368] disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 z-10 text-[10px]"
                  onClick={() => {
                    alert("Transação aprovada e registrada no fluxo de caixa!");
                    onClose();
                  }}
                >
                  Confirmar Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER AUDIT */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 flex justify-between items-center pb-10 sm:pb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Operador: {venda.vendedor}</p>
          </div>
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Analu POS Terminal v2.9</p>
        </div>
      </div>
    </div>
  );
}

export default ModalSaidaProdutoVenda;