import { useState } from "react";
import "../App.css";

const mockEstofadosFabrica = [
  {
    id: "FAB-CH-001",
    modelo: "Sofá Chesterfield 3 Lugares",
    cliente: "Showroom Matriz",
    responsavel: "Mestre Ricardo",
    prioridade: "ALTA",
    dataInicio: "2026-01-20",
    previsao: "2026-01-30",
    status: "EM ANDAMENTO",
    progresso: 65,
    custoEstimado: "R$ 2.450,00",
    materiaisNecessarios: {
      tecido: "12.5 metros",
      espuma: "4 blocos D33",
      madeira: "0.8 m³",
      molas: "24 unidades"
    },
    detalhes: {
      estrutura: "Madeira de Eucalipto (Concluída)",
      espumacao: "D33 Soft (Concluída)",
      revestimento: "Couro Legítimo (Em Corte)",
      faltante: "Botoamento e Acabamento de Pés"
    }
  },
  {
    id: "FAB-EAM-042",
    modelo: "Poltrona Charles Eames",
    cliente: "Encomenda VIP #982",
    responsavel: "Equipe Marcenaria",
    prioridade: "NORMAL",
    dataInicio: "2026-01-25",
    previsao: "2026-01-27",
    status: "PRONTO",
    progresso: 100,
    custoEstimado: "R$ 1.890,00",
    materiaisNecessarios: {
      tecido: "3.2 metros (Couro)",
      espuma: "1 bloco D33",
      madeira: "0.2 m³ (Pau-Ferro)",
      molas: "N/A"
    },
    detalhes: {
      estrutura: "Pau-Ferro (Concluída)",
      revestimento: "Couro Preto (Concluída)",
      faltante: "Nenhum - Aguardando Expedição"
    }
  },
  {
    id: "FAB-RET-099",
    modelo: "Sofá Retrátil Madri",
    cliente: "Estoque Showroom",
    responsavel: "Mestre Carlos",
    prioridade: "CRÍTICA",
    dataInicio: "2026-01-10",
    previsao: "2026-01-25",
    status: "ATRASADO",
    progresso: 85,
    custoEstimado: "R$ 3.100,00",
    materiaisNecessarios: {
      tecido: "15.0 metros",
      espuma: "6 blocos D33",
      madeira: "1.1 m³",
      molas: "32 unidades"
    },
    detalhes: {
      estrutura: "Mecanismo Retrátil (Concluído)",
      espumacao: "D33 (Concluída)",
      revestimento: "Suede Marrom (Em Costura)",
      faltante: "Ajuste do encosto"
    }
  }
];

function EstoqueFabrica() {
  const [pedidos, setPedidos] = useState(mockEstofadosFabrica);
  const [itemDetalhado, setItemDetalhado] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case "PRONTO": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ATRASADO": return "bg-rose-50 text-rose-700 border-rose-200 animate-pulse";
      default: return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in w-full">
      
      {/* HEADER DE PRODUÇÃO - Adaptado para Mobile */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Operations Center</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Status de Fabricação</h2>
          </div>
          <div className="flex gap-4 md:gap-8 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
             <div className="flex-1 md:flex-none text-left md:text-right">
                <p className="text-[10px] font-bold opacity-60 uppercase">Em linha</p>
                <p className="text-2xl md:text-3xl font-black">12</p>
             </div>
             <div className="flex-1 md:flex-none text-left md:text-right">
                <p className="text-[10px] font-bold opacity-60 uppercase text-rose-300">Atrasados</p>
                <p className="text-2xl md:text-3xl font-black text-rose-300">01</p>
             </div>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8 grid grid-cols-1 gap-6">
        {pedidos.map((item) => (
          <div key={item.id} className="border border-gray-100 rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all bg-white">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              
              <div className="w-full lg:flex-1 text-left">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${item.prioridade === 'CRÍTICA' ? 'text-rose-600' : 'text-slate-400'}`}>
                    Prioridade {item.prioridade}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-[#064e3b] uppercase leading-tight mb-4">{item.modelo}</h3>
                
                {/* Info Grid - 2 colunas no mobile */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-left">
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Responsável</p>
                    <p className="text-[11px] font-black text-slate-700">{item.responsavel}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Custo Est.</p>
                    <p className="text-[11px] font-black text-slate-700">{item.custoEstimado}</p>
                  </div>
                  <div className="text-left col-span-2 md:col-span-1">
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Previsão Entrega</p>
                    <p className="text-[11px] font-black text-[#b49157]">{item.previsao}</p>
                  </div>
                </div>
              </div>

              {/* PROGRESSO E AÇÕES */}
              <div className="w-full lg:w-72 flex flex-col gap-5">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
                    <span>Progresso de Montagem</span>
                    <span>{item.progresso}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${item.status === 'ATRASADO' ? 'bg-rose-500' : 'bg-[#064e3b]'}`} 
                      style={{ width: `${item.progresso}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  <button 
                    onClick={() => setItemDetalhado(itemDetalhado === item.id ? null : item.id)}
                    className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-[#064e3b] text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-200 transition-all"
                  >
                    {itemDetalhado === item.id ? "Ocultar Detalhes" : "Ver Ficha Técnica"}
                  </button>
                  {item.status === "PRONTO" && (
                    <button className="w-full py-3 bg-[#b49157] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-95">
                      Enviar p/ Loja
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* FICHA TÉCNICA EXPANSÍVEL - Mobile Friendly */}
            {itemDetalhado === item.id && (
              <div className="mt-6 pt-6 border-t border-dashed border-gray-200 animate-fade-in text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* CONSUMO */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest block mb-3 border-b border-slate-200 pb-1">Consumo de Insumos</label>
                    <div className="space-y-1.5">
                      {Object.entries(item.materiaisNecessarios).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-[10px]">
                          <span className="font-bold text-slate-400 uppercase">{key}:</span>
                          <span className="font-black text-slate-700">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ESTRUTURA */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <label className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">Estrutura</label>
                    <p className="text-[11px] font-bold text-slate-600 mt-1">{item.detalhes.structure || item.detalhes.estrutura}</p>
                  </div>

                  {/* REVESTIMENTO */}
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <label className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">Revestimento</label>
                    <p className="text-[11px] font-bold text-slate-600 mt-1">{item.detalhes.revestimento}</p>
                  </div>

                  {/* FALTANTE */}
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <label className="text-[9px] font-black text-rose-700 uppercase tracking-widest">Bloqueio / Pendência</label>
                    <p className="text-[11px] font-black text-rose-900 mt-1 uppercase leading-tight">{item.detalhes.faltante}</p>
                  </div>

                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstoqueFabrica;