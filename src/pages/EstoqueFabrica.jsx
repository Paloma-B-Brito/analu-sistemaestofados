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
      faltante: "Ajuste do mecanismo de encosto"
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
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
      
      {/* HEADER DE PRODUÇÃO */}
      <div className="bg-[#064e3b] p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Operations Center</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Status de Fabricação</h2>
          </div>
          <div className="flex gap-8">
             <div className="text-right border-r border-white/20 pr-8">
                <p className="text-[10px] font-bold opacity-60 uppercase">Em andamento</p>
                <p className="text-3xl font-black">12</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold opacity-60 uppercase text-rose-300">Atrasados</p>
                <p className="text-3xl font-black text-rose-300">01</p>
             </div>
          </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 gap-6">
        {pedidos.map((item) => (
          <div key={item.id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all bg-white relative">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                    {item.status}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${item.prioridade === 'CRÍTICA' ? 'text-rose-600' : 'text-slate-400'}`}>
                    Prioridade {item.prioridade}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#064e3b] uppercase leading-none">{item.modelo}</h3>
                
                <div className="flex gap-6 mt-4">
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Responsável</p>
                    <p className="text-xs font-black text-slate-700">{item.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Custo Produção</p>
                    <p className="text-xs font-black text-slate-700">{item.custoEstimado}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">Previsão</p>
                    <p className="text-xs font-black text-[#b49157]">{item.previsao}</p>
                  </div>
                </div>
              </div>

              {/* BARRA DE PROGRESSO */}
              <div className="w-full md:w-64 text-right">
                <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
                  <span>Conclusão</span>
                  <span>{item.progresso}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.status === 'ATRASADO' ? 'bg-rose-500' : 'bg-[#064e3b]'}`} 
                    style={{ width: `${item.progresso}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setItemDetalhado(itemDetalhado === item.id ? null : item.id)}
                  className="px-6 py-3 bg-gray-50 hover:bg-slate-200 text-[#064e3b] text-[9px] font-black uppercase tracking-widest rounded-xl transition-all border border-gray-200"
                >
                  {itemDetalhado === item.id ? "Recolher" : "Ficha Técnica"}
                </button>
                {item.status === "PRONTO" && (
                  <button className="px-6 py-3 bg-[#b49157] hover:bg-[#9c7b45] text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all">
                    Enviar p/ Loja
                  </button>
                )}
              </div>
            </div>

            {/* FICHA TÉCNICA E CONSUMO DE MATERIAIS */}
            {itemDetalhado === item.id && (
              <div className="mt-8 pt-8 border-t border-dashed border-gray-200 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* COLUNA 1: QUANTIDADE DE MATERIAIS */}
                  <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-100 shadow-sm">
                    <label className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest block mb-3 border-b border-slate-200 pb-1">Consumo de Insumos</label>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-[10px] font-bold text-slate-400">TECIDO:</span><span className="text-[10px] font-black text-slate-700">{item.materiaisNecessarios.tecido}</span></div>
                      <div className="flex justify-between"><span className="text-[10px] font-bold text-slate-400">ESPUMA:</span><span className="text-[10px] font-black text-slate-700">{item.materiaisNecessarios.espuma}</span></div>
                      <div className="flex justify-between"><span className="text-[10px] font-bold text-slate-400">MADEIRA:</span><span className="text-[10px] font-black text-slate-700">{item.materiaisNecessarios.madeira}</span></div>
                      <div className="flex justify-between"><span className="text-[10px] font-bold text-slate-400">MOLAS:</span><span className="text-[10px] font-black text-slate-700">{item.materiaisNecessarios.molas}</span></div>
                    </div>
                  </div>

                  {/* COLUNA 2: ESTRUTURA */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">Status Estrutura</label>
                    <p className="text-xs font-bold text-slate-600 mt-1">{item.detalhes.estrutura}</p>
                  </div>

                  {/* COLUNA 3: REVESTIMENTO */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <label className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">Status Revestimento</label>
                    <p className="text-xs font-bold text-slate-600 mt-1">{item.detalhes.revestimento}</p>
                  </div>

                  {/* COLUNA 4: BLOQUEIOS */}
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                    <label className="text-[9px] font-black text-rose-700 uppercase tracking-widest">Insumo Faltante</label>
                    <p className="text-xs font-black text-rose-900 mt-1 uppercase">{item.detalhes.faltante}</p>
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