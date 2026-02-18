/**
 * @file Engenharia.jsx
 * @description Otimização de Corte, Ficha Técnica e Reaproveitamento de Sobras
 * @author © 2026 Minister Noiret • Software Architecture
 */

import React, { useState } from 'react';
import { 
  Ruler, Scissors, Calculator, Layers, 
  Save, AlertTriangle, CheckCircle, Package, ArrowRight 
} from 'lucide-react';

const modelosIniciais = [
  { 
    id: 1, 
    nome: "Sofá Retrátil 3 Lugares", 
    materiais: [
      { tipo: "Espuma D33", consumo: 1.2, unidade: "chapa", medidas: "2.20m x 1.80m" }, 
      { tipo: "Tecido Suede", consumo: 12, unidade: "metros" },
      { tipo: "Madeira Pinus", consumo: 15, unidade: "barras" }
    ]
  },
  { 
    id: 2, 
    nome: "Poltrona Eames", 
    materiais: [
      { tipo: "Espuma D33", consumo: 0.3, unidade: "chapa", medidas: "Assento e Encosto" }, 
      { tipo: "Tecido Couro", consumo: 3.5, unidade: "metros" },
      { tipo: "Madeira Eucalipto", consumo: 4, unidade: "barras" }
    ]
  },
  { 
    id: 3, 
    nome: "Puff Decorativo", 
    materiais: [
      { tipo: "Espuma D33", consumo: 0.1, unidade: "chapa", medidas: "40x40cm" }, 
      { tipo: "Tecido Suede", consumo: 1.5, unidade: "metros" },
      { tipo: "Madeira Pinus", consumo: 0, unidade: "barras" } 
    ]
  }
];

const estoqueBruto = {
  espuma: { nome: "Chapa Espuma D33 (2x1.5m)", qtd: 50 },
  tecido: { nome: "Rolo Tecido Suede", qtd: 200 }, 
};

