/**
 * @file EstoqueFabrica.jsx
 * @description Terminal de Gestão de Produção e Fluxo de Saída
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState } from "react";
import "../App.css";

const mockEstofadosFabrica = [
  { id: "FAB-CH-001", modelo: "Sofá Chesterfield 3 Lugares", cliente: "Showroom Matriz", responsavel: "Mestre Ricardo", prioridade: "ALTA", dataInicio: "2026-01-20", previsao: "2026-01-30", status: "EM ANDAMENTO", progresso: 65, materiaisNecessarios: { tecido: "12.5m", espuma: "4 blocos", madeira: "0.8 m³", molas: "24un" }, detalhes: { estrutura: "Madeira (Concluída)", revestimento: "Couro (Corte)", faltante: "Botoamento" } },
  { id: "FAB-EAM-042", modelo: "Poltrona Charles Eames", cliente: "Encomenda VIP #982", responsavel: "Equipe Marcenaria", prioridade: "NORMAL", dataInicio: "2026-01-25", previsao: "2026-01-27", status: "PRONTO", progresso: 100, materiaisNecessarios: { tecido: "3.2m", espuma: "1 bloco", madeira: "0.2 m³", molas: "N/A" }, detalhes: { estrutura: "Pau-Ferro (Concluída)", revestimento: "Couro (Concluída)", faltante: "Nenhum" } },
  { id: "FAB-SL-003", modelo: "Sofá Retrátil Slim", cliente: "Loja Jardins", responsavel: "Mestre Ricardo", prioridade: "ALTA", dataInicio: "2026-02-01", previsao: "2026-02-10", status: "EM ANDAMENTO", progresso: 30, materiaisNecessarios: { tecido: "10m", espuma: "3 blocos", madeira: "0.6 m³", molas: "12un" }, detalhes: { estrutura: "Madeira (Iniciada)", revestimento: "Linho", faltante: "Espumação" } },
  { id: "FAB-PUF-004", modelo: "Puff Capitonê Lux", cliente: "Showroom Matriz", responsavel: "Ana Paula", prioridade: "NORMAL", dataInicio: "2026-02-02", previsao: "2026-02-05", status: "PRONTO", progresso: 100, materiaisNecessarios: { tecido: "2m", espuma: "1 bloco", madeira: "0.1 m³", molas: "N/A" }, detalhes: { estrutura: "Concluída", revestimento: "Veludo", faltante: "Embalagem" } },
];

function EstoqueFabrica() {
  const [pedidos, setPedidos] = useState(mockEstofadosFabrica);
  const [historicoLoja, setHistoricoLoja] = useState([]);
  const [itemDetalhado, setItemDetalhado] = useState(null);
  const [filtro, setFiltro] = useState("TODOS");
  const [abaAtiva, setAbaAtiva] = useState("PRODUCAO");
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 3;

  // --- LÓGICA DE NEGÓCIO ---
  const enviarParaLoja = (item) => {
    const dataSaida = new Date().toLocaleDateString('pt-BR');
    setHistoricoLoja([{ ...item, dataSaida, status: "ENTREGUE NA LOJA" }, ...historicoLoja]);
    setPedidos(pedidos.filter(p => p.id !== item.id));
  };

  const listaBase = abaAtiva === "PRODUCAO" ? pedidos : historicoLoja;
  
  const filtrados = listaBase.filter(p => {
    if (filtro === "TODOS") return true;
    if (filtro === "PRONTO") return p.status === "PRONTO";
    if (filtro === "PRODUCAO") return p.status === "EM ANDAMENTO";
    return true;
  });

  // Paginação
  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const exibidos = filtrados.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

  const getStatusStyle = (status) => {
    switch (status) {
      case "PRONTO": return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "ENTREGUE NA LOJA": return "bg-blue-100 text-blue-800 border-blue-300";
      default: return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#f8f9fa] overflow-hidden font-sans">
      
      {/* HEADER INDUSTRIAL */}
      <header className="bg-[#064e3b] p-6 text-white shrink-0 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <p className="text-[#b49157] text-[10px] font-black uppercase tracking-[0.5em] mb-1">Production Control</p>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Fluxo Analu</h1>
          </div>
          
          <div className="flex bg-black/20 p-1.5 rounded-xl border border-white/10">
            {["PRODUCAO", "HISTORICO"].map(aba => (
              <button 
                key={aba}
                onClick={() => { setAbaAtiva(aba); setPagina(1); }}
                className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-lg transition-all ${abaAtiva === aba ? "bg-[#b49157] shadow-lg" : "hover:bg-white/5 opacity-50"}`}
              >
                {aba === "PRODUCAO" ? "Em Fábrica" : "Saída Loja"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SUB-NAV FILTROS & CONTADORES */}
      <nav className="bg-white border-b px-8 py-3 flex justify-between items-center shrink-0 overflow-x-auto">
        <div className="flex gap-3">
          {["TODOS", "PRODUCAO", "PRONTO"].map((f) => (
            <button 
              key={f}
              onClick={() => { setFiltro(f); setPagina(1); }}
              className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase border-2 transition-all
                ${filtro === f ? 'bg-[#064e3b] text-white border-[#064e3b]' : 'text-slate-400 border-slate-100'}`}
            >
              {f === "PRODUCAO" ? "Em Linha" : f}
            </button>
          ))}
        </div>
        
        {/* Paginação Compacta */}
        {totalPaginas > 1 && (
          <div className="flex items-center gap-4 border-l pl-6">
            <span className="text-[9px] font-black text-slate-400 uppercase">Pág {pagina}/{totalPaginas}</span>
            <div className="flex gap-1">
              <button disabled={pagina === 1} onClick={() => setPagina(p => p - 1)} className="p-2 bg-slate-100 rounded disabled:opacity-30 text-xs">◀</button>
              <button disabled={pagina === totalPaginas} onClick={() => setPagina(p => p + 1)} className="p-2 bg-slate-100 rounded disabled:opacity-30 text-xs">▶</button>
            </div>
          </div>
        )}
      </nav>

      {/* LISTAGEM DE CARDS */}
      <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-4">
          {exibidos.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#b49157]/30 transition-all text-left">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">ID: {item.id}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#064e3b] uppercase mb-4">{item.modelo}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
                    <div><p className="text-slate-400 font-bold uppercase text-[8px] mb-1">Mestre Responsável</p><p className="font-black text-slate-700">{item.responsavel}</p></div>
                    <div><p className="text-slate-400 font-bold uppercase text-[8px] mb-1">Cliente/Destino</p><p className="font-black text-slate-700">{item.cliente}</p></div>
                    <div className="col-span-2">
                      <p className="text-slate-400 font-bold uppercase text-[8px] mb-1">Status da Obra ({item.progresso}%)</p>
                      <div className="h-2 w-full bg-slate-100 rounded-full border overflow-hidden">
                        <div className="h-full bg-[#064e3b] transition-all" style={{ width: `${item.progresso}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 shrink-0">
                  <button onClick={() => setItemDetalhado(itemDetalhado === item.id ? null : item.id)} className="flex-1 lg:w-40 py-3 bg-slate-800 text-white text-[9px] font-black uppercase rounded-xl">Ficha Técnica</button>
                  {item.status === "PRONTO" && abaAtiva === "PRODUCAO" && (
                    <button onClick={() => enviarParaLoja(item)} className="flex-1 lg:w-40 py-3 bg-[#b49157] text-white text-[9px] font-black uppercase rounded-xl shadow-lg">Enviar p/ Loja</button>
                  )}
                </div>
              </div>

              {/* DETALHES TÉCNICOS EXPANSÍVEIS */}
              {itemDetalhado === item.id && (
                <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4 animate-slide-up">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-black text-[#064e3b] uppercase mb-3 border-b pb-1">Insumos em Uso</p>
                    {Object.entries(item.materiaisNecessarios).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[10px] uppercase mb-1"><span className="text-slate-400">{k}</span><span className="font-black">{v}</span></div>
                    ))}
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] uppercase">
                    <p className="text-[9px] font-black text-[#b49157] uppercase mb-3 border-b pb-1">Engenharia</p>
                    <p className="font-bold text-slate-600 leading-relaxed">{item.detalhes.estrutura} • {item.detalhes.revestimento}</p>
                  </div>
                  <div className={`p-4 rounded-xl border text-[10px] uppercase ${item.detalhes.faltante === "Nenhum" ? "bg-emerald-50 border-emerald-100" : "bg-rose-50 border-rose-100"}`}>
                    <p className="text-[9px] font-black uppercase mb-3 border-b pb-1">Pendência</p>
                    <p className="font-black text-rose-800">{item.detalhes.faltante}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t p-4 px-8 flex justify-between items-center shrink-0">
        <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Analu Executive • © 2026 Rickman Brown • Software Engineering</p>
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[9px] font-black text-slate-500 uppercase">Live Production Feed</span></div>
      </footer>
    </div>
  );
}

export default EstoqueFabrica;