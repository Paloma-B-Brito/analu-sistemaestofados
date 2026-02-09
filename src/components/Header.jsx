/**
 * @file Header.jsx
 * @description Navegação Principal com Controle de Acesso e Identidade Visual
 * @author © 2026 Rickman Brown • Software Engineering
 */

import React, { useState } from 'react';

function Header({ paginaAtual, setPagina, onLogout, userRole }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const colors = {
    executiveGreen: "#064e3b",
    adminSlate: "#1e293b", 
    goldMute: "#b49157",
  };

  // Botão Interno para manter o DRY (Don't Repeat Yourself)
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
    <header 
      className={`shadow-2xl sticky top-0 z-50 border-b border-white/5 w-full transition-colors duration-500 
      ${userRole === "ADMIN" ? "bg-[#1e293b]" : "bg-[#064e3b]"}`}
    >
      <div className="max-w-full mx-auto flex justify-between items-center px-4 md:px-8 h-16 md:h-20">

        {/* LOGO E MENU MOBILE */}
        <div className="flex items-center gap-3">
          {/* O botão de menu só aparece se for ADMIN ou se houver mais de uma página para a Role */}
          {userRole === "ADMIN" && (
            <button 
              onClick={() => setMenuAberto(!menuAberto)}
              className="lg:hidden p-2 text-white"
            >
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-[#b49157] mb-1.5"></div>
              <div className="w-4 h-0.5 bg-white"></div>
            </button>
          )}

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b49157] flex items-center justify-center text-white font-extrabold text-xs md:text-sm rounded-xl shadow-lg shadow-[#b49157]/20">
              A
            </div>
            <div className="text-left leading-none">
              <h1 className="text-sm md:text-lg font-black tracking-tighter text-white">ANALU</h1>
              <p className="hidden xs:block text-[6px] md:text-[8px] text-[#b49157] uppercase tracking-[0.3em] font-black">Executive Suite</p>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DESKTOP - FILTRADA POR ROLE */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-1 px-4">
          {userRole === "ADMIN" ? (
            <>
              <Botao label="Dashboard" nomePagina="Dashboard" />
              <Botao label="Produção" nomePagina="Estoque" />
              <Botao label="Suprimentos" nomePagina="Suprimentos" />
              <Botao label="Loja" nomePagina="Entregas" />
              <Botao label="Financeiro" nomePagina="Financeiro" />
              <Botao label="Equipe" nomePagina="Funcionários" />
            </>
          ) : (
            // Se for LOJA, ele só vê o botão da própria área (ou pode ficar vazio se o App.js já travar a página)
            <Botao label="Ponto de Venda" nomePagina="Entregas" />
          )}
        </nav>

        {/* PERFIL E LOGOUT */}
        <div className="flex items-center gap-3 md:gap-6 ml-4">
          <div className="hidden xl:flex flex-col text-right border-r border-white/10 pr-6 leading-tight">
            <p className="text-[8px] font-black uppercase text-[#b49157]">
              {userRole === "ADMIN" ? "Nível: Administrador" : "Nível: Operacional"}
            </p>
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-tighter">
              {userRole === "ADMIN" ? "Rickman Brown" : "Unidade Comercial"}
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center justify-center w-10 h-10 md:w-auto md:px-5 md:py-2 border border-white/10 hover:border-rose-500/50 rounded-xl transition-all group"
          >
            <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-rose-400">Sair</span>
            <span className="md:hidden text-white/60 group-hover:text-rose-400 text-lg">✕</span>
          </button>
        </div>
      </div>

      {/* MENU MOBILE LATERAL */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${menuAberto ? "visible" : "invisible"}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuAberto ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuAberto(false)}
        />
        
        <div className={`absolute top-0 left-0 w-72 h-full shadow-2xl transition-transform duration-500 flex flex-col p-6 ${menuAberto ? "translate-x-0" : "-translate-x-full"} ${userRole === "ADMIN" ? "bg-[#1e293b]" : "bg-[#064e3b]"}`}>
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-black text-[#b49157] tracking-widest uppercase text-xs">Menu Analu</h2>
            <button onClick={() => setMenuAberto(false)} className="text-white/40 text-xl">✕</button>
          </div>

          <div className="flex flex-col gap-2">
            {userRole === "ADMIN" ? (
              <>
                <Botao label="Dashboard" nomePagina="Dashboard" mobile />
                <Botao label="Produção" nomePagina="Estoque" mobile />
                <Botao label="Suprimentos" nomePagina="Suprimentos" mobile />
                <Botao label="Loja" nomePagina="Entregas" mobile />
                <Botao label="Financeiro" nomePagina="Financeiro" mobile />
                <Botao label="Equipe" nomePagina="Funcionários" mobile />
              </>
            ) : (
              <Botao label="Ponto de Venda" nomePagina="Entregas" mobile />
            )}
          </div>

          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-[10px] font-black text-[#b49157] uppercase tracking-widest mb-1">Acesso:</p>
            <p className="text-sm font-bold text-white uppercase">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;