function Engenharia() {
  const [producao, setProducao] = useState({ modelo: "", quantidade: 0 });
  const [resultado, setResultado] = useState(null);

  const calcularOtimizacao = () => {
    if (!producao.modelo || producao.quantidade <= 0) return;

    const modeloSelecionado = modelosIniciais.find(m => m.id === parseInt(producao.modelo));
    const qtdProduzir = parseInt(producao.quantidade);

    // 1. Calcular Consumo Total de Espuma
    const consumoEspumaPorUnidade = modeloSelecionado.materiais.find(m => m.tipo.includes("Espuma"))?.consumo || 0;
    const totalEspumaNecessaria = consumoEspumaPorUnidade * qtdProduzir;

    // 2. Calcular Chapas Inteiras e Sobras
    const chapasInteiras = Math.ceil(totalEspumaNecessaria);
    const sobraReal = chapasInteiras - totalEspumaNecessaria; // Quanto sobrou da última chapa (0.0 a 0.99)
    
    // 3. Sugestão de Reaproveitamento (Sobras)
    let sugestaoSobra = [];
    if (sobraReal > 0.05) { // Se sobrar mais que 5%
      // Verifica quantos Puffs dá pra fazer com a sobra
      const consumoPuff = modelosIniciais.find(m => m.nome.includes("Puff")).materiais[0].consumo;
      const qtdPuffsPossiveis = Math.floor(sobraReal / consumoPuff);
      
      if (qtdPuffsPossiveis > 0) {
        sugestaoSobra.push({
          produto: "Puff Decorativo",
          qtd: qtdPuffsPossiveis,
          obs: "Utiliza retalhos da última chapa sem custo extra de espuma!"
        });
      }
    }

    setResultado({
      modelo: modeloSelecionado.nome,
      qtd: qtdProduzir,
      materiais: [
        { 
          nome: "Chapas de Espuma D33", 
          total: chapasInteiras, 
          detalhe: `(${totalEspumaNecessaria.toFixed(2)} usadas efetivamente)`,
          sobra: (sobraReal * 100).toFixed(1) + "% da última chapa"
        },
        {
          nome: "Tecido",
          total: (modeloSelecionado.materiais.find(m => m.tipo.includes("Tecido")).consumo * qtdProduzir).toFixed(1) + " metros"
        }
      ],
      sugestoes: sugestaoSobra
    });
  };

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-[#064e3b] uppercase tracking-tighter flex items-center gap-2">
            <Ruler className="text-[#b49157]" /> 
            Engenharia <span className="text-slate-300">|</span> Otimização
          </h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
            Cálculo de Corte e Reaproveitamento de Material
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg">
          <h3 className="font-black text-[#064e3b] uppercase flex items-center gap-2 mb-6">
            <Calculator size={18} /> Simulador de Corte
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">O que vamos produzir?</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#b49157]"
                onChange={(e) => setProducao({...producao, modelo: e.target.value})}
              >
                <option value="">Selecione um Modelo...</option>
                {modelosIniciais.map(m => (
                  <option key={m.id} value={m.id}>{m.nome}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Quantidade Desejada</label>
              <input 
                type="number" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:border-[#b49157]"
                placeholder="Ex: 10"
                onChange={(e) => setProducao({...producao, quantidade: e.target.value})}
              />
            </div>

            <button 
              onClick={calcularOtimizacao}
              className="w-full py-4 bg-[#064e3b] hover:bg-[#08634b] text-white font-black uppercase text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Scissors size={18} /> Calcular Melhor Aproveitamento
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {resultado ? (
            <>
              <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 bg-[#b49157] opacity-10 rounded-bl-full"></div>
                
                <h3 className="font-black uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                  <Layers size={16} className="text-[#b49157]" /> Planejamento de Corte
                </h3>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-sm font-bold text-slate-300">Produção Alvo</span>
                    <span className="text-lg font-black text-white">{resultado.qtd}x {resultado.modelo}</span>
                  </div>
                  
                  {resultado.materiais.map((mat, idx) => (
                    <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300">{mat.nome}</span>
                        <span className="text-xl font-black text-[#b49157]">{mat.total}</span>
                      </div>
                      {mat.sobra && (
                        <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                          <CheckCircle size={10} /> Sobra estimada: {mat.sobra}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {resultado.sugestoes.length > 0 ? (
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl animate-fade-in-up">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                      <Package size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-emerald-800 uppercase text-sm">Oportunidade de Lucro (Sobras)</h4>
                      <p className="text-xs text-emerald-700 mt-1 mb-3">
                        Com os retalhos gerados deste corte, o sistema sugere produzir <strong>sem custo extra de espuma:</strong>
                      </p>
                      
                      {resultado.sugestoes.map((sug, i) => (
                        <div key={i} className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm flex items-center justify-between">
                          <div>
                            <span className="block font-black text-emerald-800 uppercase text-xs">{sug.produto}</span>
                            <span className="text-[10px] text-emerald-600">{sug.obs}</span>
                          </div>
                          <div className="text-2xl font-black text-emerald-600">+{sug.qtd}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center gap-3">
                   <CheckCircle className="text-blue-500" />
                   <div>
                     <p className="font-black text-blue-700 uppercase text-xs">Corte Perfeito</p>
                     <p className="text-[10px] text-blue-600">Aproveitamento máximo (95%+). Não haverá sobras significativas para reaproveitamento.</p>
                   </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 rounded-2xl p-10">
              <Calculator size={48} className="mb-4 opacity-20" />
              <p className="font-bold uppercase text-xs">Configure a produção ao lado para ver a mágica</p>
            </div>
          )}
        </div>

      </div>
      <div className="mt-10">
        <h3 className="font-black text-[#064e3b] uppercase flex items-center gap-2 mb-6 border-b border-slate-100 pb-2">
          <Layers size={18} /> Fichas Técnicas Cadastradas
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modelosIniciais.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-black text-slate-700 uppercase text-sm">{item.nome}</h4>
                <button className="text-[10px] font-bold text-[#b49157] uppercase hover:underline">Editar</button>
              </div>
              <ul className="space-y-2">
                {item.materiais.map((mat, idx) => (
                  <li key={idx} className="text-xs text-slate-500 flex justify-between border-b border-slate-50 pb-1 last:border-0">
                    <span>{mat.tipo}</span>
                    <span className="font-bold text-slate-700">{mat.consumo} {mat.unidade}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-50">
                 <button className="w-full py-2 bg-slate-50 text-slate-400 font-bold uppercase text-[10px] rounded-lg group-hover:bg-[#064e3b] group-hover:text-white transition-colors">
                   Ver Desenho de Corte
                 </button>
              </div>
            </div>
          ))}
          
          <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-300 hover:border-[#b49157] hover:text-[#b49157] transition-all group">
            <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#b49157]/10 flex items-center justify-center mb-2 transition-colors">
              <span className="text-xl font-light">+</span>
            </div>
            <span className="font-bold uppercase text-xs">Nova Ficha Técnica</span>
          </button>
        </div>
      </div>

    </div>
  );
}

export default Engenharia;