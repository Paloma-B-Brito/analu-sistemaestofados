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
  },
  {
    id: "MOD-SLM-04",
    nome: "Sofá Slim Minimalista",
    materiais: [
      { item: "Linho Europeu", qtd: 12, vlr: 55 },
      { item: "Pés Aço Carbono", qtd: 4, vlr: 85 },
      { item: "Espuma D28", qtd: 3, vlr: 110 },
      { item: "Estrutura MDF", qtd: 0.5, vlr: 450 }
    ],
    maoDeObra: 400,
    custoFixoRateio: 120
  },
  {
    id: "MOD-CRN-05",
    nome: "Sofá Canto Nobre",
    materiais: [
      { item: "Veludo Premium", qtd: 25, vlr: 48 },
      { item: "Madeira Tratada", qtd: 1.8, vlr: 850 },
      { item: "Molas Ensacadas", qtd: 48, vlr: 18 },
      { item: "Espuma HR", qtd: 6, vlr: 165 }
    ],
    maoDeObra: 800,
    custoFixoRateio: 200
  }
];

function FinanceiroEditavel() {
  const [produtos, setProdutos] = useState(catalogoInicial);
  const [idAtivo, setIdAtivo] = useState(catalogoInicial[0].id);

  const produtoAtivo = produtos.find(p => p.id === idAtivo);

  // Função para atualizar valores genéricos (Mão de Obra ou Fixo)
  const handleUpdateGeral = (campo, valor) => {
    const novosProdutos = produtos.map(p => 
      p.id === idAtivo ? { ...p, [campo]: parseFloat(valor) || 0 } : p
    );
    setProdutos(novosProdutos);
  };

  // Função para atualizar valores específicos dos materiais
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
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in font-sans">
      
      <div className="bg-[#064e3b] p-8 text-white flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Advanced Financial Control</p>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Ajuste de Custos Industriais</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
          <p className="text-[9px] font-bold uppercase opacity-60">Custo Total Atualizado</p>
          <p className="text-3xl font-black text-[#b49157]">R$ {custoFinalProducao.toLocaleString()}</p>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* MENU LATERAL SELEÇÃO */}
        <div className="lg:col-span-1 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Selecione o Item</label>
          {produtos.map(p => (
            <button 
              key={p.id}
              onClick={() => setIdAtivo(p.id)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${idAtivo === p.id ? 'border-[#064e3b] bg-emerald-50' : 'border-slate-50 hover:bg-slate-50'}`}
            >
              <p className="text-[10px] font-black text-[#b49157]">{p.id}</p>
              <p className="text-sm font-black text-[#064e3b] uppercase leading-none">{p.nome}</p>
            </button>
          ))}
        </div>

        {/* ÁREA DE EDIÇÃO DINÂMICA */}
        <div className="lg:col-span-3 space-y-6">
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-black text-[#064e3b] uppercase mb-6 border-b pb-2">1. Materiais (Custo Unitário x Quantidade)</h3>
            <div className="grid grid-cols-1 gap-3">
              {produtoAtivo.materiais.map((m, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 items-center bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-700">{m.item}</span>
                  <div className="flex flex-col">
                    <label className="text-[8px] font-black uppercase text-slate-400">Qtd.</label>
                    <input 
                      type="number" 
                      value={m.qtd} 
                      onChange={(e) => handleUpdateMaterial(index, 'qtd', e.target.value)}
                      className="text-xs font-black border-none focus:ring-0 p-0"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[8px] font-black uppercase text-slate-400">Vlr. Unit (R$)</label>
                    <input 
                      type="number" 
                      value={m.vlr} 
                      onChange={(e) => handleUpdateMaterial(index, 'vlr', e.target.value)}
                      className="text-xs font-black border-none focus:ring-0 p-0"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-slate-400">Subtotal</p>
                    <p className="text-xs font-black text-[#064e3b]">R$ {(m.qtd * m.vlr).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EDIÇÃO DE MÃO DE OBRA */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-black text-[#064e3b] uppercase mb-4">2. Mão de Obra</h3>
              <p className="text-[10px] text-slate-500 mb-4 leading-tight">Ajuste o valor pago ao estofador/equipe por esta peça específica.</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157]">R$</span>
                <input 
                  type="number" 
                  value={produtoAtivo.maoDeObra}
                  onChange={(e) => handleUpdateGeral('maoDeObra', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b]"
                />
              </div>
            </div>

            {/* EDIÇÃO DE CUSTOS FIXOS */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-black text-[#064e3b] uppercase mb-4">3. Custos Fixos (Rateio)</h3>
              <p className="text-[10px] text-slate-500 mb-4 leading-tight">Valor proporcional de Luz, Água e Aluguel aplicado a este sofá.</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[#b49157]">R$</span>
                <input 
                  type="number" 
                  value={produtoAtivo.custoFixoRateio}
                  onChange={(e) => handleUpdateGeral('custoFixoRateio', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#064e3b] font-black text-[#064e3b]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-between items-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">* Alterações refletem imediatamente no cálculo de margem do dashboard.</p>
        <button className="bg-[#064e3b] text-white px-10 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition shadow-lg">Salvar Configurações</button>
      </div>
    </div>
  );
}

export default FinanceiroEditavel;