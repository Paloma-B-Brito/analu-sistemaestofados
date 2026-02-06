/**
 * @file Funcionarios.jsx
 * @description Gestão de Capital Humano e Controle de Acessos
 * @author © 2026 — Rickman
 */

import { useState } from "react";
import "../App.css";

const mockFuncionarios = [
  { id: 1, matricula: "2026-001", nome: "Mestre Ricardo", setor: "FÁBRICA", cargo: "Estofador Master", senha: "ANLU-123", admissao: "10/01/2026" },
  { id: 2, matricula: "2026-002", nome: "Ana Paula", setor: "LOJA", cargo: "Gerente de Vendas", senha: "ANLU-456", admissao: "12/01/2026" },
  { id: 3, matricula: "2026-003", nome: "Carlos Lima", setor: "FÁBRICA", cargo: "Cortador", senha: "ANLU-789", admissao: "15/01/2026" },
  { id: 4, matricula: "2026-004", nome: "Juliana Silva", setor: "LOJA", cargo: "Consultora", senha: "ANLU-000", admissao: "20/01/2026" },
  { id: 5, matricula: "2026-005", nome: "Marcos Viana", setor: "FÁBRICA", cargo: "Armador", senha: "ANLU-111", admissao: "22/01/2026" },
  { id: 6, matricula: "2026-006", nome: "Fernanda Costa", setor: "LOJA", cargo: "Vendas", senha: "ANLU-222", admissao: "25/01/2026" },
  { id: 7, matricula: "2026-007", nome: "Roberto Souza", setor: "FÁBRICA", cargo: "Acabador", senha: "ANLU-333", admissao: "01/02/2026" },
];

const SENHA_MESTRA_ANALU = "analu123";

