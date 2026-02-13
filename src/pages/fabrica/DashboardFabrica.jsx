import React from 'react';

function DashboardFabrica() {
  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-black text-[#064e3b] uppercase">
        Painel de Controle • <span className="text-blue-500">Fábrica</span>
      </h1>
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Produção Hoje</p>
          <p className="text-3xl font-black text-blue-600">12 Unidades</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Em Montagem</p>
          <p className="text-3xl font-black text-[#b49157]">5 Sofás</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Alertas</p>
          <p className="text-3xl font-black text-rose-500">2 Insumos Baixos</p>
        </div>
      </div>
      <div className="bg-slate-50 h-64 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
        Gráfico de Eficiência da Linha de Produção
      </div>
    </div>
  );
}

export default DashboardFabrica;