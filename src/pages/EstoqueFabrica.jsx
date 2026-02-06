/**
 * @file EstoqueFabrica.jsx
 * @description Gestão de Fluxo - Layout Equilibrado (Mais exemplos e tamanho otimizado)
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState } from "react";
import "../App.css";

const mockEstofadosFabrica = [
  { id: "FAB-CH-001", modelo: "Sofá Chesterfield 3L", cliente: "Showroom", responsavel: "Mestre Ricardo", progresso: 65, status: "EM ANDAMENTO", materiais: "Couro Legítimo / Espuma D33", detalhes: "Estrutura Concluída • Iniciando Revestimento" },
  { id: "FAB-EAM-042", modelo: "Poltrona Charles Eames", cliente: "VIP #982", responsavel: "Marcenaria", progresso: 100, status: "PRONTO", materiais: "Pau-Ferro / Couro", detalhes: "Finalizado • Aguardando Expedição" },
  { id: "FAB-SL-003", modelo: "Sofá Retrátil Slim", cliente: "Loja Jardins", responsavel: "Mestre Ricardo", progresso: 30, status: "EM ANDAMENTO", materiais: "Linho Europeu", detalhes: "Madeira Iniciada" },
  { id: "FAB-PUF-004", modelo: "Puff Capitonê Lux", cliente: "Showroom", responsavel: "Ana Paula", progresso: 100, status: "PRONTO", materiais: "Veludo Italiano", detalhes: "Embalagem Finalizada" },
  { id: "FAB-COR-005", modelo: "Sofá Corner Modular", cliente: "Projeto Arq. Bianca", responsavel: "Equipe B", progresso: 45, status: "EM ANDAMENTO", materiais: "Suede Premium", detalhes: "Corte de Tecido Finalizado" },
  { id: "FAB-POL-006", modelo: "Poltrona Costela", cliente: "Loja Matriz", responsavel: "Ana Paula", progresso: 100, status: "PRONTO", materiais: "Lona Camel", detalhes: "Pronto para Entrega" },
  { id: "FAB-LV-007", modelo: "Sofá Living 4L", cliente: "Residencial Barra", responsavel: "Mestre Ricardo", progresso: 10, status: "EM ANDAMENTO", materiais: "Sarja Off-White", detalhes: "Aguardando Madeira" }
];

function EstoqueFabrica() {
  const [pedidos, setPedidos] = useState(mockEstofadosFabrica);
  const [historicoLoja, setHistoricoLoja] = useState([]);
  const [itemDetalhado, setItemDetalhado] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("PRODUCAO");
  const [pagina, setPagina] = useState(1);
  
  // AJUSTE DE TAMANHO: 6 itens para ocupar bem a tela sem rolar demais
  const itensPorPagina = 6; 

  const enviarParaLoja = (item) => {
    setHistoricoLoja([{ ...item, status: "ENTREGUE" }, ...historicoLoja]);
    setPedidos(pedidos.filter(p => p.id !== item.id));
  };

  const listaBase = abaAtiva === "PRODUCAO" ? pedidos : historicoLoja;
  const exibidos = listaBase.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);
  const totalPaginas = Math.ceil(listaBase.length / itensPorPagina);

  return (
    <div className="w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 flex flex-col overflow-hidden font-sans">
      
      {/* HEADER EXECUTIVO */}
      <header className="bg-[#064e3b] px-8 py-6 text-white flex justify-between items-center shrink-0">
        <div className="text-left">
          <p className="text-[#b49157] text-[9px] font-black uppercase tracking-[0.5em] mb-1">Production Control</p>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Fluxo de Fábrica</h2>
        </div>
        
        <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/5 shadow-inner">
          {["PRODUCAO", "HISTORICO"].map(aba => (
            <button 
              key={aba}
              onClick={() => { setAbaAtiva(aba); setPagina(1); }}
              className={`px-6 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${abaAtiva === aba ? "bg-[#b49157] text-white shadow-lg" : "opacity-40 hover:opacity-100"}`}
            >
              {aba === "PRODUCAO" ? "Em Linha" : "Saídas"}
            </button>
          ))}
        </div>
      </header>

      {/* LISTAGEM - TAMANHO OTIMIZADO */}
      <main className="p-5 space-y-3">
        {exibidos.map((item) => (
          <div 
            key={item.id} 
            className={`group border rounded-[1.5rem] p-4 transition-all duration-300 ${
              item.status === "PRONTO" ? "bg-emerald-50/40 border-emerald-100 shadow-sm" : "bg-white border-slate-100 hover:border-[#b49157]/40 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between gap-6">
              
              {/* Identificação do Produto */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase border ${
                    item.status === "PRONTO" ? "bg-emerald-500 text-white border-emerald-600" : "bg-amber-100 text-amber-700 border-amber-200"
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-[9px] font-mono text-slate-300 tracking-widest font-bold">#{item.id}</span>
                </div>
                <h3 className="text-base font-black text-[#064e3b] uppercase truncate leading-none">{item.modelo}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{item.responsavel}</p>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <p className="text-[10px] text-[#b49157] font-black uppercase">{item.cliente}</p>
                </div>
              </div>

              {/* Monitor de Progresso */}
              <div className="hidden lg:block w-48">
                <div className="flex justify-between items-end mb-1.5 px-1">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Capacidade</span>
                  <span className="text-[11px] font-black text-[#064e3b]">{item.progresso}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                  <div 
                    className={`h-full transition-all duration-1000 ${item.status === "PRONTO" ? 'bg-emerald-500' : 'bg-[#064e3b]'}`} 
                    style={{ width: `${item.progresso}%` }}
                  ></div>
                </div>
              </div>

              {/* Bloco de Ações */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setItemDetalhado(itemDetalhado === item.id ? null : item.id)}
                  className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[9px] font-black uppercase rounded-xl border border-slate-200 transition-all active:scale-95"
                >
                  Ficha
                </button>
                {item.status === "PRONTO" && abaAtiva === "PRODUCAO" && (
                  <button 
                    onClick={() => enviarParaLoja(item)}
                    className="px-6 py-2.5 bg-[#b49157] text-white text-[9px] font-black uppercase rounded-xl shadow-lg hover:bg-[#9c7b45] transition-all active:scale-95"
                  >
                    Liberar Saída
                  </button>
                )}
              </div>
            </div>

            {/* Painel de Detalhes (Drop-down) */}
            {itemDetalhado === item.id && (
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Composição de Materiais</p>
                  <p className="text-[11px] font-bold text-slate-600 uppercase">{item.materiais}</p>
                </div>
                <div className="space-y-1 border-l pl-6">
                  <p className="text-[9px] font-black text-[#b49157] uppercase tracking-widest">Diário de Produção</p>
                  <p className="text-[11px] font-bold text-slate-600 uppercase">{item.detalhes}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* FOOTER DE CONTROLE */}
      <footer className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button 
              disabled={pagina === 1} 
              onClick={() => setPagina(p => p - 1)} 
              className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white text-slate-400 hover:text-[#b49157] disabled:opacity-20 transition-all shadow-sm"
            >
              ←
            </button>
            <button 
              disabled={pagina === totalPaginas} 
              onClick={() => setPagina(p => p + 1)} 
              className="w-8 h-8 flex items-center justify-center rounded-lg border bg-white text-slate-400 hover:text-[#b49157] disabled:opacity-20 transition-all shadow-sm"
            >
              →
            </button>
          </div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Página {pagina} de {totalPaginas}</span>
        </div>
       
      </footer>
    </div>
  );
}

export default EstoqueFabrica;