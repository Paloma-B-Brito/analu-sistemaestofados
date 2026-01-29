import { useState } from "react";
import "../App.css";

// 1. IMPORTAÇÃO DO NOVO MODAL DE PDV
import ModalPDV from "../components/modals/ModalPDV";

const mockEstoqueLoja = [
  { id: "LJ-CH-001", modelo: "Sofá Chesterfield 3 Lugares", acabamento: "Couro Legítimo", preco: 8500.00, status: "DISPONÍVEL", entrada: "2026-01-15" },
  { id: "LJ-EAM-042", modelo: "Poltrona Charles Eames", acabamento: "Pau-Ferro / Preto", preco: 4200.00, status: "VENDIDO", entrada: "2026-01-20" },
];

function AreaLoja() {
  const [abaAtiva, setAbaAtiva] = useState("estoque");
  const [produtos, setProdutos] = useState(mockEstoqueLoja);
  
  // 2. ESTADO PARA CONTROLE DO MODAL DE VENDAS
  const [pdvAberto, setPdvAberto] = useState(false);

  // Função para processar a venda vinda do Modal
  const finalizarVendaPDV = (dadosVenda) => {
    // Aqui no futuro enviará os dados para o Backend Java
    console.log("Processando venda na Analu API:", dadosVenda);
    
    // Atualiza o status do produto localmente para demonstração
    setProdutos(produtos.map(p => 
      p.id === dadosVenda.produtoId ? { ...p, status: "VENDIDO" } : p
    ));
    
    alert("Venda registrada com sucesso! O estoque foi atualizado.");
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">

      {/* HEADER DA LOJA */}
      <div className="bg-[#064e3b] p-8 text-white">
        <div className="flex justify-between items-end">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Retail Operations</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Showroom Control</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAbaAtiva("estoque")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition ${abaAtiva === 'estoque' ? 'bg-[#b49157] text-white' : 'bg-white/10 text-white/60'}`}>Estoque</button>
            <button onClick={() => setAbaAtiva("vendas")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition ${abaAtiva === 'vendas' ? 'bg-[#b49157] text-white' : 'bg-white/10 text-white/60'}`}>Vendas</button>
            <button onClick={() => setAbaAtiva("entrada")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg transition ${abaAtiva === 'entrada' ? 'bg-[#b49157] text-white' : 'bg-white/10 text-white/60'}`}>Conferência</button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* 1. CONSULTA DE ESTOQUE DA LOJA */}
        {abaAtiva === "estoque" && (
          <div className="animate-fade-in text-left">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-black text-[#064e3b] uppercase">Produtos em Exposição</h3>
               <button className="bg-[#064e3b] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">+ Novo Cadastro</button>
            </div>
            <div className="grid grid-cols-1 gap-4 text-left">
              {produtos.map(p => (
                <div key={p.id} className="flex justify-between items-center p-5 border border-slate-100 rounded-2xl hover:border-[#b49157] transition shadow-sm bg-white">
                  <div className="text-left">
                    <span className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">{p.id}</span>
                    <p className="text-lg font-black text-[#064e3b] uppercase">{p.modelo}</p>
                    <p className="text-xs font-bold text-slate-400">Acabamento: {p.acabamento}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-700">R$ {p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${p.status === 'DISPONÍVEL' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. REGISTRO DE VENDAS */}
        {abaAtiva === "vendas" && (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Médio (Período)</p>
                <p className="text-2xl font-black text-[#064e3b]">R$ 6.350,00</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-left">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Volume Filtrado</p>
                <p className="text-2xl font-black text-[#064e3b]">R$ 12.700,00</p>
              </div>
              
              {/* ACIONAMENTO DO PDV */}
              <button 
                onClick={() => setPdvAberto(true)}
                className="bg-[#064e3b] text-white p-6 rounded-2xl flex flex-col justify-center items-center group hover:bg-[#b49157] transition-all shadow-xl active:scale-95 shadow-emerald-900/10"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Operação Real-Time</span>
                <span className="text-xl font-black uppercase">Abrir Novo PDV</span>
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-6">
              <div className="text-left">
                <h3 className="text-xl font-black text-[#064e3b] uppercase">Histórico de Transações</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audit Trail & Performance</p>
              </div>

              <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex flex-col px-3 text-left">
                  <label className="text-[8px] font-black text-slate-400 uppercase mb-1">Data Início</label>
                  <input type="date" className="text-[10px] font-bold text-[#064e3b] outline-none cursor-pointer" defaultValue="2026-01-01" />
                </div>
                <div className="w-[1px] h-8 bg-slate-100"></div>
                <div className="flex flex-col px-3 text-left">
                  <label className="text-[8px] font-black text-slate-400 uppercase mb-1">Data Fim</label>
                  <input type="date" className="text-[10px] font-bold text-[#064e3b] outline-none cursor-pointer" defaultValue="2026-01-31" />
                </div>
                <button className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#b49157] transition-all">Filtrar</button>
              </div>
            </div>

            <div className="overflow-hidden border border-slate-100 rounded-3xl shadow-sm bg-white">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">
                    <th className="px-6 py-4">Data / ID</th>
                    <th className="px-6 py-4">Consultor</th>
                    <th className="px-6 py-4">Produto</th>
                    <th className="px-6 py-4">Cliente</th>
                    <th className="px-6 py-4 text-right">Valor Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-left">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-5">
                      <p className="text-xs font-black text-[#064e3b]">24 Jan, 2026</p>
                      <p className="text-[9px] font-mono text-slate-400">#VEN-04421</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-bold text-slate-600">Paloma Rodriguez</p>
                    </td>
                    <td className="px-6 py-5 uppercase text-xs font-black text-[#064e3b]">Sofá Chesterfield</td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-500 text-left">Ricardo M. Santos</td>
                    <td className="px-6 py-5 text-right font-black text-[#064e3b]">R$ 8.500,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. CONFERÊNCIA DE ENTRADA */}
        {abaAtiva === "entrada" && (
          <div className="animate-fade-in text-left">
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-6 text-left">
              <p className="text-xs font-black text-amber-800 uppercase tracking-widest">Aguardando Conferência</p>
              <p className="text-sm text-amber-700 mt-1 text-left">Produtos despachados pela fábrica sem confirmação no showroom.</p>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
                  <th className="py-4">Produto</th>
                  <th className="py-4">Origem</th>
                  <th className="py-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 font-black text-[#064e3b] text-left">Sofá Retrátil Madri</td>
                  <td className="py-4 text-xs font-bold text-slate-500 text-left">Fábrica Analu - Lote #99</td>
                  <td className="py-4 text-right">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest">Confirmar Entrada</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DO PDV */}
      {pdvAberto && (
        <ModalPDV 
          onClose={() => setPdvAberto(false)} 
          estoqueDisponivel={produtos}
          onFinalizarVenda={finalizarVendaPDV}
        />
      )}
    </div>
  );
}

export default AreaLoja;