import { useState } from "react";
import "../App.css";

const mockFuncionarios = [
  { id: 1, matricula: "2026-001", nome: "Mestre Ricardo", setor: "FÁBRICA", cargo: "Estofador Master", senha: "ANLU-123" },
  { id: 2, matricula: "2026-002", nome: "Ana Paula", setor: "LOJA", cargo: "Gerente de Vendas", senha: "ANLU-456" },
];

const SENHA_MESTRA_ANALU = "analu123";

function ModuloRH() {
  const [colaboradores, setColaboradores] = useState(mockFuncionarios);
  const [modalAberto, setModalAberto] = useState(null); 
  const [selecionado, setSelecionado] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  
  const [senhaMestraInput, setSenhaMestraInput] = useState("");
  const [novoMembro, setNovoMembro] = useState({ nome: "", cargo: "", setor: "FÁBRICA", matricula: "", senha: "" });
  const [edicaoSenhaFunc, setEdicaoSenhaFunc] = useState("");

  // --- LÓGICA DE FECHAMENTO ---
  const fecharModais = () => {
    setModalAberto(null);
    setSenhaMestraInput("");
    setEdicaoSenhaFunc("");
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      fecharModais();
    }
  };

  // --- FUNÇÕES DE NEGÓCIO ---
  const gerarMatricula = () => {
    const ano = new Date().getFullYear();
    const proximoId = colaboradores.length + 1;
    return `${ano}-${proximoId.toString().padStart(3, '0')}`;
  };

  const abrirAcessoSeguro = (tipo, func = null) => {
    if (!autenticado) {
      setModalAberto('login');
      setSelecionado({ tipo, func });
    } else {
      if (tipo === 'novo') setNovoMembro({ ...novoMembro, matricula: gerarMatricula() });
      if (tipo === 'ficha') setSelecionado(func);
      setModalAberto(tipo);
    }
  };

  const validarLoginAnalu = () => {
    if (senhaMestraInput === SENHA_MESTRA_ANALU) {
      setAutenticado(true);
      const { tipo, func } = selecionado;
      if (tipo === 'novo') setNovoMembro({ ...novoMembro, matricula: gerarMatricula() });
      if (tipo === 'ficha') setSelecionado(func);
      setModalAberto(tipo);
      setSenhaMestraInput("");
    } else {
      alert("Senha da Analu Incorreta!");
    }
  };

  const cadastrarMembro = () => {
    if (!novoMembro.nome || !novoMembro.senha) return alert("Preencha o nome e a senha!");
    setColaboradores([...colaboradores, { ...novoMembro, id: Date.now() }]);
    fecharModais();
  };

  const salvarNovaSenhaFuncionario = () => {
    if (!edicaoSenhaFunc) return alert("Digite a nova senha!");
    setColaboradores(colaboradores.map(c => 
      c.id === selecionado.id ? { ...c, senha: edicaoSenhaFunc } : c
    ));
    setSelecionado({ ...selecionado, senha: edicaoSenhaFunc });
    setEdicaoSenhaFunc("");
    alert("Senha alterada com sucesso!");
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-full font-sans min-h-[600px]">
   
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-left">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Human Capital Management</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Equipe Analu</h2>
          </div>
          <button 
            onClick={() => abrirAcessoSeguro('novo')}
            className="bg-[#b49157] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[#a38046] transition-all"
          >
            + Adicionar Membro
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {colaboradores.map((colaborador) => (
          <div key={colaborador.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:border-[#b49157] transition-all text-left group relative">
             <div className={`inline-block px-3 py-1 rounded-full text-[8px] font-black mb-4 ${colaborador.setor === 'FÁBRICA' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {colaborador.setor}
            </div>
            <h3 className="text-lg font-black text-[#064e3b] uppercase leading-tight">{colaborador.nome}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-6">{colaborador.cargo}</p>
            <button 
              onClick={() => abrirAcessoSeguro('ficha', colaborador)}
              className="w-full py-3 bg-slate-50 text-[10px] font-black text-slate-500 uppercase rounded-xl group-hover:bg-[#064e3b] group-hover:text-white transition-colors"
            >
              Ver Ficha & Acessos
            </button>
          </div>
        ))}
      </div>

      {modalAberto && (
        <div 
          id="modal-overlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        >
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-slide-up">
            
            {/* Botão X de fechar */}
            <button 
              onClick={fecharModais}
              className="absolute top-5 right-5 text-slate-300 hover:text-slate-600 font-black text-xl transition-colors"
            >
              ✕
            </button>

            {/* CONTEÚDO DINÂMICO DOS MODAIS */}
            
            {modalAberto === 'login' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔐</div>
                <h3 className="text-xl font-black text-[#064e3b] uppercase mb-2">Acesso Restrito</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-6 tracking-widest">Senha da Analu</p>
                <input 
                  type="password" 
                  autoFocus
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-4 mb-4 text-center font-black outline-none focus:border-[#b49157]"
                  value={senhaMestraInput}
                  onChange={(e) => setSenhaMestraInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && validarLoginAnalu()}
                />
                <button onClick={validarLoginAnalu} className="w-full py-4 bg-[#064e3b] text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Confirmar</button>
              </div>
            )}

            {modalAberto === 'novo' && (
              <div>
                <h3 className="text-xl font-black text-[#064e3b] uppercase mb-6 text-left">Novo Cadastro</h3>
                <div className="space-y-4">
                  <div className="flex flex-col text-left">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-1 mb-1">Matrícula</label>
                    <input type="text" value={novoMembro.matricula} readOnly className="w-full border bg-slate-50 rounded-xl p-3 text-sm font-mono font-black text-slate-500" />
                  </div>
                  <input type="text" placeholder="Nome" className="w-full border rounded-xl p-3 text-sm outline-none focus:border-[#064e3b]" onChange={(e) => setNovoMembro({...novoMembro, nome: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Cargo" className="border rounded-xl p-3 text-sm outline-none focus:border-[#064e3b]" onChange={(e) => setNovoMembro({...novoMembro, cargo: e.target.value})} />
                    <select className="border rounded-xl p-3 text-sm bg-white" onChange={(e) => setNovoMembro({...novoMembro, setor: e.target.value})}>
                        <option value="FÁBRICA">FÁBRICA</option>
                        <option value="LOJA">LOJA</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Senha de Acesso" className="w-full border rounded-xl p-3 text-sm outline-none focus:border-[#b49157]" onChange={(e) => setNovoMembro({...novoMembro, senha: e.target.value})} />
                  <button onClick={cadastrarMembro} className="w-full py-4 bg-[#064e3b] text-white rounded-xl font-black uppercase text-xs shadow-lg mt-2">Salvar Cadastro</button>
                </div>
              </div>
            )}

            {modalAberto === 'ficha' && selecionado && (
              <div className="text-left">
                <span className="text-[#b49157] text-[10px] font-black uppercase tracking-widest">Registro Profissional</span>
                <h3 className="text-2xl font-black text-[#064e3b] uppercase mb-6">{selecionado.nome}</h3>
                
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl mb-6">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Matrícula</span>
                        <span className="text-sm font-mono font-black text-slate-700">{selecionado.matricula}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Setor</span>
                        <span className="text-sm font-black text-slate-700">{selecionado.setor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Senha</span>
                        <span className="text-sm font-mono font-black text-rose-600">{selecionado.senha}</span>
                    </div>
                </div>

                <div className="border-t pt-6">
                    <label className="text-[9px] font-black text-slate-400 uppercase mb-2 block tracking-tighter">Alterar Senha do Funcionário</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Nova senha" 
                            className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none focus:border-[#b49157]" 
                            value={edicaoSenhaFunc}
                            onChange={(e) => setEdicaoSenhaFunc(e.target.value)}
                        />
                        <button onClick={salvarNovaSenhaFuncionario} className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase">Ok</button>
                    </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

export default ModuloRH;