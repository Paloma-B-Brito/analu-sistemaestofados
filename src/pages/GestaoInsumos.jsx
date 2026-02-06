/**
 * @file GestaoInsumos.jsx
 * @description Gestão de MP (Matéria-Prima) e Monitoramento de Capacidade
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState } from "react";
import "../App.css";
import ModalAdicionarMaterial from "../components/modals/ModalAdicionarMaterial";

// Dados mockados com campo de Estoque Mínimo e mais itens para teste de paginação
const mockInsumos = [
  { id: "INS-TEC-01", material: "Tecido Linho Europeu", unidade: "Metros", quantidade: 150, estoqueMinimo: 50, custoUnidade: 45.00, consumoPorEstofado: 8.5, categoria: "Têxtil" },
  { id: "INS-ESP-33", material: "Espuma Selada D33", unidade: "Blocos", quantidade: 8, estoqueMinimo: 15, custoUnidade: 120.00, consumoPorEstofado: 2, categoria: "Preenchimento" },
  { id: "INS-MAD-EUC", material: "Madeira Eucalipto Tratada", unidade: "m³", quantidade: 5, estoqueMinimo: 2, custoUnidade: 850.00, consumoPorEstofado: 0.4, categoria: "Estrutura" },
  { id: "INS-GRA-01", material: "Grampos Galvanizados", unidade: "Caixas", quantidade: 20, estoqueMinimo: 5, custoUnidade: 25.00, consumoPorEstofado: 0.1, categoria: "Ferragens" },
  { id: "INS-COL-SP", material: "Cola Spray Industrial", unidade: "Latas", quantidade: 3, estoqueMinimo: 10, custoUnidade: 65.00, consumoPorEstofado: 0.5, categoria: "Adesivos" },
  { id: "INS-PER-01", material: "Percevejo de Encosto", unidade: "Milheiro", quantidade: 12, estoqueMinimo: 4, custoUnidade: 88.00, consumoPorEstofado: 0.2, categoria: "Ferragens" },
];

function GestaoInsumos() {
  const [materiais, setMateriais] = useState(mockInsumos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Lógica de Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const totalPaginas = Math.ceil(materiais.length / itensPorPagina);
  
  // Corte do array para exibição na página
  const indiceFinal = paginaAtual * itensPorPagina;
  const indiceInicial = indiceFinal - itensPorPagina;
  const materiaisExibidos = materiais.slice(indiceInicial, indiceFinal);

  // Handlers
  const adicionarNovoMaterial = (dados) => {
    const novoItem = {
      ...dados,
      id: `INS-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      quantidade: Number(dados.quantidade),
      custoUnidade: Number(dados.custoUnidade),
      estoqueMinimo: Number(dados.estoqueMinimo || 10),
      consumoPorEstofado: dados.categoria === "Têxtil" ? 8.5 : 2
    };
    setMateriais([novoItem, ...materiais]);
  };

  const calcularCapacidade = (qtd, consumo) => Math.floor(qtd / consumo);
  const custoTotalGeral = materiais.reduce((acc, item) => acc + (item.quantidade * item.custoUnidade), 0);

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in w-full">
      
      {/* Header Operacional */}
      <div className="bg-[#064e3b] p-6 md:p-8 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-2">Logística de Suprimentos</p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Gestão de Insumos</h2>
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
          
          {/* Cabeçalho da Tabela */}
          <div className="hidden md:grid md:grid-cols-6 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b">
            <span className="text-left">Material / SKU</span>
            <span className="text-center">Status Estoque</span>
            <span className="text-center">Saldo Atual</span>
            <span className="text-center">Custo Unitário</span>
            <span className="text-center">Valor Total</span>
            <span className="text-right">Capacidade</span>
          </div>

          {/* Listagem com Verificação de Estoque Mínimo */}
          {materiaisExibidos.map((item) => {
            const capacidade = calcularCapacidade(item.quantidade, item.consumoPorEstofado);
            const critico = item.quantidade <= item.estoqueMinimo;

            return (
              <div key={item.id} className={`flex flex-col md:grid md:grid-cols-6 items-start md:items-center px-6 py-5 border rounded-2xl transition-all group gap-4 md:gap-0 ${critico ? 'bg-rose-50/30 border-rose-100' : 'bg-white border-slate-100 hover:border-[#b49157]'}`}>
                
                {/* SKU e Categoria */}
                <div className="text-left w-full md:w-auto">
                  <p className="text-[9px] font-black text-[#b49157] uppercase">{item.categoria}</p>
                  <p className="text-lg md:text-base font-black text-[#064e3b] uppercase leading-tight">{item.material}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{item.id}</p>
                </div>

                {/* Status Visual (Baseado no estoque mínimo da fábrica) */}
                <div className="flex md:justify-center w-full md:w-auto">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${critico ? 'bg-rose-100 text-rose-700 border-rose-200 animate-pulse' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
                    {critico ? "Reposição Necessária" : "Estoque Estável"}
                  </span>
                </div>

                {/* Saldo Atual */}
                <div className="flex md:flex-col justify-between w-full md:w-auto md:text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 md:hidden">Saldo</p>
                  <div>
                    <p className={`text-xl font-black leading-none ${critico ? 'text-rose-600' : 'text-slate-700'}`}>{item.quantidade}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{item.unidade}</p>
                  </div>
                </div>

                {/* Custo Unitário */}
                <div className="flex md:flex-col justify-between w-full md:w-auto md:text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 md:hidden">Custo Unit.</p>
                  <p className="text-sm font-black text-slate-600">R$ {item.custoUnidade.toFixed(2)}</p>
                </div>

                {/* Valor em Estoque */}
                <div className="flex md:flex-col justify-between w-full md:w-auto md:text-center">
                  <p className="text-[10px] font-black uppercase text-slate-400 md:hidden">Total</p>
                  <p className="text-sm font-black text-[#064e3b]">R$ {(item.quantidade * item.custoUnidade).toLocaleString('pt-BR')}</p>
                </div>

                {/* Capacidade de Produção */}
                <div className="w-full md:text-right">
                  <div className={`px-4 py-2 rounded-xl border inline-block w-full md:w-auto text-center md:text-right ${capacidade < 5 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <p className="text-[8px] font-black uppercase opacity-60">Produção Estimada</p>
                    <p className={`text-lg font-black ${capacidade < 5 ? 'text-rose-600' : 'text-emerald-600'}`}>{capacidade} un</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Componente de Paginação */}
        <div className="mt-8 flex justify-center items-center gap-4">
          <button 
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(prev => prev - 1)}
            className="px-4 py-2 text-[10px] font-black uppercase border rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-all"
          >
            Anterior
          </button>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button 
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(prev => prev + 1)}
            className="px-4 py-2 text-[10px] font-black uppercase border rounded-lg disabled:opacity-30 hover:bg-slate-50 transition-all"
          >
            Próxima
          </button>
        </div>
      </div>

      {/* Footer com Total Financeiro */}
      <div className="bg-slate-50 px-6 md:px-8 py-6 md:py-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
        <span>Capital Imobilizado: <span className="text-[#064e3b]">{custoTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
        <span className="opacity-60">Sincronizado: {new Date().toLocaleTimeString('pt-BR')}</span>
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