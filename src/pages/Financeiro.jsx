import { useState } from "react";
import "../App.css";

const catalogoInicial = [
  {
    id: "MOD-CH-01",
    nome: "Sofá Chesterfield 3 Lugares",
    materiais: [
      { item: "Couro Legítimo", qtd: 15, vlr: 120 },
      { item: "Madeira Eucalipto", qtd: 0.8, vlr: 850 },
      { item: "Espuma D33 Soft", qtd: 4, vlr: 150 },
      { item: "Molas e Percintas", qtd: 1, vlr: 220 }
    ],
    maoDeObra: 650,
    custoFixoRateio: 150
  },
  {
    id: "MOD-EAM-02",
    nome: "Poltrona Charles Eames",
    materiais: [
      { item: "Couro Natural", qtd: 4, vlr: 120 },
      { item: "Lâmina Pau-Ferro", qtd: 1, vlr: 750 },
      { item: "Base Alumínio", qtd: 1, vlr: 420 },
      { item: "Espuma Injetada", qtd: 2, vlr: 180 }
    ],
    maoDeObra: 450,
    custoFixoRateio: 100
  },
  {
    id: "MOD-RET-03",
    nome: "Sofá Retrátil Madri",
    materiais: [
      { item: "Tecido Suede", qtd: 18, vlr: 35 },
      { item: "Mecanismo Retrátil", qtd: 2, vlr: 280 },
      { item: "Estrutura Pinus", qtd: 1.2, vlr: 620 },
      { item: "Mola Bonnel", qtd: 24, vlr: 15 }
    ],
    maoDeObra: 550,
    custoFixoRateio: 150
  }
];

function FinanceiroEditavel() {
  const [produtos, setProdutos] = useState(catalogoInicial);
  const [idAtivo, setIdAtivo] = useState(catalogoInicial[0].id);

  const produtoAtivo = produtos.find(p => p.id === idAtivo);

  const handleUpdateGeral = (campo, valor) => {
    const novosProdutos = produtos.map(p => 
      p.id === idAtivo ? { ...p, [campo]: parseFloat(valor) || 0 } : p
    );
    setProdutos(novosProdutos);
  };

  const handleUpdateMaterial = (index, campo, valor) => {
    const novosProdutos = produtos.map(p => {
      if (p.id === idAtivo) {
        const novosMateriais = [...p.materiais];
        novosMateriais[index][campo] = parseFloat(valor) || 0;
        return { ...p, materiais: novosMateriais };
      }
      return p;
    });
    setProdutos(novosProdutos);
  };

  const totalMateriais = produtoAtivo.materiais.reduce((acc, m) => acc + (m.qtd * m.vlr), 0);
  const custoFinalProducao = totalMateriais + produtoAtivo.maoDeObra + produtoAtivo.custoFixoRateio;

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in font-sans w-full">
      
      {/* HEADER FINANCEIRO RESPONSIVO */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Advanced Financial Control</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight">Ajuste de Custos</h2>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20 w-full md:w-auto text-center md:text-right">
            <p className="text-[9px] font-bold uppercase opacity-60">Custo Final Estimado</p>
            <p className="text-2xl md:text-3xl font-black text-[#b49157]">R$ {custoFinalProducao.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SELETOR DE PRODUTOS - Scroll horizontal no mobile */}
        <div className="lg:col-span-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 text-left">Selecione o Item</label>
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {produtos.map(p => (
              <button 
                key={p.id}
                onClick={() => setIdAtivo(p.id)}
                className={`min-w-[200px] lg:min-w-full text-left p-4 rounded-xl border-2 transition-all shrink-0 ${idAtivo === p.id ? 'border-[#064e3b] bg-emerald-50' : 'border-slate-50 hover:bg-slate-50'}`}
              >
                <p className="text-[10px] font-black text-[#b49157]">{p.id}</p>
                <p className="text-sm font-black text-[#064e3b] uppercase leading-none truncate">{p.nome}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ÁREA DE EDIÇÃO */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-black text-[#064e3b] uppercase mb-6 border-b pb-2 text-left">1. Tabela de Materiais</h3>
            
            <div className="space-y-3">
              {produtoAtivo.materiais.map((m, index) => (
                <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-black text-slate-700 col-span-2 md:col-span-1 text-left">{m.item}</span>
                  
                  <div className="flex flex-col text-left">
                    <label className="text-[8px] font-black uppercase text-slate-400">Qtd.</label>
                    <input 
                      type="number" 
                      value={m.qtd} 
                      onChange={(e) => handleUpdateMaterial(index, 'qtd', e.target.value)}
                      className="text-sm font-black text-[#064e3b] border-b border-slate-100 focus:border-[#064e3b] outline-none py-1 bg-transparent"
                    />
                  </div>

                  <div className="flex flex-col text-left">
                    <label className="text-[8px] font-black uppercase text-slate-400">Vlr (R$)</label>
                    <input 
                      type="number" 
                      value={m.vlr} 
                      onChange={(e) => handleUpdateMaterial(index, 'vlr', e.target.value)}
                      className="text-sm font-black text-[#064e3b] border-b border-slate-100 focus:border-[#064e3b] outline-none py-1 bg-transparent"
                    />
                  </div>

                  <div className="text-right hidden md:block">
                    <p className="text-[8px] font-black uppercase text-slate-400">Subtotal</p>
                    <p className="text-xs font-black text-[#064e3b]">R$ {(m.qtd * m.vlr).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
              <h3 className="text-sm font-black text-[#064e3b] uppercase mb-4">2. Mão de Obra</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157]">R$</span>
                <input 
                  type="number" 
                  value={produtoAtivo.maoDeObra}
                  onChange={(e) => handleUpdateGeral('maoDeObra', e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b] bg-white outline-none"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
              <h3 className="text-sm font-black text-[#064e3b] uppercase mb-4">3. Custos Fixos</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157]">R$</span>
                <input 
                  type="number" 
                  value={produtoAtivo.custoFixoRateio}
                  onChange={(e) => handleUpdateGeral('custoFixoRateio', e.target.value)}
                  className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b] bg-white outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center md:text-left">
          * Os valores alterados impactam o markup de venda automaticamente.
        </p>
        <button className="w-full md:w-auto bg-[#064e3b] text-white px-10 py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-xl active:scale-95 transition-all">
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}

export default FinanceiroEditavel;