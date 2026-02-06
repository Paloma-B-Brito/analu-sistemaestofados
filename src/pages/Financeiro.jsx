/**
 * @file Financeiro.jsx
 * @description Gestão de Precificação e Engenharia de Custos - Fixed Version
 * @author © 2026 — Rickman
 */

import { useState, useEffect } from "react";
import "../App.css";

const catalogoInicial = [
  { id: "MOD-CH-01", nome: "Sofá Chesterfield 3 Lug", materiais: [{ item: "Couro Legítimo", qtd: 15, vlr: 120 }, { item: "Madeira Eucalipto", qtd: 0.8, vlr: 850 }, { item: "Espuma D33 Soft", qtd: 4, vlr: 150 }, { item: "Molas e Percintas", qtd: 1, vlr: 220 }], maoDeObra: 650, custoFixoRateio: 150 },
  { id: "MOD-EAM-02", nome: "Poltrona Charles Eames", materiais: [{ item: "Couro Natural", qtd: 4, vlr: 120 }, { item: "Lâmina Pau-Ferro", qtd: 1, vlr: 750 }, { item: "Base Alumínio", qtd: 1, vlr: 420 }, { item: "Espuma Injetada", qtd: 2, vlr: 180 }], maoDeObra: 450, custoFixoRateio: 100 },
  { id: "MOD-SL-03", nome: "Sofá Retrátil Slim", materiais: [{ item: "Linho Cinza", qtd: 12, vlr: 45 }, { item: "Madeira Pinus", qtd: 0.6, vlr: 400 }, { item: "Mecanismo Aço", qtd: 2, vlr: 350 }], maoDeObra: 500, custoFixoRateio: 120 },
  { id: "MOD-PUF-04", nome: "Puff Capitonê", materiais: [{ item: "Veludo", qtd: 3, vlr: 60 }, { item: "Espuma D28", qtd: 1.5, vlr: 90 }], maoDeObra: 150, custoFixoRateio: 40 },
  { id: "MOD-DIN-05", nome: "Cadeira Jantar Lux", materiais: [{ item: "Suede", qtd: 2, vlr: 35 }, { item: "Pés Carvalho", qtd: 4, vlr: 45 }], maoDeObra: 120, custoFixoRateio: 30 }
];

