/**
 * @file Header.jsx
 * @description Navegação Principal e Identidade Visual
 * @author © 2026 Rickman Brown • Software Engineering
 */

import React, { useState } from 'react';

function Header({ paginaAtual, setPagina, onLogout, userRole }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const colors = {
    executiveGreen: "#064e3b",
    goldMute: "#b49157",
    paperWhite: "#f8fafc"
  };

  function Botao({ label, nomePagina, mobile = false }) {
    const ativo = paginaAtual === nomePagina;

    return (
      <button
        onClick={() => {
          setPagina(nomePagina);
          if (mobile) setMenuAberto(false);
        }}
        className={`
          relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] transition-all whitespace-nowrap rounded-xl
          ${mobile ? "w-full text-left py-4 text-sm" : ""}
          ${ativo
            ? "text-white bg-white/10 shadow-sm"
            : mobile ? "text-emerald-100/60" : "text-emerald-100/40 hover:text-white hover:bg-white/5"
          }
        `}
      >
        <span className={ativo ? "text-[#b49157]" : ""}>{label}</span>
        {ativo && !mobile && (
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
      <div className="max-w-full mx-auto flex justify-between items-center px-4 md:px-8 h-16 md:h-20">

        {/* LOGO E MENU MOBILE */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMenuAberto(!menuAberto)}
            className="lg:hidden p-2 text-white"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-[#b49157] mb-1.5"></div>
            <div className="w-4 h-0.5 bg-white"></div>
          </button>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b49157] flex items-center justify-center text-white font-extrabold text-xs md:text-sm rounded-xl shadow-lg shadow-[#b49157]/20">
              A
            </div>
            <div className="text-left leading-none">
              <h1 className="text-sm md:text-lg font-black tracking-tighter">ANALU</h1>
              <p className="hidden xs:block text-[6px] md:text-[8px] text-[#b49157] uppercase tracking-[0.3em] font-black">Executive Suite</p>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DESKTOP - TRADUZIDA */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-1 px-4">
          {userRole === "ADMIN" && (
            <>
              <Botao label="Dashboard" nomePagina="Dashboard" />
              <Botao label="Produção" nomePagina="Estoque" />
              <Botao label="Suprimentos" nomePagina="Suprimentos" />
            </>
          )}
          <Botao label="Loja" nomePagina="Entregas" />
          {userRole === "ADMIN" && (
            <>
              <Botao label="Financeiro" nomePagina="Financeiro" />
              <Botao label="Funcionários" nomePagina="Funcionários" />
            </>
          )}
        </nav>

        {/* PERFIL E SAIR - TRADUZIDO */}
        <div className="flex items-center gap-3 md:gap-6 ml-4">
          <div className="hidden xl:flex flex-col text-right border-r border-white/10 pr-6 leading-tight">
            <p className="text-[8px] font-black uppercase text-[#b49157]">
              {userRole === "ADMIN" ? "Administrador" : "Operador de Loja"}
            </p>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">Acesso Identificado</p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center justify-center w-10 h-10 md:w-auto md:px-5 md:py-2 border border-white/10 hover:border-[#b49157] rounded-xl transition-all group"
          >
            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest group-hover:text-[#b49157]">Sair</span>
            <span className="md:hidden text-lg">✕</span>
          </button>
        </div>
      </div>

      {/* MENU MOBILE LATERAL */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${menuAberto ? "visible" : "invisible"}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuAberto ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuAberto(false)}
        />
        
        <div className={`absolute top-0 left-0 w-72 h-full bg-[#064e3b] shadow-2xl transition-transform duration-500 flex flex-col p-6 ${menuAberto ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-black text-[#b49157] tracking-widest uppercase text-xs">Menu de Gestão</h2>
            <button onClick={() => setMenuAberto(false)} className="text-white/40 text-xl">✕</button>
          </div>

          <div className="flex flex-col gap-2">
            {userRole === "ADMIN" && (
              <>
                <Botao label="Dashboard" nomePagina="Dashboard" mobile />
                <Botao label="Produção" nomePagina="Estoque" mobile />
                <Botao label="Suprimentos" nomePagina="Suprimentos" mobile />
              </>
            )}
            <Botao label="Loja" nomePagina="Entregas" mobile />
            {userRole === "ADMIN" && (
              <>
                <Botao label="Financeiro" nomePagina="Financeiro" mobile />
                <Botao label="Funcionários" nomePagina="Funcionários" mobile />
              </>
            )}
          </div>

          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-[10px] font-black text-[#b49157] uppercase tracking-widest mb-1">Usuário:</p>
            <p className="text-sm font-bold text-white uppercase">{userRole === "ADMIN" ? "Administrador" : "Vendedor"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;