function MenuBotao({ label, ativo, onClick, icone }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left px-5 py-4 rounded-2xl mb-2 
        transition-all duration-300 ease-in-out
        flex items-center gap-4 group
        ${ativo 
          ? "bg-[#064e3b] text-white shadow-lg shadow-emerald-900/20 translate-x-1" 
          : "text-slate-500 hover:bg-slate-50 hover:text-[#064e3b]"
        }
      `}
    >
      {/* Indicador Lateral Ativo */}
      <div className={`
        w-1 h-5 rounded-full transition-all duration-300
        ${ativo ? "bg-[#b49157] scale-y-100" : "bg-transparent scale-y-0"}
      `} />

      <span className={`
        text-[11px] font-black uppercase tracking-[0.15em]
        ${ativo ? "text-white" : "group-hover:translate-x-1 transition-transform"}
      `}>
        {label}
      </span>

      {/* Ícone de seta discreto apenas quando ativo */}
      {ativo && (
        <span className="ml-auto text-[#b49157] text-[10px] animate-pulse">
          ●
        </span>
      )}
    </button>
  );
}

export default MenuBotao;