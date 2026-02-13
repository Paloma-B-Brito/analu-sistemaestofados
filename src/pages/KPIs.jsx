/**
 * @file KPIs.jsx
 * @description Sala de Guerra - Indicadores Estratégicos de Performance
 * @author © 2026 Rickman Brown
 */

import React from 'react';
import { TrendingUp, TrendingDown, Target, Award, DollarSign, Activity } from 'lucide-react';

function KPIs() {
  const metas = [
    { titulo: "Faturamento Mensal", alvo: 150000, atual: 124500, unidade: "R$", cor: "bg-emerald-500" },
    { titulo: "Sofás Produzidos", alvo: 80, atual: 45, unidade: "un.", cor: "bg-blue-500" },
    { titulo: "Novos Clientes", alvo: 20, atual: 22, unidade: "leads", cor: "bg-[#b49157]" },
    { titulo: "Ticket Médio", alvo: 4500, atual: 4100, unidade: "R$", cor: "bg-rose-500" },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Cabeçalho da Página */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-[#064e3b] uppercase tracking-tighter">
            Indicadores <span className="text-[#b49157] font-light italic">Estratégicos</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Performance Global vs Metas (Fev/2026)
          </p>
        </div>
        <button className="bg-[#064e3b] text-white px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest shadow-lg hover:bg-[#08634b] transition-all">
          Exportar Relatório PDF
        </button>
      </div>

      {/* 1. CARDS DE META (Progress Bars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metas.map((meta, idx) => {
          const porcentagem = Math.min((meta.atual / meta.alvo) * 100, 100);
          const atingiu = meta.atual >= meta.alvo;

          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{meta.titulo}</p>
                  <p className={`text-2xl font-black ${atingiu ? 'text-[#b49157]' : 'text-slate-700'}`}>
                    {meta.unidade === "R$" ? `R$ ${meta.atual.toLocaleString()}` : meta.atual}
                  </p>
                </div>
                {atingiu && <Award className="text-[#b49157]" size={24} />}
              </div>
              
              {/* Barra de Progresso */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${meta.cor} transition-all duration-1000 ease-out`} 
                  style={{ width: `${porcentagem}%` }}
                ></div>
              </div>
              <p className="text-[9px] text-right mt-2 text-slate-400 font-bold">
                Meta: {meta.unidade === "R$" ? `R$ ${meta.alvo.toLocaleString()}` : meta.alvo} ({porcentagem.toFixed(0)}%)
              </p>
            </div>
          );
        })}
      </div>

      {/* 2. GRÁFICOS VISUAIS (CSS Puro) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Gráfico de Barras - Vendas por Categoria */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <Activity size={18} className="text-[#064e3b]" />
            <h3 className="font-black text-[#064e3b] uppercase tracking-wide text-sm">Mix de Produtos (Mais Vendidos)</h3>
          </div>
          
          <div className="space-y-6">
            {[
              { label: "Sofá Chesterfield", val: 85, cor: "bg-[#064e3b]" },
              { label: "Poltrona Eames", val: 60, cor: "bg-[#b49157]" },
              { label: "Sofá Retrátil Slim", val: 45, cor: "bg-slate-400" },
              { label: "Puffs Decorativos", val: 30, cor: "bg-slate-300" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-32 text-[10px] font-bold text-slate-500 uppercase text-right">{item.label}</span>
                <div className="flex-1 h-3 bg-slate-50 rounded-r-full overflow-hidden">
                  <div className={`h-full ${item.cor}`} style={{ width: `${item.val}%` }}></div>
                </div>
                <span className="text-[10px] font-black text-slate-700">{item.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card de Destaque - Lucratividade */}
        <div className="bg-[#1e293b] p-8 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-[#b49157] blur-[100px] opacity-20 rounded-full"></div>
          
          <div>
            <div className="flex items-center gap-2 text-[#b49157] mb-2">
              <TrendingUp size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Margem Líquida</span>
            </div>
            <h2 className="text-5xl font-black tracking-tighter">28.4%</h2>
            <p className="text-emerald-400 text-xs font-bold mt-2 flex items-center gap-1">
              <span className="bg-emerald-500/20 px-1 rounded">+ 2.1%</span> vs mês anterior
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-[10px] uppercase text-slate-400 tracking-widest mb-1">Custo Operacional</p>
            <p className="text-xl font-bold">R$ 42.150,00</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default KPIs;