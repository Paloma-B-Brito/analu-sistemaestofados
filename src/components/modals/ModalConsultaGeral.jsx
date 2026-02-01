import { useState } from "react";
import "../../App.css";

function ModalConsultaGeral({ onClose }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [itemExpandido, setItemExpandido] = useState(null);
  
  const baseGlobal = [
    { 
      id: "SOF-001", nome: "Sofá Chesterfield", tipo: "Estofado", 
      local: "Fábrica", estoque: 2, progresso: 65, estimativa: "4 dias",
      detalhes: "Estrutura montada, aguardando aplicação do capitonê em couro."
    },
    { 
      id: "COS-042", nome: "Perfume Analu Noir", tipo: "Cosmético", 
      local: "Loja", estoque: 15, progresso: 100, estimativa: "Imediata",
      detalhes: "Lote premium de 100ml. Armazenado em local fresco."
    },
    { 
      id: "INS-992", nome: "Tecido Linho Europeu", tipo: "Matéria-Prima", 
      local: "Almoxarifado", estoque: "45 metros", progresso: 100, estimativa: "Disponível",
      detalhes: "Fornecedor: Império dos Tecidos. Rolo lacrado."
    },
    { 
      id: "SOF-088", nome: "Poltrona Eames", tipo: "Estofado", 
      local: "Fábrica", estoque: 1, progresso: 20, estimativa: "12 dias",
      detalhes: "Aguardando chegada da base de alumínio polido."
    }
  ];

  const resultados = baseGlobal.filter(item => 
    item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    item.id.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-0 sm:p-4 sm:pt-10">
      {/* OVERLAY COM BLUR PROFUNDO */}
      <div 
        className="absolute inset-0 bg-[#064e3b]/50 backdrop-blur-md animate-fade-in" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-b-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up border border-emerald-100 flex flex-col max-h-[95vh] sm:max-h-[90vh]">
        
        {/* HEADER DE BUSCA - Otimizado para Mobile */}
        <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-4 sm:hidden">
             <div className="w-8 h-8 bg-[#b49157] rounded-lg flex items-center justify-center text-white font-black text-xs">A</div>
             <p className="text-[10px] font-black uppercase tracking-widest text-[#064e3b]">Executive Search</p>
             <button onClick={onClose} className="ml-auto text-slate-400 p-2">✕</button>
          </div>
          <div className="relative">
            <input 
              autoFocus
              type="text"
              placeholder="Pesquisar produto, SKU ou insumo..."
              className="w-full pl-5 pr-12 py-4 bg-white border-2 border-[#064e3b]/10 rounded-2xl font-bold text-[#064e3b] outline-none focus:border-[#b49157] transition-all placeholder:text-slate-300 text-sm md:text-base shadow-inner"
              onChange={(e) => { setTermoBusca(e.target.value); setItemExpandido(null); }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b49157] opacity-50">
               🔍
            </div>
          </div>
        </div>

        {/* LISTAGEM - Scroll Suave */}
        <div className="overflow-y-auto flex-1 p-3 md:p-4 space-y-3 custom-scrollbar">
          {resultados.length > 0 ? (
            resultados.map((item) => (
              <div key={item.id} className={`border rounded-2xl transition-all duration-300 ${itemExpandido === item.id ? 'border-[#b49157] shadow-lg' : 'border-slate-100 hover:border-slate-300'}`}>
                <button 
                  onClick={() => setItemExpandido(itemExpandido === item.id ? null : item.id)}
                  className={`w-full p-4 flex justify-between items-center text-left ${itemExpandido === item.id ? 'bg-emerald-50/50' : 'bg-white'}`}
                >
                  <div className="max-w-[70%]">
                    <p className="text-[8px] font-black text-[#b49157] uppercase tracking-widest">{item.id}</p>
                    <h4 className="text-sm font-black text-[#064e3b] uppercase truncate">{item.nome}</h4>
                    <p className="text-[10px] text-slate-400 font-bold">{item.tipo}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`hidden xs:block text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${item.local === 'Fábrica' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {item.local}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${itemExpandido === item.id ? 'bg-[#b49157] text-white rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                      {itemExpandido === item.id ? '↑' : '↓'}
                    </div>
                  </div>
                </button>

                {/* PAINEL DE DETALHES - Grid Adaptativo */}
                {itemExpandido === item.id && (
                  <div className="p-4 md:p-6 bg-white border-t border-slate-100 animate-slide-down">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Informações de Estoque</p>
                          <p className="text-sm font-bold text-slate-700">Saldo Atual: <span className="text-[#064e3b]">{item.estoque}</span></p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Observações Técnicas</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed italic">"{item.detalhes}"</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-[9px] font-black text-[#064e3b] uppercase">Prontidão de Entrega</p>
                          <span className="text-[10px] font-black text-[#b49157]">{item.progresso}%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#064e3b] h-full transition-all duration-700" style={{ width: `${item.progresso}%` }}></div>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-3 uppercase text-right">
                          Estimativa: <span className="text-slate-700 font-black">{item.estimativa}</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* BOTÕES DE AÇÃO MOBILE-FIRST */}
                    <div className="mt-6 flex flex-col xs:flex-row gap-2">
                      <button className="flex-1 py-3 bg-[#064e3b] text-white text-[9px] font-black uppercase rounded-xl tracking-widest active:scale-95 transition-transform shadow-lg shadow-emerald-900/10">Ver Ficha Completa</button>
                      <button className="flex-1 py-3 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded-xl tracking-widest active:scale-95 transition-transform">Reportar Erro</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-300 font-black uppercase text-xs tracking-[0.2em]">Nenhum registro encontrado</p>
            </div>
          )}
        </div>

        {/* FOOTER BLACK EDITION */}
        <div className="bg-slate-900 p-4 flex justify-center items-center gap-4">
          <div className="w-1 h-1 rounded-full bg-[#b49157] animate-pulse"></div>
          <p className="text-[7px] font-black text-white/40 uppercase tracking-[0.4em]">Analu Intelligence Core v3.0</p>
          <div className="w-1 h-1 rounded-full bg-[#b49157] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default ModalConsultaGeral;