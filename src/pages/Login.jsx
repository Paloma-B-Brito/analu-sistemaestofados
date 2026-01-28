import { useState } from "react";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErro("");

    if (!usuario || !senha) {
      setErro("Credenciais obrigatórias para acesso root.");
      return;
    }

    setCarregando(true);

    // Simulação de autenticação no servidor Analu
    setTimeout(() => {
      if (senha === "123") {
        onLogin();
      } else {
        setErro("Acesso negado. Verifique matrícula e senha.");
        setCarregando(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9] p-4 font-sans">
      <div className="bg-white p-10 rounded-sm shadow-[0_20px_50px_rgba(6,78,59,0.1)] w-full max-w-[420px] animate-fade-in relative border border-slate-100">
        
        {/* Barra de Status Executiva */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#064e3b]"></div>

        {/* LOGO E IDENTIDADE ANALU */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#064e3b] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-900/20">
             <span className="text-[#b49157] text-2xl font-black">A</span>
          </div>
          
          <h1 className="text-2xl font-black text-[#064e3b] tracking-tighter uppercase leading-none">
            Analu Estofados
          </h1>
          <p className="text-[9px] text-[#b49157] uppercase tracking-[0.4em] font-bold mt-2">
            Executive Intelligence Suite
          </p>
        </div>

        {/* MENSAGEM DE ERRO CRÍTICA */}
        {erro && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-none border-l-4 border-red-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {erro}
          </div>
        )}

        {/* FORMULÁRIO DE ALTO NÍVEL */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Matrícula do Operador
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-slate-50 border-b-2 border-slate-200 px-4 py-3 text-sm font-bold text-[#064e3b] focus:outline-none focus:border-[#064e3b] transition-all placeholder:text-slate-300"
                placeholder="0000"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Senha de Acesso
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full bg-slate-50 border-b-2 border-slate-200 px-4 py-3 text-sm font-bold text-[#064e3b] focus:outline-none focus:border-[#064e3b] transition-all placeholder:text-slate-300"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          {/* Botão Monolítico */}
          <button
            type="submit"
            disabled={carregando}
            className={`w-full py-4 bg-[#064e3b] text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-xl transition-all active:scale-[0.98]
              ${carregando ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-900 hover:shadow-emerald-900/20"}`}
          >
            {carregando ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Validando...
              </span>
            ) : (
              "Autenticar Acesso"
            )}
          </button>
        </form>

        <div className="mt-12 pt-6 border-t border-slate-100 text-center">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
            &copy; 2026 Analu Intelligence • Secure Protocol Active
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;