function FinanceiroEditavel() {
  const [produtos, setProdutos] = useState(catalogoInicial);
  const [idAtivo, setIdAtivo] = useState(catalogoInicial[0].id);
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 4;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  const produtosExibidos = produtos.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);
  const produtoAtivo = produtos.find(p => p.id === idAtivo);

  const handleUpdateGeral = (campo, valor) => {
    const num = valor === "" ? 0 : parseFloat(valor);
    setProdutos(produtos.map(p => p.id === idAtivo ? { ...p, [campo]: num } : p));
  };

  const handleUpdateMaterial = (index, campo, valor) => {
    const num = valor === "" ? 0 : parseFloat(valor);
    setProdutos(produtos.map(p => {
      if (p.id === idAtivo) {
        const novosMateriais = [...p.materiais];
        novosMateriais[index][campo] = num;
        return { ...p, materiais: novosMateriais };
      }
      return p;
    }));
  };

  const totalMateriais = produtoAtivo.materiais.reduce((acc, m) => acc + (m.qtd * m.vlr), 0);
  const custoFinal = totalMateriais + produtoAtivo.maoDeObra + produtoAtivo.custoFixoRateio;
  const precoSugerido = custoFinal * 2.5;

  return (
    <div className="fixed inset-0 bg-[#f8f9f5] flex flex-col overflow-hidden px-4 md:px-8 py-6 animate-fade-in font-sans">
      
      {/* Container Principal Estilo Card Fixo */}
      <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Header Financeiro (Fixo no topo do card) */}
        <div className="bg-[#064e3b] p-6 text-white shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left w-full md:w-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Engenharia de Custos</p>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight">Ajuste de Precificação</h2>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex-1 text-center min-w-[120px]">
                <p className="text-[8px] font-bold uppercase opacity-50">Custo de Fab.</p>
                <p className="text-lg font-black text-white">R$ {custoFinal.toLocaleString('pt-BR')}</p>
              </div>
              <div className="bg-[#b49157]/20 p-3 rounded-xl border border-[#b49157]/30 flex-1 text-center min-w-[120px]">
                <p className="text-[8px] font-bold uppercase text-[#b49157]">Venda Sugerida</p>
                <p className="text-lg font-black text-[#b49157]">R$ {precoSugerido.toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-4">
          
          {/* Seletor Lateral */}
          <div className="lg:col-span-1 border-r border-slate-100 p-6 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modelos</label>
              <div className="flex gap-2">
                <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)} className="text-[10px] font-black disabled:opacity-20 hover:text-[#064e3b]">〈</button>
                <button disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)} className="text-[10px] font-black disabled:opacity-20 hover:text-[#064e3b]">〉</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {produtosExibidos.map(p => (
                <button 
                  key={p.id}
                  onClick={() => setIdAtivo(p.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${idAtivo === p.id ? 'border-[#064e3b] bg-emerald-50' : 'border-slate-50 hover:bg-slate-50'}`}
                >
                  <p className="text-[8px] font-black text-[#b49157]">{p.id}</p>
                  <p className="text-[10px] font-black text-[#064e3b] uppercase truncate">{p.nome}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Central */}
          <div className="lg:col-span-3 p-6 overflow-y-auto custom-scrollbar bg-slate-50/30">
            <div className="max-w-4xl mx-auto space-y-6">
              
              {/* Materiais */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-[10px] font-black text-[#064e3b] uppercase mb-4 border-b pb-2 text-left tracking-widest">I. Composição de Materiais</h3>
                <div className="space-y-2">
                  {produtoAtivo.materiais.map((m, index) => (
                    <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-slate-700 text-left uppercase truncate">{m.item}</span>
                      <div className="flex flex-col text-left">
                        <label className="text-[7px] font-black text-slate-400 uppercase text-left">Qtd</label>
                        <input type="number" value={m.qtd || ""} onChange={(e) => handleUpdateMaterial(index, 'qtd', e.target.value)} className="text-xs font-black text-[#064e3b] outline-none bg-transparent border-b border-slate-200 focus:border-[#b49157]" />
                      </div>
                      <div className="flex flex-col text-left">
                        <label className="text-[7px] font-black text-slate-400 uppercase text-left">Preço Un.</label>
                        <input type="number" value={m.vlr || ""} onChange={(e) => handleUpdateMaterial(index, 'vlr', e.target.value)} className="text-xs font-black text-[#064e3b] outline-none bg-transparent border-b border-slate-200 focus:border-[#b49157]" />
                      </div>
                      <div className="text-right hidden md:block">
                        <p className="text-[7px] font-black text-slate-400 uppercase">Subtotal</p>
                        <p className="text-[10px] font-black text-[#064e3b]">R$ {(m.qtd * m.vlr).toLocaleString('pt-BR')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mão de Obra e Custos Fixos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-[10px] font-black text-[#064e3b] uppercase mb-3 tracking-widest">II. Mão de Obra</h3>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-[#b49157] text-xs">R$</span>
                    <input type="number" value={produtoAtivo.maoDeObra || ""} onChange={(e) => handleUpdateGeral('maoDeObra', e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b] outline-none text-sm" />
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-[10px] font-black text-[#064e3b] uppercase mb-3 tracking-widest">III. Custos Fixos</h3>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-[#b49157] text-xs">R$</span>
                    <input type="number" value={produtoAtivo.custoFixoRateio || ""} onChange={(e) => handleUpdateGeral('custoFixoRateio', e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b] outline-none text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Ações */}
        <div className="bg-white p-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Markup Industrial: 2.5x — Rickman Brown — Software Engineering</p>
          <button className="w-full md:w-auto bg-[#064e3b] text-white px-8 py-3 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg hover:brightness-110 transition-all">
            Gravar Nova Planilha
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinanceiroEditavel;