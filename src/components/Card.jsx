function Card({ titulo, valor, cor, tendencia, icone }) {
  const colorVariants = {
    green: "text-[#064e3b]",
    gold: "text-[#b49157]",
    rose: "text-rose-600",
    slate: "text-slate-700",
  };

  const selectedColor = colorVariants[cor] || "text-slate-700";

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">

      <div className={`absolute left-0 top-0 h-full w-1 bg-current opacity-10 ${selectedColor}`}></div>

      <div className="flex flex-col items-start text-left">
        <div className="flex justify-between items-start w-full mb-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none">
            {titulo}
          </p>
          {tendencia && (
            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full bg-slate-50 ${tendencia.includes('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
              {tendencia}
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <p className={`text-3xl font-black tracking-tighter uppercase leading-none ${selectedColor}`}>
            {valor}
          </p>
        </div>

        {/* Linha de progresso sutil no fundo do card (opcional) */}
        <div className="w-full h-1 bg-slate-50 rounded-full mt-6 overflow-hidden">
          <div 
            className={`h-full opacity-30 ${selectedColor.replace('text', 'bg')}`} 
            style={{ width: '60%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Card;