function ModuloRH() {
  const [colaboradores, setColaboradores] = useState(mockFuncionarios);
  const [filtroBusca, setFiltroBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(null); 
  const [selecionado, setSelecionado] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  
  const [senhaMestraInput, setSenhaMestraInput] = useState("");
  const [novoMembro, setNovoMembro] = useState({ nome: "", cargo: "", setor: "FÁBRICA", matricula: "", senha: "" });
  const [edicaoSenhaFunc, setEdicaoSenhaFunc] = useState("");

  // Paginação - 6 itens por grid
  const [pagina, setPagina] = useState(1);
  const itensPorPagina = 6;

  // Filtro de busca antes da paginação
  const colaboradoresFiltrados = colaboradores.filter(c => 
    c.nome.toLowerCase().includes(filtroBusca.toLowerCase())
  );

  const totalPaginas = Math.ceil(colaboradoresFiltrados.length / itensPorPagina);
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const listaExibida = colaboradoresFiltrados.slice(inicio, fim);

  // Reset de modais e inputs
  const fecharModais = () => {
    setModalAberto(null);
    setSenhaMestraInput("");
    setEdicaoSenhaFunc("");
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") fecharModais();
  };

  // Gerador de SKU de matrícula
  const gerarMatricula = () => {
    const ano = new Date().getFullYear();
    return `${ano}-${(colaboradores.length + 1).toString().padStart(3, '0')}`;
  };

  // Gatekeeper de segurança (Senha Analu)
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
      alert("Credencial Analu Inválida!");
    }
  };

  const cadastrarMembro = () => {
    if (!novoMembro.nome || !novoMembro.senha) return alert("Dados obrigatórios ausentes!");
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    setColaboradores([...colaboradores, { ...novoMembro, id: Date.now(), admissao: dataAtual }]);
    fecharModais();
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-full font-sans min-h-[600px]">
   
      {/* Header RH */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Gestão de Pessoas</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">Equipe Analu</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            {/* Input de busca rápida */}
            <input 
              type="text" 
              placeholder="BUSCAR NOME..."
              className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#b49157] placeholder:text-white/20"
              value={filtroBusca}
              onChange={(e) => { setFiltroBusca(e.target.value); setPagina(1); }}
            />
            <button 
              onClick={() => abrirAcessoSeguro('novo')}
              className="bg-[#b49157] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-[#a38046] transition-all"
            >
              + Novo Cadastro
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listaExibida.map((colaborador) => (
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
              Ficha & Credenciais
            </button>
          </div>
        ))}
      </div>

      {/* Paginação RH */}
      {totalPaginas > 1 && (
        <div className="p-6 border-t flex justify-center items-center gap-4">
          <button 
            disabled={pagina === 1}
            onClick={() => setPagina(p => p - 1)}
            className="px-4 py-2 text-[10px] font-black border rounded-lg disabled:opacity-20 uppercase"
          >
            Anterior
          </button>
          <span className="text-[10px] font-black text-slate-400 uppercase">Pág {pagina} de {totalPaginas}</span>
          <button 
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(p => p + 1)}
            className="px-4 py-2 text-[10px] font-black border rounded-lg disabled:opacity-20 uppercase"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Modais de Segurança e Cadastro */}
      {modalAberto && (
        <div id="modal-overlay" onClick={handleOverlayClick} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button onClick={fecharModais} className="absolute top-5 right-5 text-slate-300 hover:text-slate-600 font-black">✕</button>

            {/* Login Mestre */}
            {modalAberto === 'login' && (
              <div className="text-center">
                <h3 className="text-xl font-black text-[#064e3b] uppercase mb-6">Autenticação Mestra</h3>
                <input 
                  type="password" 
                  autoFocus
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-4 mb-4 text-center font-black outline-none focus:border-[#b49157]"
                  value={senhaMestraInput}
                  onChange={(e) => setSenhaMestraInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && validarLoginAnalu()}
                />
                <button onClick={validarLoginAnalu} className="w-full py-4 bg-[#064e3b] text-white rounded-xl text-[10px] font-black uppercase">Liberar Acesso</button>
              </div>
            )}

            {/* Novo Colaborador */}
            {modalAberto === 'novo' && (
              <div>
                <h3 className="text-xl font-black text-[#064e3b] uppercase mb-6">Cadastrar Profissional</h3>
                <div className="space-y-4">
                  <input type="text" value={novoMembro.matricula} readOnly className="w-full border bg-slate-50 rounded-xl p-3 text-sm font-mono font-black text-slate-500" />
                  <input type="text" placeholder="Nome Completo" className="w-full border rounded-xl p-3 text-sm outline-none" onChange={(e) => setNovoMembro({...novoMembro, nome: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Cargo" className="border rounded-xl p-3 text-sm" onChange={(e) => setNovoMembro({...novoMembro, cargo: e.target.value})} />
                    <select className="border rounded-xl p-3 text-sm" onChange={(e) => setNovoMembro({...novoMembro, setor: e.target.value})}>
                        <option value="FÁBRICA">FÁBRICA</option>
                        <option value="LOJA">LOJA</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Senha de Sistema" className="w-full border rounded-xl p-3 text-sm" onChange={(e) => setNovoMembro({...novoMembro, senha: e.target.value})} />
                  <button onClick={cadastrarMembro} className="w-full py-4 bg-[#064e3b] text-white rounded-xl font-black uppercase text-xs">Finalizar Registro</button>
                </div>
              </div>
            )}

            {/* Ficha Individual */}
            {modalAberto === 'ficha' && selecionado && (
              <div className="text-left">
                <span className="text-[#b49157] text-[10px] font-black uppercase">Ficha Funcional</span>
                <h3 className="text-2xl font-black text-[#064e3b] uppercase mb-6">{selecionado.nome}</h3>
                <div className="space-y-3 bg-slate-50 p-6 rounded-2xl mb-6 text-[11px] font-bold uppercase">
                    <div className="flex justify-between border-b pb-2"><span className="text-slate-400">Matrícula</span>{selecionado.matricula}</div>
                    <div className="flex justify-between border-b pb-2"><span className="text-slate-400">Setor</span>{selecionado.setor}</div>
                    <div className="flex justify-between border-b pb-2"><span className="text-slate-400">Admissão</span>{selecionado.admissao}</div>
                    <div className="flex justify-between"><span className="text-slate-400 text-rose-500">Senha</span>{selecionado.senha}</div>
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