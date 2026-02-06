/**
 * @file AreaLoja.jsx
 * @description Gestão de Mostruário e Operações de Venda
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../App.css";
import ModalPDV from "../components/modals/ModalPDV";

const mockEstoqueLoja = [
  { id: "LJ-CH-001", modelo: "Sofá Chesterfield 3 Lugares", acabamento: "Couro Legítimo", preco: 8500.00, status: "DISPONÍVEL" },
  { id: "COS-SK-022", modelo: "Kit Skin Care Advanced", acabamento: "Sérum + Hidratante", preco: 249.90, status: "DISPONÍVEL" },
  { id: "LJ-EAM-042", modelo: "Poltrona Charles Eames", acabamento: "Pau-Ferro / Preto", preco: 4200.00, status: "VENDIDO" },
];

function AreaLoja() {
  const [abaAtiva, setAbaAtiva] = useState("estoque");
  const [produtos, setProdutos] = useState(mockEstoqueLoja);
  const [pdvAberto, setPdvAberto] = useState(false);
  
  // Estados para edição de preço
  const [editandoId, setEditandoId] = useState(null);
  const [novoPreco, setNovoPreco] = useState("");

  const finalizarVendaPDV = (dadosVenda) => {
    setProdutos(produtos.map(p => 
      p.id === dadosVenda.produtoId ? { ...p, status: "VENDIDO" } : p
    ));
    alert("Venda registrada com sucesso!");
  };

  // Função para salvar a alteração do preço
  const salvarPreco = (id) => {
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, preco: parseFloat(novoPreco) } : p
    ));
    setEditandoId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in mx-auto w-full">

      {/* HEADER DA LOJA - TRADUZIDO */}
      <div className="bg-[#064e3b] p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            {/* Termo alterado de Retail Operations para Operações Comerciais */}
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Operações Comerciais</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Gestão de Vendas</h2>
          </div>
          
          <div className="flex gap-2 bg-black/10 p-1 rounded-lg shrink-0">
            <button onClick={() => setAbaAtiva("estoque")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-md transition ${abaAtiva === 'estoque' ? 'bg-[#b49157] text-white' : 'text-white/60 hover:text-white'}`}>Estoque</button>
            <button onClick={() => setAbaAtiva("vendas")} className={`px-4 py-2 text-[10px] font-black uppercase rounded-md transition ${abaAtiva === 'vendas' ? 'bg-[#b49157] text-white' : 'text-white/60 hover:text-white'}`}>Histórico</button>
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        {abaAtiva === "estoque" && (
          <div className="animate-fade-in text-left">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-[#064e3b] uppercase">Produtos em Exposição</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Clique no valor para atualizar</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {produtos.map(p => (
                <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 rounded-xl hover:border-[#b49157] transition bg-white gap-4">
                  <div className="text-left flex-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{p.id}</span>
                    <p className="text-base font-black text-[#064e3b] uppercase leading-tight">{p.modelo}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{p.acabamento}</p>
                  </div>

                  {/* ÁREA DE PREÇO EDITÁVEL */}
                  <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end gap-2">
                    {editandoId === p.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          className="w-24 border-2 border-[#b49157] rounded px-2 py-1 text-sm font-black text-slate-700 outline-none"
                          value={novoPreco}
                          onChange={(e) => setNovoPreco(e.target.value)}
                          autoFocus
                        />
                        <button 
                          onClick={() => salvarPreco(p.id)}
                          className="bg-emerald-600 text-white p-1 rounded hover:bg-emerald-700"
                        >
                          ✓
                        </button>
                      </div>
                    ) : (
                      <div 
                        className="group flex items-center gap-2 cursor-pointer"
                        onClick={() => { setEditandoId(p.id); setNovoPreco(p.preco); }}
                      >
                        <p className="text-lg font-black text-slate-700 leading-none group-hover:text-[#b49157]">
                          R$ {p.preco.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                        </p>
                        <span className="text-slate-300 group-hover:text-[#b49157] text-[10px]">✎</span>
                      </div>
                    )}
                    
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded border uppercase ${p.status === 'DISPONÍVEL' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {abaAtiva === "vendas" && (
          <div className="animate-fade-in space-y-4">
             <p className="text-xs text-slate-500 italic">Módulo de monitoramento de vendas ativo.</p>
          </div>
        )}
      </div>

      {/* RODAPÉ DISCRETO COM ASSINATURA */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">© 2026 — RICKMAN</p>
        <span className="text-[8px] font-black text-slate-300 uppercase">Sistema Casa Bella v1.0</span>
      </div>
    </div>
  );
}

export default AreaLoja;