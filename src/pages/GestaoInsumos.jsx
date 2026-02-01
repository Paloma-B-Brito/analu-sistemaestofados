import { useState } from "react";
import "../App.css";
import ModalAdicionarMaterial from "../components/modals/ModalAdicionarMaterial";

const mockInsumos = [
  {
    id: "INS-TEC-01",
    material: "Tecido Linho Europeu",
    unidade: "Metros",
    quantidade: 150,
    custoUnidade: 45.00,
    consumoPorEstofado: 8.5,
    categoria: "Têxtil"
  },
  {
    id: "INS-ESP-33",
    material: "Espuma Selada D33",
    unidade: "Blocos",
    quantidade: 42,
    custoUnidade: 120.00,
    consumoPorEstofado: 2,
    categoria: "Preenchimento"
  },
  {
    id: "INS-MAD-EUC",
    material: "Madeira Eucalipto Tratada",
    unidade: "m³",
    quantidade: 5,
    custoUnidade: 850.00,
    consumoPorEstofado: 0.4,
    categoria: "Estrutura"
  }
];

function GestaoInsumos() {
  const [materiais, setMateriais] = useState(mockInsumos);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const adicionarNovoMaterial = (dadosDoModal) => {
    const novoItem = {
      ...dadosDoModal,
      id: `INS-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      quantidade: Number(dadosDoModal.quantidade),
      custoUnidade: Number(dadosDoModal.custoUnidade),
      consumoPorEstofado: dadosDoModal.categoria === "Têxtil" ? 8.5 : 2
    };
    setMateriais([...materiais, novoItem]);
  };

  const calcularCapacidade = (qtd, consumo) => Math.floor(qtd / consumo);
  const custoTotalGeral = materiais.reduce((acc, item) => acc + (item.quantidade * item.custoUnidade), 0);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in w-full">
      
      {/* HEADER DE SUPRIMENTOS - Responsivo */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Supply Chain Management</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Controle de Insumos</h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-[#b49157] hover:bg-[#9c7b45] text-white px-6 py-4 sm:py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
          >
            + Adicionar Material
          </button>
        </div>
      </div>

      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 gap-4">
          
          {/* CABEÇALHO DA TABELA - Escondido no Mobile */}
          <div className="hidden md:grid md:grid-cols-5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
            <span className="text-left">Material / SKU</span>
            <span className="text-center">Saldo Atual</span>
            <span className="text-center">Custo Unitário</span>
            <span className="text-center">Valor em Estoque</span>
            <span className="text-right">Capacidade</span>
          </div>

          {/* LISTAGEM DINÂMICA - Cards no Mobile, Linhas no Desktop */}
          {materiais.map((item) => {
            const capacidade = calcularCapacidade(item.quantidade, item.consumoPorEstofado);
            const valorTotalItem = (item.quantidade * item.custoUnidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
              <div key={item.id} className="flex flex-col md:grid md:grid-cols-5 items-start md:items-center px-6 py-5 bg-white border border-slate-100 rounded-2xl hover:border-[#b49157] transition-all group gap-4 md:gap-0">
                
                {/* Info Principal */}
                <div className="text-left w-full md:w-auto">
                  <p className="text-[9px] font-black text-[#b49157] uppercase">{item.categoria}</p>
                  <p className="text-lg md:text-base font-black text-[#064e3b] uppercase leading-tight">{item.material}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{item.id}</p>
                </div>

                {/* Saldo - Mobile layout lateral */}
                <div className="flex md:flex-col justify-between w-full md:w-auto md:text-center border-t md:border-t-0 pt-3 md:pt-0">
                  <p className="text-[10px] font-black uppercase text-slate-400 md:hidden">Saldo</p>
                  <div>
                    <p className="text-xl md:text-xl font-black text-slate-700 leading-none">{item.quantidade}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{item.unidade}</p>
                  </div>
                </div>

                {/* Custo Unitário - Mobile layout lateral */}
                <div className="flex md:flex-col justify-between w-full md:w-auto md:text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 md:hidden">Custo Unit.</p>
                  <p className="text-sm font-black text-slate-600">R$ {item.custoUnidade.toFixed(2)}</p>
                </div>

                {/* Valor Total - Mobile layout lateral */}
                <div className="flex md:flex-col justify-between w-full md:w-auto md:text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 md:hidden">Total em Estoque</p>
                  <p className="text-sm font-black text-[#064e3b]">{valorTotalItem}</p>
                </div>

                {/* Capacidade - Destaque */}
                <div className="w-full md:text-right border-t md:border-t-0 pt-4 md:pt-0">
                  <div className={`flex flex-row md:flex-col justify-between items-center md:items-end md:inline-block px-4 py-3 md:py-2 rounded-xl border w-full md:w-auto ${capacidade < 10 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <p className="text-[8px] font-black uppercase opacity-60">Pode construir</p>
                    <p className={`text-lg md:text-xl font-black ${capacidade < 10 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {capacidade} Peças
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ DINÂMICO - Vertical no Mobile */}
      <div className="bg-slate-50 px-6 md:px-8 py-6 md:py-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
        <span>Custo Total Matéria-Prima: <span className="text-[#064e3b]">{custoTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
        <span className="opacity-60">Sincronizado: {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
      </div>

      {isModalOpen && (
        <ModalAdicionarMaterial 
          onClose={() => setIsModalOpen(false)} 
          onSalvar={adicionarNovoMaterial} 
        />
      )}
    </div>
  );
}

export default GestaoInsumos;