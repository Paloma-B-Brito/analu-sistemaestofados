/**
 * @file EstoqueFabrica.jsx
 * @description Gestão de Fluxo de Fábrica com Visão Executiva e Operacional
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState } from "react";
import "../App.css";

const mockEstofadosFabrica = [
  { id: "FAB-CH-001", modelo: "Sofá Chesterfield 3L", cliente: "Showroom", responsavel: "Mestre Ricardo", progresso: 65, status: "EM ANDAMENTO", materiais: "Couro Legítimo / Espuma D33", detalhes: "Estrutura Concluída", custoProducao: 3100.00, valorMercado: 8500.00 },
  { id: "FAB-EAM-042", modelo: "Poltrona Charles Eames", cliente: "VIP #982", responsavel: "Marcenaria", progresso: 100, status: "PRONTO", materiais: "Pau-Ferro / Couro", detalhes: "Finalizado", custoProducao: 1550.00, valorMercado: 4200.00 },
  { id: "FAB-SL-003", modelo: "Sofá Retrátil Slim", cliente: "Loja Jardins", responsavel: "Mestre Ricardo", progresso: 30, status: "EM ANDAMENTO", materiais: "Linho Europeu", detalhes: "Madeira Iniciada", custoProducao: 2200.00, valorMercado: 5800.00 },
  { id: "FAB-PUF-004", modelo: "Puff Capitonê Lux", cliente: "Showroom", responsavel: "Ana Paula", progresso: 100, status: "PRONTO", materiais: "Veludo Italiano", detalhes: "Embalagem Finalizada", custoProducao: 450.00, valorMercado: 1200.00 },
];

function EstoqueFabrica({ userRole }) {
  const [pedidos, setPedidos] = useState(mockEstofadosFabrica);
  const [historicoLoja, setHistoricoLoja] = useState([]);
  const [itemDetalhado, setItemDetalhado] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("PRODUCAO");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 6; 

  // KPIs EXCLUSIVOS ADMIN
  const totalCustoEmLinha = pedidos.reduce((acc, p) => acc + p.custoProducao, 0);
  const valorVendaEstimado = pedidos.reduce((acc, p) => acc + p.valorMercado, 0);

  const enviarParaLoja = (item) => {
    setHistoricoLoja([{ ...item, status: "ENTREGUE" }, ...historicoLoja]);
    setPedidos(pedidos.filter(p => p.id !== item.id));
  };

  const listaBase = abaAtiva === "PRODUCAO" ? pedidos : historicoLoja;
  const exibidos = listaBase.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);
  const totalPaginas = Math.ceil(listaBase.length / itensPorPagina);

  return (
    <div className="w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 flex flex-col overflow-hidden font-sans">
      
      {/* HEADER DINÂMICO */}
      <header className={`px-8 py-6 text-white flex justify-between items-center shrink-0 transition-colors ${userRole === 'ADMIN' ? 'bg-[#1e293b]' : 'bg-[#064e3b]'}`}>
        <div className="text-left">
          <p className="text-[#b49157] text-[9px] font-black uppercase tracking-[0.5em] mb-1">
            {userRole === 'ADMIN' ? 'Industrial Governance' : 'Production Control'}
          </p>
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            {userRole === 'ADMIN' ? 'Gestão de Produção' : 'Fluxo de Fábrica'}
          </h2>
        </div>
        
        <div className="flex gap-4 items-center">
            <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/5">
                {["PRODUCAO", "HISTORICO"].map(aba => (
                    <button 
                    key={aba}
                    onClick={() => { setAbaAtiva(aba); setPagina(1); }}
                    className={`px-6 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${abaAtiva === aba ? "bg-[#b49157] text-white" : "opacity-40"}`}
                    >
                    {aba === "PRODUCAO" ? "Em Linha" : "Saídas"}
                    </button>
                ))}
            </div>
        </div>
      </header>

      {/* PAINEL DE KPI - APENAS ADMIN */}
      {userRole === 'ADMIN' && (
        <div className="bg-slate-50 border-b px-8 py-4 flex gap-8 animate-slide-down">
            <div>
                <p className="text-[8px] font-black text-slate-400 uppercase">Investimento em Produção (Custo)</p>
                <p className="text-lg font-black text-slate-700">R$ {totalCustoEmLinha.toLocaleString()}</p>
            </div>
            <div className="border-l pl-8">
                <p className="text-[8px] font-black text-slate-400 uppercase">Valor de Mercado (Previsão)</p>
                <p className="text-lg font-black text-emerald-600">R$ {valorVendaEstimado.toLocaleString()}</p>
            </div>
            <div className="border-l pl-8">
                <p className="text-[8px] font-black text-slate-400 uppercase">Peças em Fabricação</p>
                <p className="text-lg font-black text-[#b49157]">{pedidos.length}</p>
            </div>
        </div>
      )}

      {/* LISTAGEM */}
      <main className="p-5 space-y-3 bg-[#fcfcf9]">
        {exibidos.map((item) => (
          <div key={item.id} className={`group border rounded-[1.5rem] p-4 bg-white transition-all ${item.status === "PRONTO" ? "border-emerald-100 shadow-sm" : "border-slate-100"}`}>
            <div className="flex items-center justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase ${item.status === "PRONTO" ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-700"}`}>
                    {item.status}
                  </span>
                  <span className="text-[9px] font-bold text-slate-300">#{item.id}</span>
                </div>
                <h3 className="text-base font-black text-[#064e3b] uppercase leading-none">{item.modelo}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.responsavel} • <span className="text-[#b49157]">{item.cliente}</span></p>
              </div>

              {/* PROGRESSO */}
              <div className="hidden lg:block w-48">
                <div className="flex justify-between mb-1">
                  <span className="text-[8px] font-black text-slate-400 uppercase">Status de Produção</span>
                  <span className="text-[11px] font-black text-[#064e3b]">{item.progresso}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${item.status === "PRONTO" ? 'bg-emerald-500' : 'bg-[#064e3b]'}`} style={{ width: `${item.progresso}%` }}></div>
                </div>
              </div>

              {/* FINANCEIRO PEÇA - APENAS ADMIN */}
              {userRole === 'ADMIN' && (
                <div className="text-right border-l pl-6 hidden md:block">
                  <p className="text-[8px] font-black text-slate-400 uppercase">Custo Unit.</p>
                  <p className="text-sm font-black text-slate-700">R$ {item.custoProducao.toLocaleString()}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setItemDetalhado(itemDetalhado === item.id ? null : item.id)} className="px-5 py-2.5 bg-slate-50 text-slate-600 text-[9px] font-black uppercase rounded-xl border border-slate-200">
                  Ficha
                </button>
                {/* BOTÃO LIBERAR SÓ PARA FÁBRICA OU ADMIN */}
                {item.status === "PRONTO" && abaAtiva === "PRODUCAO" && (
                  <button onClick={() => enviarParaLoja(item)} className="px-6 py-2.5 bg-[#b49157] text-white text-[9px] font-black uppercase rounded-xl shadow-lg">
                    Liberar Saída
                  </button>
                )}
              </div>
            </div>

            {itemDetalhado === item.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Composição</p>
                  <p className="text-[11px] font-bold text-slate-600 uppercase">{item.materiais}</p>
                </div>
                <div className="space-y-1 border-l pl-6">
                  <p className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">Diário</p>
                  <p className="text-[11px] font-bold text-slate-600 uppercase">{item.detalhes}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      <footer className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-[10px] font-black text-slate-300 uppercase">Página {pagina} de {totalPaginas}</span>
        <div className="flex gap-2">
            <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white disabled:opacity-20">←</button>
            <button disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white disabled:opacity-20">→</button>
        </div>
      </footer>
    </div>
  );
}

export default EstoqueFabrica;