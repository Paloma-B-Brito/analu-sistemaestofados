/**
 * @file AreaLoja.jsx
 * @description Gestão de Mostruário e Operações de Venda
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../App.css";

const mockEstoqueLoja = [
  { id: "LJ-CH-001", modelo: "Sofá Chesterfield 3 Lugares", categoria: "Sofás", acabamento: "Couro Legítimo", preco: 8500.00, status: "DISPONÍVEL" },
  { id: "COS-SK-022", modelo: "Kit Skin Care Advanced", categoria: "Cosméticos", acabamento: "Sérum + Hidratante", preco: 249.90, status: "DISPONÍVEL" },
  { id: "LJ-EAM-042", modelo: "Poltrona Charles Eames", categoria: "Poltronas", acabamento: "Pau-Ferro / Preto", preco: 4200.00, status: "VENDIDO" },
  { id: "LJ-SL-003", modelo: "Sofá Retrátil Slim", categoria: "Sofás", acabamento: "Linho Cinza", preco: 5800.00, status: "DISPONÍVEL" },
];

function AreaLoja() {
  const [abaAtiva, setAbaAtiva] = useState("estoque");
  const [produtos, setProdutos] = useState(mockEstoqueLoja);
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODOS");
  
  // Estados para edição de preço
  const [editandoId, setEditandoId] = useState(null);
  const [novoPreco, setNovoPreco] = useState("");

  const salvarPreco = (id) => {
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, preco: parseFloat(novoPreco) } : p
    ));
    setEditandoId(null);
  };

  const produtosFiltrados = produtos.filter(p => 
    categoriaFiltro === "TODOS" || p.categoria === categoriaFiltro
  );

  const valorTotalEstoque = produtos
    .filter(p => p.status === "DISPONÍVEL")
    .reduce((acc, p) => acc + p.preco, 0);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden font-sans w-full max-w-5xl mx-auto">

      {/* HEADER COM SUMMARY FINANCEIRO */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Commercial Operations</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Gestão Comercial</h2>
          </div>
          
          <div className="flex flex-col items-end">
            <p className="text-[9px] font-bold uppercase opacity-60">Valor em Mostruário</p>
            <p className="text-2xl font-black text-[#b49157]">
              R$ {valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* SUB-MENU DE NAVEGAÇÃO */}
      <div className="bg-slate-50 border-b p-2 flex justify-between items-center px-6">
        <div className="flex gap-1">
          {["estoque", "vendas"].map(aba => (
            <button 
              key={aba}
              onClick={() => setAbaAtiva(aba)}
              className={`px-6 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${abaAtiva === aba ? 'bg-white shadow-sm text-[#064e3b]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {aba === "estoque" ? "Ver Vitrine" : "Histórico de Vendas"}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {abaAtiva === "estoque" && (
          <div className="space-y-6">
            {/* FILTRO DE CATEGORIAS */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {["TODOS", "Sofás", "Poltronas", "Cosméticos"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setCategoriaFiltro(cat)}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 transition-all shrink-0 ${categoriaFiltro === cat ? 'border-[#064e3b] bg-[#064e3b] text-white' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* GRID DE PRODUTOS */}
            <div className="grid grid-cols-1 gap-4">
              {produtosFiltrados.map(p => (
                <div key={p.id} className="flex flex-col md:flex-row justify-between items-center p-5 border border-slate-100 rounded-2xl hover:shadow-lg transition-all bg-white group">
                  <div className="text-left flex-1 w-full md:w-auto mb-4 md:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[8px] font-black text-[#b49157] uppercase tracking-widest">{p.id}</span>
                      <span className="text-[8px] font-bold text-slate-300 uppercase">/ {p.categoria}</span>
                    </div>
                    <p className="text-lg font-black text-[#064e3b] uppercase leading-tight group-hover:text-black transition-colors">{p.modelo}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{p.acabamento}</p>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                    {/* EDIT PREÇO */}
                    <div className="text-right">
                      {editandoId === p.id ? (
                        <div className="flex items-center gap-1">
                          <input 
                            type="number" 
                            className="w-28 border-2 border-[#b49157] rounded-lg px-2 py-1 text-sm font-black outline-none"
                            value={novoPreco}
                            onChange={(e) => setNovoPreco(e.target.value)}
                            autoFocus
                          />
                          <button onClick={() => salvarPreco(p.id)} className="bg-emerald-600 text-white p-1.5 rounded-lg text-xs">✓</button>
                        </div>
                      ) : (
                        <div 
                          className="cursor-pointer group/price"
                          onClick={() => { setEditandoId(p.id); setNovoPreco(p.preco); }}
                        >
                          <p className="text-sm font-bold text-slate-400 uppercase text-[8px] mb-1">Preço Sugerido</p>
                          <p className="text-xl font-black text-slate-800 group-hover/price:text-[#b49157]">
                            R$ {p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full border-2 ${p.status === 'DISPONÍVEL' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {p.status}
                      </span>
                      {p.status === 'DISPONÍVEL' && (
                        <button className="text-[9px] font-black text-[#064e3b] uppercase underline tracking-tighter hover:text-[#b49157]">Vender Agora</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === "vendas" && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Aguardando fechamento de caixa para relatórios</p>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center px-8">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Analu Executive Suite • © 2026 — RICKMAN</p>
        <div className="flex gap-4">
            <span className="text-[8px] font-black text-emerald-500 uppercase">● Terminal Online</span>
        </div>
      </div>
    </div>
  );
}

export default AreaLoja;