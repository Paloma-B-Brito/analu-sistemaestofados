import { useState } from "react";
import "../App.css";

const mockEstoqueLoja = [
  { id: "LJ-CH-001", modelo: "Sofá Chesterfield 3 Lugares", acabamento: "Couro Legítimo", preco: 8500.00, status: "DISPONÍVEL", entrada: "2026-01-15" },
  { id: "LJ-EAM-042", modelo: "Poltrona Charles Eames", acabamento: "Pau-Ferro / Preto", preco: 4200.00, status: "VENDIDO", entrada: "2026-01-20" },
];

function AreaLoja() {
  const [abaAtiva, setAbaAtiva] = useState("estoque");
  const [produtos, setProdutos] = useState(mockEstoqueLoja);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
      
      {/* HEADER DA LOJA */}
      <div className="bg-[#064e3b] p-8 text-white">
        <div className="flex justify-between items-end">
          <div>
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
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-black text-[#064e3b] uppercase">Produtos em Exposição</h3>
               <button className="bg-[#064e3b] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">+ Novo Cadastro</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {produtos.map(p => (
                <div key={p.id} className="flex justify-between items-center p-5 border border-slate-100 rounded-2xl hover:border-[#b49157] transition shadow-sm bg-white">
                  <div>
                    <span className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">{p.id}</span>
                    <p className="text-lg font-black text-[#064e3b] uppercase">{p.modelo}</p>
                    <p className="text-xs font-bold text-slate-400">Acabamento: {p.acabamento}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-700">R$ {p.preco.toLocaleString()}</p>
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${p.status === 'DISPONÍVEL' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. REGISTRO DE VENDAS */}
        {abaAtiva === "vendas" && (
          <div className="max-w-xl mx-auto py-10 animate-fade-in text-center">
            <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200">
               <span className="text-4xl mb-4 block">💰</span>
               <h3 className="text-xl font-black text-[#064e3b] uppercase mb-2">Iniciar Nova Venda</h3>
               <p className="text-sm text-slate-500 mb-6 font-medium">Selecione o produto do estoque para processar a baixa e gerar o recibo executivo.</p>
               <button className="w-full py-4 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition">Abrir PDV</button>
            </div>
          </div>
        )}

        {/* 3. CONFERÊNCIA DE ENTRADA (FÁBRICA -> LOJA) */}
        {abaAtiva === "entrada" && (
          <div className="animate-fade-in">
             <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-6">
                <p className="text-xs font-black text-amber-800 uppercase tracking-widest">Aguardando Conferência</p>
                <p className="text-sm text-amber-700 mt-1">Existem 3 produtos despachados pela fábrica que ainda não foram confirmados no showroom.</p>
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
                      <td className="py-4 font-black text-[#064e3b]">Sofá Retrátil Madri</td>
                      <td className="py-4 text-xs font-bold text-slate-500">Fábrica Analu - Lote #99</td>
                      <td className="py-4 text-right">
                         <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest">Confirmar Entrada</button>
                      </td>
                   </tr>
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AreaLoja;