import React from 'react';

function Header({ paginaAtual, setPagina, onLogout }) {

  const colors = {
    executiveGreen: "#064e3b",
    goldMute: "#b49157",
    paperWhite: "#f8fafc"
  };

  function Botao({ label, nomePagina }) {
    // Sincronização: nomePagina deve bater com o App.js
    const ativo = paginaAtual === nomePagina;

    return (
      <button
        onClick={() => setPagina(nomePagina)}
        className={`
          relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all whitespace-nowrap rounded-xl
          ${ativo
            ? "text-white bg-white/10 shadow-sm"
            : "text-emerald-100/40 hover:text-white hover:bg-white/5"
          }
        `}
      >
        <span className={ativo ? "text-[#b49157]" : ""}>{label}</span>
        {ativo && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
            style={{ backgroundColor: colors.goldMute }}
          />
        )}
      </button>
    );
  }

  return (
    <header className="bg-[#064e3b] text-white shadow-2xl sticky top-0 z-50 border-b border-white/5 w-full">
      <div className="max-w-full mx-auto flex justify-between items-center px-8 h-16">

        <div className="flex items-center gap-3 min-w-fit">
          <div className="w-9 h-9 bg-[#b49157] flex items-center justify-center text-white font-extrabold text-sm rounded-xl shadow-lg shadow-[#b49157]/20">
            A
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-extrabold tracking-tighter leading-none text-left">ANALU</h1>
            <p className="text-[7px] text-[#b49157] uppercase tracking-[0.3em] font-bold">Executive Suite</p>
          </div>
        </div>

        {/* Trecho da Navegação no Header.jsx */}
        <nav className="flex-1 flex justify-center items-center gap-1 overflow-x-hidden px-4">
          <Botao label="Dashboard" nomePagina="Dashboard" />
          <div className="h-3 w-[1px] bg-white/10 mx-1 hidden xl:block" />

          <Botao label="Fábrica" nomePagina="Estoque" />
          {/* Mudamos de "Entradas" para "Suprimentos" */}
          <Botao label="Insumos" nomePagina="Suprimentos" />

          <div className="h-3 w-[1px] bg-white/10 mx-1 hidden xl:block" />

          <Botao label="Showroom" nomePagina="Entregas" />
          {/* Mudamos de "Devoluções" para "Financeiro" */}
          <Botao label="Financeiro" nomePagina="Financeiro" />

          <Botao label="RH" nomePagina="Funcionários" />
        </nav>

        <div className="flex items-center gap-6 min-w-fit ml-4">
          <div className="hidden xl:flex flex-col text-right border-r border-white/10 pr-6">
            <p className="text-[8px] font-black uppercase text-[#b49157] leading-none">Administrator</p>
            <p className="text-[10px] font-bold text-white opacity-40 uppercase">Root Level</p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 border border-white/10 hover:border-[#b49157] hover:bg-[#b49157]/10 px-5 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all rounded-xl"
          >
            Sair
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;