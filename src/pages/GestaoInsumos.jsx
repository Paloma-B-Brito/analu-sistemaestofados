import { useState } from "react";
import "../App.css";

// 1. IMPORTAÇÃO DO MODAL ATUALIZADO
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do Modal

  // Função para adicionar o material vindo do Modal
  const adicionarNovoMaterial = (dadosDoModal) => {
    const novoItem = {
      ...dadosDoModal,
      id: `INS-${Math.random().toString(36).substr(2, 4).toUpperCase()}`, // ID Aleatório
      quantidade: Number(dadosDoModal.quantidade),
      custoUnidade: Number(dadosDoModal.custoUnidade),
      consumoPorEstofado: dadosDoModal.categoria === "Têxtil" ? 8.5 : 2 // Estimativa base
    };

    setMateriais([...materiais, novoItem]);
  };

  // Cálculo de Capacidade de Produção
  const calcularCapacidade = (qtd, consumo) => Math.floor(qtd / consumo);

  // Cálculo Dinâmico do Custo Total de Matéria-Prima
  const custoTotalGeral = materiais.reduce((acc, item) => acc + (item.quantidade * item.custoUnidade), 0);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
      
      {/* HEADER DE SUPRIMENTOS */}
      <div className="bg-[#064e3b] p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2 text-left">Supply Chain Management</p>
            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Controle de Insumos</h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#b49157] hover:bg-[#9c7b45] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
          >
            + Adicionar Material
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-4">
          {/* CABEÇALHO DA TABELA */}
          <div className="grid grid-cols-5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
            <span className="text-left">Material / SKU</span>
            <span className="text-center">Saldo Atual</span>
            <span className="text-center">Custo Unitário</span>
            <span className="text-center">Valor em Estoque</span>
            <span className="text-right">Capacidade de Produção</span>
          </div>

          {/* LISTAGEM DINÂMICA */}
          {materiais.map((item) => {
            const capacidade = calcularCapacidade(item.quantidade, item.consumoPorEstofado);
            const valorTotalItem = (item.quantidade * item.custoUnidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            return (
              <div key={item.id} className="grid grid-cols-5 items-center px-6 py-5 bg-white border border-slate-100 rounded-2xl hover:border-[#064e3b] transition-all group">
                <div className="text-left">
                  <p className="text-[9px] font-black text-[#b49157] uppercase">{item.categoria}</p>
                  <p className="text-base font-black text-[#064e3b] uppercase leading-none">{item.material}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{item.id}</p>
                </div>

                <div className="text-center">
                  <p className="text-xl font-black text-slate-700">{item.quantidade}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">{item.unidade}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-black text-slate-600">R$ {item.custoUnidade.toFixed(2)}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm font-black text-[#064e3b]">{valorTotalItem}</p>
                </div>

                <div className="text-right">
                  <div className={`inline-block px-4 py-2 rounded-xl border ${capacidade < 10 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <p className="text-[8px] font-black uppercase opacity-60">Pode construir</p>
                    <p className={`text-xl font-black ${capacidade < 10 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {capacidade} Estofados
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ DINÂMICO */}
      <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>Custo Total de Matéria-Prima: {custoTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        <span>Última atualização: Hoje, {new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DO MODAL */}
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