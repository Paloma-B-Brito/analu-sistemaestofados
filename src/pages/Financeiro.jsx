/**
 * @file Financeiro.jsx
 * @description Gestão de Precificação e Engenharia de Custos
 * @author © 2026 — Rickman
 */

import { useState } from "react";
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

  // Lógica de Paginação do Seletor
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  const produtosExibidos = produtos.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  const produtoAtivo = produtos.find(p => p.id === idAtivo);

  // Atualização de estados numéricos
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
  const precoSugerido = custoFinal * 2.5; // Markup padrão de 2.5x

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden font-sans w-full min-h-[700px]">
      
      {/* Header Financeiro com Resumo de Custo */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Engenharia de Custos</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight">Ajuste de Precificação</h2>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex-1 text-center">
              <p className="text-[8px] font-bold uppercase opacity-50">Custo de Fab.</p>
              <p className="text-xl font-black text-white">R$ {custoFinal.toLocaleString('pt-BR')}</p>
            </div>
            <div className="bg-[#b49157]/20 p-4 rounded-2xl border border-[#b49157]/30 flex-1 text-center">
              <p className="text-[8px] font-bold uppercase text-[#b49157]">Venda Sugerida</p>
              <p className="text-xl font-black text-[#b49157]">R$ {precoSugerido.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Seletor Lateral com Paginação */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modelos</label>
            <div className="flex gap-2">
              <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)} className="text-[10px] font-black disabled:opacity-20">〈</button>
              <button disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)} className="text-[10px] font-black disabled:opacity-20">〉</button>
            </div>
          </div>
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
            {produtosExibidos.map(p => (
              <button 
                key={p.id}
                onClick={() => setIdAtivo(p.id)}
                className={`min-w-[180px] lg:min-w-full text-left p-4 rounded-xl border-2 transition-all ${idAtivo === p.id ? 'border-[#064e3b] bg-emerald-50' : 'border-slate-50 hover:bg-slate-50'}`}
              >
                <p className="text-[9px] font-black text-[#b49157]">{p.id}</p>
                <p className="text-xs font-black text-[#064e3b] uppercase truncate">{p.nome}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Editor de Custos */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-[10px] font-black text-[#064e3b] uppercase mb-6 border-b pb-2 text-left tracking-widest">I. Composição de Materiais</h3>
            <div className="space-y-3">
              {produtoAtivo.materiais.map((m, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center bg-white p-4 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-black text-slate-700 text-left uppercase">{m.item}</span>
                  <div className="flex flex-col text-left">
                    <label className="text-[8px] font-black text-slate-400 uppercase">Qtd</label>
                    <input type="number" value={m.qtd || ""} onChange={(e) => handleUpdateMaterial(index, 'qtd', e.target.value)} className="text-sm font-black text-[#064e3b] outline-none bg-transparent border-b border-slate-100 focus:border-[#b49157]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <label className="text-[8px] font-black text-slate-400 uppercase">Preço Un.</label>
                    <input type="number" value={m.vlr || ""} onChange={(e) => handleUpdateMaterial(index, 'vlr', e.target.value)} className="text-sm font-black text-[#064e3b] outline-none bg-transparent border-b border-slate-100 focus:border-[#b49157]" />
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Subtotal</p>
                    <p className="text-xs font-black text-[#064e3b]">R$ {(m.qtd * m.vlr).toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-[10px] font-black text-[#064e3b] uppercase mb-4 tracking-widest">II. Mão de Obra Direta</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157] text-sm">R$</span>
                <input type="number" value={produtoAtivo.maoDeObra || ""} onChange={(e) => handleUpdateGeral('maoDeObra', e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b] outline-none" />
              </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-[10px] font-black text-[#064e3b] uppercase mb-4 tracking-widest">III. Custos Fixos (Rateio)</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157] text-sm">R$</span>
                <input type="number" value={produtoAtivo.custoFixoRateio || ""} onChange={(e) => handleUpdateGeral('custoFixoRateio', e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b] outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer de Ação */}
      <div className="bg-slate-50 p-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Cálculos baseados em Markup Industrial de 2.5x</p>
        <button className="w-full md:w-auto bg-[#064e3b] text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-[#053d2e] transition-all">
          Gravar Nova Planilha de Custos
        </button>
      </div>
    </div>
  );
}

export default FinanceiroEditavel;