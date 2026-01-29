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
    if (!venda.produtoId || !venda.clienteNome) return alert("Dados incompletos!");
    onFinalizarVenda(venda);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#064e3b]/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up border border-emerald-100">
        
        {/* HEADER EXECUTIVO */}
        <div className="bg-[#064e3b] p-6 text-white flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b49157] mb-1">Retail Point of Sale</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">Processar Nova Venda</h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black opacity-40 uppercase">Passo {passo} de 2</span>
          </div>
        </div>

        <div className="p-8">
          {passo === 1 ? (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">1. Seleção de Ativo em Estoque</h3>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto pr-2">
                {estoqueDisponivel.filter(p => p.status === "DISPONÍVEL").map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setVenda({...venda, produtoId: p.id})}
                    className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${venda.produtoId === p.id ? 'border-[#b49157] bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="text-left">
                      <p className="text-[10px] font-black text-[#b49157] uppercase">{p.id}</p>
                      <p className="text-sm font-black text-[#064e3b] uppercase">{p.modelo}</p>
                    </div>
                    <p className="font-black text-[#064e3b]">R$ {p.preco.toLocaleString()}</p>
                  </button>
                ))}
              </div>
              <button 
                disabled={!venda.produtoId}
                onClick={() => setPasso(2)}
                className="w-full py-4 bg-[#064e3b] text-white rounded-xl font-black uppercase tracking-widest disabled:opacity-30 transition-all"
              >
                Próximo: Dados do Cliente
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">2. Identificação e Pagamento</h3>
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Nome Completo do Cliente" 
                  className="w-full border-b-2 border-slate-100 py-3 font-bold text-[#064e3b] outline-none focus:border-[#064e3b]"
                  onChange={(e) => setVenda({...venda, clienteNome: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="CPF / CNPJ" className="w-full border-b-2 border-slate-100 py-3 font-bold text-[#064e3b] outline-none" />
                  <select 
                    className="w-full border-b-2 border-slate-100 py-3 font-bold text-[#064e3b] outline-none"
                    onChange={(e) => setVenda({...venda, formaPagamento: e.target.value})}
                  >
                    <option>Cartão de Crédito</option>
                    <option>PIX</option>
                    <option>Boleto Bancário</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl text-white">
                <div className="flex justify-between items-center opacity-60 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span>Resumo do Pedido</span>
                  <span>Total a Pagar</span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-xs font-bold uppercase">{produtoSelecionado?.modelo}</p>
                  <p className="text-2xl font-black text-[#b49157]">R$ {produtoSelecionado?.preco.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setPasso(1)} className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest rounded-xl">Voltar</button>
                <button onClick={handleFinalizar} className="flex-[2] py-4 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-emerald-700">Finalizar Venda</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalPDV;