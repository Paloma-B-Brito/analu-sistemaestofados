/**
 * @file EstoqueFabrica.jsx
 * @description Terminal de Gestão de Produção e Fluxo de Saída
 * @author © 2026 — Rickman
 */

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
    materiaisNecessarios: { tecido: "12.5m", espuma: "4 blocos", madeira: "0.8 m³", molas: "24un" },
    detalhes: { estrutura: "Madeira (Concluída)", revestimento: "Couro (Corte)", faltante: "Botoamento" }
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
    materiaisNecessarios: { tecido: "3.2m", espuma: "1 bloco", madeira: "0.2 m³", molas: "N/A" },
    detalhes: { estrutura: "Pau-Ferro (Concluída)", revestimento: "Couro (Concluída)", faltante: "Nenhum" }
  }
];

function EstoqueFabrica() {
  const [pedidos, setPedidos] = useState(mockEstofadosFabrica);
  const [historicoLoja, setHistoricoLoja] = useState([]);
  const [itemDetalhado, setItemDetalhado] = useState(null);
  const [filtro, setFiltro] = useState("TODOS");
  const [abaAtiva, setAbaAtiva] = useState("PRODUCAO");

  const enviarParaLoja = (item) => {
    const dataSaida = new Date().toLocaleDateString('pt-BR');
    setHistoricoLoja([{ ...item, dataSaida, status: "ENTREGUE NA LOJA" }, ...historicoLoja]);
    setPedidos(pedidos.filter(p => p.id !== item.id));
  };

  const pedidosFiltrados = pedidos.filter(p => {
    if (filtro === "TODOS") return true;
    if (filtro === "PRONTO") return p.status === "PRONTO";
    if (filtro === "ATRASADO") return p.status === "ATRASADO";
    if (filtro === "PRODUCAO") return p.status === "EM ANDAMENTO";
    return true;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "PRONTO": return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "ATRASADO": return "bg-rose-100 text-rose-800 border-rose-300 animate-pulse";
      case "ENTREGUE NA LOJA": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#f8f9fa] overflow-hidden">
      
      {/* HEADER AMPLO COM MARCA RICKMAN */}
      <header className="bg-[#064e3b] p-6 md:p-8 text-white shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[#b49157] text-xs font-black uppercase tracking-[0.5em] mb-2">Industrial Control</p>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Controle de Fluxo</h1>
          </div>
          
          {/* Alternância de Abas: PRODUÇÃO vs HISTÓRICO */}
          <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/10">
            <button 
              onClick={() => setAbaAtiva("PRODUCAO")}
              className={`px-8 py-3 text-xs font-black uppercase rounded-lg transition-all ${abaAtiva === "PRODUCAO" ? "bg-[#b49157] shadow-lg" : "hover:bg-white/5"}`}
            >
              Produção
            </button>
            <button 
              onClick={() => setAbaAtiva("HISTORICO")}
              className={`px-8 py-3 text-xs font-black uppercase rounded-lg transition-all ${abaAtiva === "HISTORICO" ? "bg-[#b49157] shadow-lg" : "hover:bg-white/5"}`}
            >
              Histórico Loja
            </button>
          </div>
        </div>
      </header>

      {/* FILTROS DINÂMICOS */}
      {abaAtiva === "PRODUCAO" && (
        <nav className="bg-white border-b px-8 py-4 flex gap-4 shrink-0 overflow-x-auto no-scrollbar">
          {["TODOS", "PRODUCAO", "PRONTO", "ATRASADO"].map((f) => (
            <button 
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase border-2 transition-all
                ${filtro === f ? 'bg-[#064e3b] text-white border-[#064e3b]' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
            >
              {f === "PRODUCAO" ? "Em Linha" : f}
            </button>
          ))}
        </nav>
      )}

      {/* ÁREA DE LISTAGEM */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {(abaAtiva === "PRODUCAO" ? pedidosFiltrados : historicoLoja).map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all">
              <div className="flex flex-col xl:flex-row justify-between gap-8">
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border-2 uppercase ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Serial: {item.id}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-[#064e3b] uppercase mb-6">{item.modelo}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Responsável</p>
                      <p className="text-sm font-black text-slate-700">{item.responsavel}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Destino</p>
                      <p className="text-sm font-black text-slate-700">{item.cliente}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Progresso da Obra ({item.progresso}%)</p>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className="h-full bg-[#064e3b] transition-all duration-1000" 
                          style={{ width: `${item.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AÇÕES */}
                <div className="flex flex-row xl:flex-col gap-3 shrink-0 justify-end">
                  <button 
                    onClick={() => setItemDetalhado(itemDetalhado === item.id ? null : item.id)}
                    className="flex-1 xl:w-48 py-4 bg-slate-800 text-white text-[11px] font-black uppercase rounded-xl hover:bg-slate-900 transition-all"
                  >
                    {itemDetalhado === item.id ? "Ocultar Ficha" : "Ficha Técnica"}
                  </button>
                  
                  {item.status === "PRONTO" && abaAtiva === "PRODUCAO" && (
                    <button 
                      onClick={() => enviarParaLoja(item)}
                      className="flex-1 xl:w-48 py-4 bg-[#b49157] text-white text-[11px] font-black uppercase rounded-xl shadow-lg shadow-[#b49157]/20 hover:scale-105 transition-all"
                    >
                      Liberar p/ Loja
                    </button>
                  )}
                </div>
              </div>

              {/* DETALHAMENTO DE MATERIAIS */}
              {itemDetalhado === item.id && (
                <div className="mt-8 pt-8 border-t-2 border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <p className="text-xs font-black text-[#064e3b] uppercase mb-4 border-b pb-2">Insumos Alocados</p>
                    <ul className="space-y-2">
                      {Object.entries(item.materiaisNecessarios).map(([k, v]) => (
                        <li key={k} className="flex justify-between text-xs uppercase"><span className="font-bold text-slate-400">{k}:</span> <span className="font-black text-slate-700">{v}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <p className="text-xs font-black text-[#b49157] uppercase mb-4 border-b pb-2">Engenharia</p>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed uppercase">{item.detalhes.estrutura} • {item.detalhes.revestimento}</p>
                  </div>
                  <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
                    <p className="text-xs font-black text-rose-700 uppercase mb-4 border-b border-rose-200 pb-2">Pendências Técnicas</p>
                    <p className="text-xs font-black text-rose-900 uppercase leading-relaxed">{item.detalhes.faltante}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* RODAPÉ COM ASSINATURA RICKMAN */}
      <footer className="bg-white border-t p-4 px-8 flex justify-between items-center shrink-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Analu Executive Suite • © 2026 — RICKMAN
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Production Stream Active</span>
        </div>
      </footer>
    </div>
  );
}

export default EstoqueFabrica;