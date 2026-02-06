/**
 * @file ModalConsultaGeral.jsx
 * @description Central de Busca Inteligente (Cross-Database Search)
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../../App.css";

function ModalConsultaGeral({ onClose }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [itemExpandido, setItemExpandido] = useState(null);
  
  const baseGlobal = [
    { 
      id: "SOF-001", nome: "Sofá Chesterfield", tipo: "Estofado", 
      local: "Fábrica", estoque: 2, progresso: 65, estimativa: "4 dias",
      detalhes: "Estrutura montada, aguardando aplicação do capitonê em couro legítimo."
    },
    { 
      id: "COS-042", nome: "Perfume Analu Noir", tipo: "Cosmético", 
      local: "Showroom", estoque: 15, progresso: 100, estimativa: "Imediata",
      detalhes: "Lote premium de 100ml. Armazenamento climatizado ok."
    },
    { 
      id: "INS-992", nome: "Tecido Linho Europeu", tipo: "Matéria-Prima", 
      local: "Almoxarifado", estoque: "45 metros", progresso: 100, estimativa: "Disponível",
      detalhes: "Fornecedor: Império dos Tecidos. Rolo lacrado e auditado."
    },
    { 
      id: "SOF-088", nome: "Poltrona Eames", tipo: "Estofado", 
      local: "Fábrica", estoque: 1, progresso: 20, estimativa: "12 dias",
      detalhes: "Aguardando chegada da base de alumínio polido vinda da fundição."
    }
  ];

  const resultados = baseGlobal.filter(item => 
    item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    item.id.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-0 sm:p-6 sm:pt-16 font-sans">
      {/* OVERLAY COM BLUR EXECUTIVO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/40 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-b-[2.5rem] sm:rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-3xl overflow-hidden animate-slide-up border border-emerald-50 flex flex-col max-h-[95vh] sm:max-h-[85vh]">
        
        {/* BARRA DE BUSCA PREMIUM */}
        <div className="p-6 md:p-8 bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-10 h-10 bg-[#064e3b] rounded-2xl flex items-center justify-center text-[#b49157] font-black text-sm shadow-lg">A</div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157]">Intelligence Search</p>
                <h3 className="text-xl font-black text-[#064e3b] uppercase tracking-tighter">Consulta Unificada</h3>
             </div>
             <button onClick={onClose} className="ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">✕</button>
          </div>
          
          <div className="relative group">
            <input 
              autoFocus
              type="text"
              placeholder="Pesquisar por SKU, Nome ou Categoria..."
              className="w-full pl-6 pr-14 py-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-[#064e3b] outline-none focus:border-[#b49157] focus:bg-white transition-all placeholder:text-slate-300 text-lg shadow-inner"
              onChange={(e) => { setTermoBusca(e.target.value); setItemExpandido(null); }}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#b49157] group-focus-within:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
        </div>

        {/* LISTAGEM DINÂMICA */}
        <div className="overflow-y-auto flex-1 p-4 md:p-8 space-y-4 custom-scrollbar bg-white">
          {resultados.length > 0 ? (
            resultados.map((item) => (
              <div 
                key={item.id} 
                className={`group border rounded-[2rem] transition-all duration-500 ${
                  itemExpandido === item.id 
                  ? 'border-[#b49157] bg-white shadow-2xl' 
                  : 'border-slate-50 hover:border-slate-200 bg-white hover:shadow-md'
                }`}
              >
                <button 
                  onClick={() => setItemExpandido(itemExpandido === item.id ? null : item.id)}
                  className={`w-full p-6 flex justify-between items-center text-left transition-colors ${itemExpandido === item.id ? 'rounded-t-[2rem]' : 'rounded-[2rem]'}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                       <span className="text-[9px] font-black text-[#b49157] uppercase tracking-[0.2em]">{item.id}</span>
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${item.local === 'Fábrica' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {item.local}
                       </span>
                    </div>
                    <h4 className="text-lg font-black text-[#064e3b] uppercase leading-none mb-1 group-hover:text-[#b49157] transition-colors">{item.nome}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.tipo}</p>
                  </div>
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${itemExpandido === item.id ? 'bg-[#b49157] text-white rotate-180 shadow-lg shadow-[#b49157]/20' : 'bg-slate-50 text-slate-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>

                {/* PAINEL DE DETALHES EXPANSÍVEL */}
                {itemExpandido === item.id && (
                  <div className="px-6 pb-8 md:px-8 md:pb-10 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50">
                      
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Disponibilidade</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-[#064e3b] leading-none">{item.estoque}</span>
                            <span className="text-xs font-bold text-slate-400 uppercase">Unidades em Stock</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Manifesto Técnico</p>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            <span className="text-[#b49157] text-lg mr-1">“</span>
                            {item.detalhes}
                            <span className="text-[#b49157] text-lg ml-1">”</span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-center relative overflow-hidden">
                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <p className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest">Status de Prontidão</p>
                          <span className="text-xs font-black text-[#b49157]">{item.progresso}%</span>
                        </div>
                        
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden relative z-10">
                          <div 
                            className="bg-gradient-to-r from-[#064e3b] to-[#b49157] h-full transition-all duration-1000 ease-out" 
                            style={{ width: `${item.progresso}%` }}
                          ></div>
                        </div>
                        
                        <div className="mt-6 flex justify-between items-center relative z-10">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Estimativa Logística:</p>
                           <p className="text-sm font-black text-[#064e3b] uppercase tracking-tighter">{item.estimativa}</p>
                        </div>
                        {/* DECORAÇÃO FUNDO */}
                        <div className="absolute -bottom-4 -right-4 text-6xl opacity-[0.03] font-black italic select-none">ANALU</div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex gap-3">
                      <button className="flex-1 py-4 bg-[#064e3b] text-white text-[10px] font-black uppercase rounded-2xl tracking-[0.2em] hover:bg-[#b49157] transition-all shadow-xl shadow-emerald-900/10 active:scale-95">Abrir Registro Completo</button>
                      <button className="px-6 py-4 bg-slate-100 text-slate-400 text-[10px] font-black uppercase rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">Reportar Erro</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-24 text-center">
              <div className="text-5xl mb-4 opacity-20 grayscale">🔎</div>
              <p className="text-slate-300 font-black uppercase text-sm tracking-[0.3em]">Nenhum ativo localizado</p>
              <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Refine os termos da sua busca executiva</p>
            </div>
          )}
        </div>

        {/* FOOTER BLACK EDITION */}
        <div className="bg-slate-900 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.5em]">Analu Real-Time Cloud Engine v3.0</p>
          <div className="flex gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-[#b49157] animate-pulse delay-75"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConsultaGeral;