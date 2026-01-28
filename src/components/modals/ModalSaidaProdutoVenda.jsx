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
  const valorFinal = venda.valorBase - (venda.valorBase * (venda.desconto / 100));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY SUAVE */}
      <div className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-sm" onClick={onClose}></div>

      {/* CONTEÚDO DO MODAL */}
      <div className="relative bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-2xl overflow-hidden animate-fade-in border border-emerald-100">
        
        {/* CABEÇALHO EXECUTIVO */}
        <div className="bg-[#064e3b] p-6 text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Point of Sale (POS)</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Registrar Nova Venda</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">✕</button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SEÇÃO 1: DADOS DO PRODUTO */}
          <div className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Categoria do Item</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none"
                onChange={(e) => setVenda({...venda, tipoItem: e.target.value})}
              >
                <option>Estofado</option>
                <option>Decoração / Acessório</option>
                <option>Mobiliário Complementar</option>
                <option>Serviço (Impermeabilização)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Descrição do Produto</label>
              <input 
                type="text" 
                placeholder="Ex: Almofada Velvet Gold"
                className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-[#064e3b] focus:ring-2 focus:ring-[#064e3b]/20 outline-none shadow-inner"
                onChange={(e) => setVenda({...venda, produto: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Valor Base (R$)</label>
                <input 
                  type="number" 
                  placeholder="0,00"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-[#064e3b] outline-none"
                  onChange={(e) => setVenda({...venda, valorBase: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Desconto (%)</label>
                <input 
                  type="number" 
                  max="100"
                  placeholder="0"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl font-black text-rose-600 outline-none"
                  onChange={(e) => setVenda({...venda, desconto: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: FECHAMENTO FINANCEIRO */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Método de Pagamento</label>
                <select className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-[#064e3b] outline-none">
                  <option>Cartão de Crédito</option>
                  <option>Cartão de Débito</option>
                  <option>PIX (Analu Oficial)</option>
                  <option>Dinheiro (Espécie)</option>
                  <option>Boleto Bancário</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-[9px] font-black text-slate-400 uppercase">Resumo da Transação</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs font-bold text-slate-500 font-mono">SUBTOTAL:</span>
                  <span className="text-xs font-bold text-slate-700">R$ {venda.valorBase.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs font-bold text-rose-400 font-mono">DESCONTO:</span>
                  <span className="text-xs font-bold text-rose-500">- R$ {(venda.valorBase * (venda.desconto / 100)).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest mb-1">Total a Receber</p>
              <p className="text-4xl font-black text-[#064e3b] leading-none">R$ {valorFinal.toLocaleString()}</p>
              <button 
                className="w-full mt-6 py-4 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all"
                onClick={() => {
                  alert("Venda Processada com Sucesso!");
                  onClose();
                }}
              >
                Concluir Venda
              </button>
            </div>
          </div>
        </div>

        {/* RODAPÉ AUDITÁVEL */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <span>Vendedor: {venda.vendedor}</span>
          <span>Data: {new Date().toLocaleDateString()}</span>
        </div>

      </div>
    </div>
  );
}

export default ModalSaidaProdutoVenda;