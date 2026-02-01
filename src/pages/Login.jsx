import { useState } from "react";

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false); // Novo estado para o olhinho
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    if (!usuario || !senha) {
      setErro("Credenciais obrigatórias.");
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: usuario, senha: senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          localStorage.setItem("userRole", data.role);
          localStorage.setItem("userName", data.nome);
          onLogin(data.role); 
        } else {
          setErro("Acesso negado.");
        }
      } else {
        setErro("Falha na autenticação.");
      }
    } catch (error) {
      setErro("Servidor indisponível.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcf9] p-4 sm:p-6 font-sans">
      <div className="bg-white p-6 sm:p-10 rounded-sm shadow-[0_20px_50px_rgba(6,78,59,0.1)] w-full max-w-[420px] animate-fade-in relative border border-slate-100">
        
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#064e3b]"></div>

        <div className="text-center mb-8 sm:mb-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#064e3b] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-900/20">
              <span className="text-[#b49157] text-xl sm:text-2xl font-black">A</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#064e3b] tracking-tighter uppercase leading-none">
            Analu Estofados
          </h1>
          <p className="text-[8px] sm:text-[9px] text-[#b49157] uppercase tracking-[0.3em] font-bold mt-2">
            Executive Intelligence Suite
          </p>
        </div>

        {erro && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-l-4 border-red-600 flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{erro}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Matrícula do Operador
            </label>
            <input
              type="text"
              className="w-full bg-slate-50 border-b-2 border-slate-200 px-4 py-3 text-sm font-bold text-[#064e3b] focus:outline-none focus:border-[#064e3b] transition-all placeholder:text-slate-300"
              placeholder="Ex: admin"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Senha de Acesso
            </label>
            <div className="relative group">
              <input
                type={verSenha ? "text" : "password"}
                className="w-full bg-slate-50 border-b-2 border-slate-200 px-4 py-3 text-sm font-bold text-[#064e3b] focus:outline-none focus:border-[#064e3b] transition-all placeholder:text-slate-300"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setVerSenha(!verSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#064e3b] transition-colors p-1"
              >
                {verSenha ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

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

        <div className="mt-8 sm:mt-12 pt-6 border-t border-slate-100 text-center">
          <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
            &copy; 2026 Analu Intelligence • Protocol Active
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;