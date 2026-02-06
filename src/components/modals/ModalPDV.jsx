/**
 * @file ModalPDV.jsx
 * @description Ponto de Venda (Retail POS) com Fluxo de Checkout em 2 Passos
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalPDV({ onClose, estoqueDisponivel = [], onFinalizarVenda }) {
  const [passo, setPasso] = useState(1);
  const [venda, setVenda] = useState({
    produtoId: "",
    clienteNome: "",
    clienteCPF: "",
    formaPagamento: "Cartão de Crédito"
  });

  const produtoSelecionado = estoqueDisponivel.find(p => p.id === venda.produtoId);

  const handleFinalizar = () => {
    if (!venda.produtoId || !venda.clienteNome) {
      return alert("Campos obrigatórios ausentes. Verifique os dados do cliente.");
    }
    onFinalizarVenda(venda);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans">
      {/* OVERLAY COM BLUR EXECUTIVO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/70 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[3rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh]">
        
        {/* HEADER PDV COM STEPPER */}
        <div className="bg-[#064e3b] p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Retail POS Terminal</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Faturamento</h2>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-1.5">
               <div className={`h-1.5 rounded-full transition-all duration-500 ${passo >= 1 ? 'w-8 bg-[#b49157]' : 'w-4 bg-white/20'}`}></div>
               <div className={`h-1.5 rounded-full transition-all duration-500 ${passo === 2 ? 'w-8 bg-[#b49157]' : 'w-4 bg-white/20'}`}></div>
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Etapa {passo} de 2</span>
          </div>
        </div>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar flex-1">
          {passo === 1 ? (
            /* PASSO 1: SELEÇÃO DE PRODUTO */
            <div className="space-y-8 animate-fade-in text-left">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Seleção de Ativo em Estoque</h3>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase border border-emerald-100">Live Inventory</span>
              </div>

              <div className="grid grid-cols-1 gap-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {estoqueDisponivel.length > 0 ? (
                  estoqueDisponivel.filter(p => p.status === "DISPONÍVEL").map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setVenda({...venda, produtoId: p.id})}
                      className={`flex justify-between items-center p-6 rounded-[2rem] border-2 transition-all duration-300 group ${
                        venda.produtoId === p.id 
                        ? 'border-[#b49157] bg-[#b49157]/5 shadow-lg' 
                        : 'border-slate-50 hover:border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-left">
                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${venda.produtoId === p.id ? 'text-[#b49157]' : 'text-slate-300'}`}>
                          {p.id}
                        </p>
                        <p className="text-base font-black text-[#064e3b] uppercase leading-tight">{p.modelo}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-[#064e3b] font-mono">
                          R$ {p.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-[9px] text-emerald-500 font-black uppercase tracking-tighter">Pronta Entrega</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-10 text-center text-slate-400 font-bold uppercase text-[11px] tracking-widest border-2 border-dashed border-slate-100 rounded-[2rem]">
                    Nenhum item disponível no momento
                  </div>
                )}
              </div>

              <button 
                disabled={!venda.produtoId}
                onClick={() => setPasso(2)}
                className="w-full py-6 bg-[#064e3b] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] disabled:opacity-20 transition-all shadow-2xl shadow-emerald-900/20 active:scale-[0.98] text-[11px]"
              >
                Prosseguir para Identificação
              </button>
            </div>
          ) : (
            /* PASSO 2: DADOS E CHECKOUT */
            <div className="space-y-8 animate-fade-in text-left">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">Detalhes do Faturamento</h3>
              
              <div className="space-y-6 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="relative">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-6 bg-slate-50 px-2">Comprador</label>
                  <input 
                    type="text" 
                    placeholder="Nome Completo do Cliente" 
                    className="w-full bg-transparent border-b-2 border-slate-200 py-5 font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all placeholder:text-slate-300"
                    onChange={(e) => setVenda({...venda, clienteNome: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-6 bg-slate-50 px-2">CPF / CNPJ</label>
                    <input 
                      type="text" 
                      placeholder="000.000.000-00" 
                      className="w-full bg-transparent border-b-2 border-slate-200 py-5 font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all" 
                    />
                  </div>
                  <div className="relative">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest absolute -top-2.5 left-6 bg-slate-50 px-2">Método</label>
                    <select 
                      className="w-full bg-transparent border-b-2 border-slate-200 py-5 font-bold text-[#064e3b] outline-none cursor-pointer focus:border-[#b49157] transition-all appearance-none"
                      onChange={(e) => setVenda({...venda, formaPagamento: e.target.value})}
                    >
                      <option>Cartão de Crédito</option>
                      <option>PIX (Analu Pay)</option>
                      <option>Boleto Premium</option>
                      <option>TED / DOC</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* RECIBO ANALU (DARK) */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b49157]/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#b49157]/20 transition-all duration-700"></div>
                
                <div className="flex justify-between items-center opacity-40 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                  <span>Manifesto de Venda</span>
                  <span>Valor Líquido</span>
                </div>
                
                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <p className="text-[10px] font-black text-[#b49157] uppercase tracking-widest mb-2">{venda.produtoId}</p>
                    <p className="text-xl font-black uppercase tracking-tight leading-none">{produtoSelecionado?.modelo}</p>
                    <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-tighter">Venda Autorizada</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#b49157] text-sm font-bold italic">R$</span>
                      <span className="text-5xl font-black text-white tracking-tighter animate-pulse-subtle">
                        {produtoSelecionado?.preco.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setPasso(1)} 
                  className="py-5 bg-slate-50 text-slate-400 font-black uppercase tracking-widest rounded-[2rem] hover:bg-slate-100 transition-all text-[11px] border border-slate-100"
                >
                  Revisar Item
                </button>
                <button 
                  onClick={handleFinalizar} 
                  className="py-5 bg-[#b49157] text-white font-black uppercase tracking-[0.3em] rounded-[2rem] shadow-xl shadow-[#b49157]/20 hover:bg-[#c5a368] transition-all active:scale-[0.96] text-[11px]"
                >
                  Concluir Venda
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER DE SEGURANÇA */}
        <div className="bg-slate-50 p-6 flex justify-center items-center gap-3 border-t border-slate-100 pb-12 sm:pb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">Secure Transaction Protocol • Analu 2026</p>
        </div>
      </div>
    </div>
  );
}

export default ModalPDV;