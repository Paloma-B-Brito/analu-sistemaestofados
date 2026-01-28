import { useState } from "react";
import "../../App.css";

function ModalConsultaGeral({ onClose }) {
  const [termoBusca, setTermoBusca] = useState("");
  const [itemExpandido, setItemExpandido] = useState(null);
  
  // Base de dados simulada com inteligência logística
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-10">
      <div className="absolute inset-0 bg-[#064e3b]/30 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in border border-emerald-100 flex flex-col max-h-[90vh]">
        
        {/* BUSCA */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <input 
            autoFocus
            type="text"
            placeholder="Pesquisar no ecossistema Analu..."
            className="w-full pl-6 pr-6 py-4 bg-white border-2 border-[#064e3b]/10 rounded-2xl font-black text-[#064e3b] outline-none focus:border-[#064e3b]"
            onChange={(e) => { setTermoBusca(e.target.value); setItemExpandido(null); }}
          />
        </div>

        {/* LISTAGEM */}
        <div className="overflow-y-auto flex-1 p-4 space-y-2">
          {resultados.map((item) => (
            <div key={item.id} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setItemExpandido(itemExpandido === item.id ? null : item.id)}
                className={`w-full p-4 flex justify-between items-center transition-all ${itemExpandido === item.id ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
              >
                <div className="text-left">
                  <p className="text-[8px] font-black text-[#b49157] uppercase">{item.id}</p>
                  <h4 className="text-sm font-black text-[#064e3b] uppercase">{item.nome}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black px-2 py-1 rounded ${item.local === 'Fábrica' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {item.local}
                  </span>
                  <span className="text-lg">{itemExpandido === item.id ? '−' : '+'}</span>
                </div>
              </button>

              {/* PAINEL DE DETALHES EXPANSÍVEL */}
              {itemExpandido === item.id && (
                <div className="p-5 bg-white border-t border-slate-100 animate-slide-down">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status de Disponibilidade</p>
                      <p className="text-sm font-bold text-slate-700">Quantidade: <span className="text-[#064e3b]">{item.estoque}</span></p>
                      <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{item.detalhes}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-black text-[#064e3b] uppercase">Produção/Prontidão</p>
                        <span className="text-[10px] font-black text-[#b49157]">{item.progresso}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#064e3b] h-full transition-all duration-1000" style={{ width: `${item.progresso}%` }}></div>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 mt-3 uppercase tracking-tighter text-right">
                        Entrega estimada: <span className="text-slate-700">{item.estimativa}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 bg-[#064e3b] text-white text-[9px] font-black uppercase rounded-lg tracking-widest">Abrir Ficha Completa</button>
                    <button className="flex-1 py-2 bg-slate-100 text-slate-500 text-[9px] font-black uppercase rounded-lg tracking-widest">Relatar Problema</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-slate-900 p-4 text-center">
          <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">Analu Executive Search Engine v3.0</p>
        </div>
      </div>
    </div>
  );
}

export default ModalConsultaGeral;