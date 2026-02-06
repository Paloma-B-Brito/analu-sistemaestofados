/**
 * @file ModalSaidaProdutoVenda.jsx
 * @description Terminal de Checkout (POS) com Cálculo de Margem e Tributos
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import '../../App.css';

function ModalSaidaProdutoVenda({ onClose }) {
  const [venda, setVenda] = useState({
    tipoItem: "Estofado",
    produto: "",
    valorBase: 0,
    desconto: 0,
    pagamento: "Cartão de Crédito",
    vendedor: "Ana Paula",
    obs: ""
  });

  // Cálculos Dinâmicos
  const descontoCalculado = venda.valorBase * (venda.desconto / 100);
  const valorFinal = venda.valorBase - descontoCalculado;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 font-sans">
      {/* OVERLAY EXECUTIVO COM BLUR */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/70 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[98vh]">
        
        {/* HEADER POINT OF SALE */}
        <div className="bg-[#064e3b] p-6 md:p-10 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Analu Executive POS</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Checkout de Ativo</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-rose-500 hover:rotate-90 transition-all duration-300"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">
            
            {/* FORMULÁRIO DE VENDAS (Lado Esquerdo) */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] border-b pb-3 text-left">Especificações</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Vendedor</label>
                    <select 
                      value={venda.vendedor}
                      className="w-full p-4 bg-slate-50 border-2 border-slate-50 focus:border-[#b49157] rounded-2xl font-bold text-[#064e3b] outline-none transition-all appearance-none"
                      onChange={(e) => setVenda({...venda, vendedor: e.target.value})}
                    >
                      <option>Ana Paula</option>
                      <option>Ricardo Mestre</option>
                      <option>Consultor Externo</option>
                    </select>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Meio de Recebimento</label>
                    <select 
                      className="w-full p-4 bg-slate-50 border-2 border-slate-50 focus:border-[#b49157] rounded-2xl font-bold text-[#064e3b] outline-none transition-all appearance-none"
                      onChange={(e) => setVenda({...venda, pagamento: e.target.value})}
                    >
                      <option>Cartão de Crédito</option>
                      <option>PIX (Direto Analu)</option>
                      <option>Transferência Bancária</option>
                      <option>Dinheiro em Espécie</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Produto / Serviço</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Sofá Chesterfield Couro Legítimo"
                    className="w-full p-5 bg-slate-50 border-2 border-slate-50 focus:border-[#064e3b] rounded-2xl font-bold text-[#064e3b] outline-none transition-all"
                    onChange={(e) => setVenda({...venda, produto: e.target.value})}
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-1">Observações da Venda</label>
                  <textarea 
                    rows="2"
                    placeholder="Detalhes sobre entrega ou personalização..."
                    className="w-full p-5 bg-slate-50 border-2 border-slate-50 focus:border-[#064e3b] rounded-2xl font-bold text-slate-600 outline-none transition-all resize-none"
                    onChange={(e) => setVenda({...venda, obs: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* PAINEL FINANCEIRO (Lado Direito) */}
            <div className="lg:col-span-3">
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white h-full flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                {/* Efeito Visual de Fundo */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#b49157]/10 rounded-full blur-[100px] group-hover:bg-[#b49157]/20 transition-all duration-700"></div>
                
                <div className="space-y-8 relative z-10">
                  <h3 className="text-[11px] font-black text-[#b49157] uppercase tracking-[0.4em] text-left">Resumo de Transação</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-left bg-white/5 p-4 rounded-2xl">
                       <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">Valor de Tabela</span>
                       <div className="flex items-center gap-1 font-mono">
                         <span className="text-white/40">R$</span>
                         <input 
                            type="number" 
                            className="bg-transparent w-full text-2xl font-black text-white outline-none"
                            placeholder="0,00"
                            onChange={(e) => setVenda({...venda, valorBase: parseFloat(e.target.value) || 0})}
                         />
                       </div>
                    </div>
                    <div className="text-left bg-white/5 p-4 rounded-2xl border border-white/5">
                       <span className="text-[9px] font-black text-rose-400 uppercase block mb-2">Desconto (%)</span>
                       <div className="flex items-center gap-1 font-mono">
                         <span className="text-rose-400/40">%</span>
                         <input 
                            type="number" 
                            className="bg-transparent w-full text-2xl font-black text-rose-400 outline-none"
                            placeholder="0"
                            onChange={(e) => setVenda({...venda, desconto: parseFloat(e.target.value) || 0})}
                         />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/10 text-left">
                    <div className="flex justify-between items-center opacity-50">
                      <span className="text-[10px] font-bold uppercase">Subtotal Bruto</span>
                      <span className="font-mono text-sm">R$ {venda.valorBase.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div className="flex justify-between items-center text-rose-400">
                      <span className="text-[10px] font-bold uppercase">Abatimento de Desconto</span>
                      <span className="font-mono text-sm">- R$ {descontoCalculado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    </div>
                    
                    <div className="pt-6">
                      <p className="text-[10px] font-black text-[#b49157] uppercase tracking-[0.3em] mb-2">Total Líquido a Receber</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-[#b49157]">R$</span>
                        <span className="text-6xl font-black tracking-tighter animate-pulse-subtle">
                          {valorFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={venda.valorBase === 0 || !venda.produto}
                  className="w-full mt-12 py-6 bg-[#b49157] hover:bg-[#d4ae6d] disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] transition-all shadow-[0_20px_50px_rgba(180,145,87,0.3)] active:scale-95 z-10 text-[11px]"
                  onClick={() => {
                    alert(`Venda de ${venda.produto} registrada por ${venda.vendedor}!`);
                    onClose();
                  }}
                >
                  Finalizar e Gerar Recibo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER AUDIT */}
        <div className="bg-slate-50 px-10 py-6 border-t border-slate-100 flex justify-between items-center pb-12 sm:pb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Estação POS: Showroom Principal • Logged as {venda.vendedor}</p>
          </div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">© 2026 — ANALU EXECUTIVE SUITE</p>
        </div>
      </div>
    </div>
  );
}

export default ModalSaidaProdutoVenda;