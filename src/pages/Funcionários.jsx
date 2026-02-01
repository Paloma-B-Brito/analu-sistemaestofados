import { useState } from "react";
import "../App.css";

const mockFuncionarios = [
  { id: 1, matricula: "1024", nome: "Mestre Ricardo", setor: "FÁBRICA", cargo: "Estofador Master", senha: "ANLU-****" },
  { id: 2, matricula: "3055", nome: "Ana Paula", setor: "LOJA", cargo: "Gerente de Vendas", senha: "ANLU-****" },
  { id: 3, matricula: "1088", nome: "Mestre Carlos", setor: "FÁBRICA", cargo: "Cortador de Couro", senha: "ANLU-****" },
  { id: 4, matricula: "3012", nome: "Juliana Silva", setor: "LOJA", cargo: "Consultora de Luxo", senha: "ANLU-****" },
  { id: 5, matricula: "2044", nome: "Felipe Mendes", setor: "ADM", cargo: "Controladoria", senha: "ANLU-****" },
];

function ModuloRH() {
  const [colaboradores, setColaboradores] = useState(mockFuncionarios);
  const [editandoSenha, setEditandoSenha] = useState(null);
  const [novaSenha, setNovaSenha] = useState("");

  const alterarSenha = (id) => {
    const novosDados = colaboradores.map(c => 
      c.id === id ? { ...c, senha: novaSenha } : c
    );
    setColaboradores(novosDados);
    setEditandoSenha(null);
    setNovaSenha("");
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in w-full">
      
      {/* HEADER RH RESPONSIVO */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Human Capital Management</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Equipe Analu</h2>
          </div>
          <button className="w-full sm:w-auto bg-[#b49157] text-white px-6 py-4 sm:py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            + Adicionar Membro
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* GRID DE CARDS: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {colaboradores.map((colaborador) => (
            <div key={colaborador.id} className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm hover:border-[#b49157] transition-all relative overflow-hidden group">
              
              {/* TAG DE SETOR */}
              <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-[8px] font-black tracking-widest ${colaborador.setor === 'FÁBRICA' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {colaborador.setor}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 shrink-0 bg-[#064e3b] rounded-full flex items-center justify-center text-white font-black">
                  {colaborador.nome.charAt(0)}
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-[#064e3b] uppercase leading-none">{colaborador.nome}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{colaborador.cargo}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-50 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Matrícula</span>
                  <span className="text-xs font-mono font-black text-slate-700 bg-slate-50 px-2 py-1 rounded">#{colaborador.matricula}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Acesso</span>
                  {editandoSenha === colaborador.id ? (
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        autoFocus
                        placeholder="Senha"
                        className="text-[10px] border-b-2 border-[#b49157] outline-none w-16 p-1 bg-transparent"
                        onChange={(e) => setNovaSenha(e.target.value)}
                      />
                      <button onClick={() => alterarSenha(colaborador.id)} className="text-[10px] font-black text-emerald-600 uppercase">OK</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-700">{colaborador.senha}</span>
                      <button 
                        onClick={() => setEditandoSenha(colaborador.id)}
                        className="text-[8px] font-black text-[#b49157] uppercase hover:underline"
                      >
                        Alterar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RODAPÉ DO CARD */}
              <div className="mt-6 flex justify-between gap-2">
                <button className="flex-1 py-3 bg-slate-50 text-[9px] font-black text-slate-500 uppercase rounded-xl hover:bg-slate-100 transition active:scale-95">Ficha</button>
                <button className="flex-1 py-3 bg-slate-50 text-[9px] font-black text-slate-500 uppercase rounded-xl hover:bg-slate-100 transition active:scale-95">Ponto</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ESTATÍSTICAS DO QUADRO - Responsivo (Flex-wrap) */}
      <div className="bg-slate-50 px-6 md:px-8 py-6 md:py-4 border-t border-slate-100 flex flex-wrap gap-4 md:gap-10 justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Fábrica: 02</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Loja: 02</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#064e3b]"></div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Total: 05 Ativos</p>
        </div>
      </div>
    </div>
  );
}

export default ModuloRH;