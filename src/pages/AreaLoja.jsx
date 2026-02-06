/**
 * @file AreaLoja.jsx
 * @description Gestão Comercial Completa: Estoque, Vendas e Impressão de Relatórios
 * @author © 2026 — Rickman
 */

import { useState, useEffect } from "react";
import "../App.css";

const mockEstoqueLoja = [
  { id: "LJ-CH-001", modelo: "Sofá Chesterfield 3 Lugares", categoria: "Sofás", acabamento: "Couro Legítimo", preco: 8500.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
  { id: "COS-SK-022", modelo: "Kit Skin Care Advanced", categoria: "Cosméticos", acabamento: "Sérum + Hidratante", preco: 249.90, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
  { id: "LJ-EAM-042", modelo: "Poltrona Charles Eames", categoria: "Poltronas", acabamento: "Pau-Ferro / Preto", preco: 4200.00, status: "VENDIDO", vendedor: "Mestre Ricardo", dataVenda: "2026-02-06", pagamento: "Pix" },
  { id: "LJ-SL-003", modelo: "Sofá Retrátil Slim", categoria: "Sofás", acabamento: "Linho Cinza", preco: 5800.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
  { id: "LJ-MT-009", modelo: "Mesa de Centro Industrial", categoria: "Móveis", acabamento: "Aço e Madeira", preco: 1200.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
  { id: "LJ-CJ-015", modelo: "Conjunto de Jantar Minimalist", categoria: "Móveis", acabamento: "Laca Branca", preco: 3500.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
];

const vendedoresEquipe = ["Ana Paula", "Juliana Silva", "Fernanda Costa", "Mestre Ricardo"];
const formasPagamento = ["Dinheiro", "Pix", "Cartão de Crédito", "Cartão de Débito", "Boleto"];

function AreaLoja() {
  const [abaAtiva, setAbaAtiva] = useState("estoque");
  const [produtos, setProdutos] = useState(mockEstoqueLoja);
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODOS");
  
  // Paginação
  const [pagEstoque, setPagEstoque] = useState(1);
  const [pagVendas, setPagVendas] = useState(1);
  const itensPorPagina = 4;

  // Estados de Operação
  const [vendaEmCurso, setVendaEmCurso] = useState(null);
  const [dadosVenda, setDadosVenda] = useState({ vendedor: "", pagamento: "" });
  const [filtroDataImpressao, setFiltroDataImpressao] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  // Lógica de Filtros e Paginação - Estoque
  const estoqueFiltrado = produtos.filter(p => (categoriaFiltro === "TODOS" || p.categoria === categoriaFiltro) && p.status === "DISPONÍVEL");
  const totalPagEstoque = Math.max(1, Math.ceil(estoqueFiltrado.length / itensPorPagina));
  const listaEstoque = estoqueFiltrado.slice((pagEstoque - 1) * itensPorPagina, pagEstoque * itensPorPagina);

  // Lógica de Filtros e Paginação - Vendas (Filtradas por data selecionada para exibição/impressão)
  const vendasData = produtos.filter(p => p.status === "VENDIDO" && p.dataVenda === filtroDataImpressao);
  const totalPagVendas = Math.max(1, Math.ceil(vendasData.length / itensPorPagina));
  const listaVendas = vendasData.slice((pagVendas - 1) * itensPorPagina, pagVendas * itensPorPagina);

  const finalizarVenda = (id) => {
    if (!dadosVenda.vendedor || !dadosVenda.pagamento) return alert("Por favor, selecione o vendedor e a forma de pagamento.");
    
    setProdutos(produtos.map(p => 
      p.id === id ? { 
        ...p, 
        status: "VENDIDO", 
        vendedor: dadosVenda.vendedor, 
        pagamento: dadosVenda.pagamento,
        dataVenda: new Date().toISOString().split('T')[0] 
      } : p
    ));
    setVendaEmCurso(null);
    setDadosVenda({ vendedor: "", pagamento: "" });
  };

  const imprimirRelatorio = () => {
    if (vendasData.length === 0) return alert("Nenhuma venda registrada para imprimir nesta data.");
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-[#f8f9f5] flex flex-col overflow-hidden px-4 md:px-8 py-6 animate-fade-in font-sans">
      
      {/* CSS DE IMPRESSÃO */}
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            #printable-area, #printable-area * { visibility: visible; }
            #printable-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            .no-print { display: none !important; }
            .venda-card-print {
              border-bottom: 1px solid #000 !important;
              padding: 10px 0;
              margin-bottom: 5px;
            }
          }
        `}
      </style>

      <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">

        {/* HEADER FINANCEIRO */}
        <div className="bg-[#064e3b] p-6 text-white shrink-0 no-print">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">Commercial Dept</p>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Gestão Comercial</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setAbaAtiva("estoque")}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${abaAtiva === "estoque" ? 'bg-[#b49157] text-white shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
              >
                Vitrine
              </button>
              <button 
                onClick={() => setAbaAtiva("vendas")}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${abaAtiva === "vendas" ? 'bg-[#b49157] text-white shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
              >
                Histórico de Vendas
              </button>
            </div>
          </div>
        </div>

        {/* BARRA DE FERRAMENTAS */}
        <div className="bg-slate-50 border-b p-3 flex flex-wrap justify-between items-center px-6 gap-4 shrink-0 no-print">
          {abaAtiva === "estoque" ? (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {["TODOS", "Sofás", "Poltronas", "Cosméticos", "Móveis"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => { setCategoriaFiltro(cat); setPagEstoque(1); }}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase transition-all ${categoriaFiltro === cat ? 'bg-[#064e3b] text-white' : 'bg-white text-slate-400 border border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-[9px] font-black text-slate-400 uppercase">Período:</span>
              <input 
                type="date" 
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[10px] font-black outline-none text-[#064e3b]"
                value={filtroDataImpressao}
                onChange={(e) => { setFiltroDataImpressao(e.target.value); setPagVendas(1); }}
              />
              <button 
                onClick={imprimirRelatorio}
                className="bg-[#064e3b] text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2"
              >
                <span>🖨️</span> Imprimir Relatório
              </button>
            </div>
          )}
        </div>

        {/* LISTAGEM SCROLLÁVEL */}
        <div id="printable-area" className="flex-1 overflow-y-auto p-6 bg-slate-50/30 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-4">
            
            {/* Título Visível Apenas na Impressão */}
            <div className="hidden print:block border-b-4 border-[#b49157] pb-4 mb-8">
               <h1 className="text-3xl font-black text-[#064e3b] uppercase">Relatório de Vendas Analu</h1>
               <p className="text-sm font-bold text-slate-500">DATA: {filtroDataImpressao.split('-').reverse().join('/')}</p>
            </div>

            {abaAtiva === "estoque" ? (
              listaEstoque.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-center group transition-all hover:shadow-md no-print">
                  <div className="text-left w-full md:w-auto">
                    <span className="text-[8px] font-black text-[#b49157] uppercase tracking-widest">{p.id}</span>
                    <h3 className="text-lg font-black text-[#064e3b] uppercase leading-tight">{p.modelo}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{p.acabamento}</p>
                  </div>

                  <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between border-t md:border-0 pt-4 md:pt-0">
                    <div className="text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase">Preço Vitrine</p>
                      <p className="text-lg font-black text-slate-800">R$ {p.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>

                    {vendaEmCurso === p.id ? (
                      <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-emerald-100">
                        <select className="text-[9px] font-black border rounded p-1 outline-none" onChange={(e) => setDadosVenda({...dadosVenda, vendedor: e.target.value})}>
                          <option value="">VENDEDOR</option>
                          {vendedoresEquipe.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <select className="text-[9px] font-black border rounded p-1 outline-none" onChange={(e) => setDadosVenda({...dadosVenda, pagamento: e.target.value})}>
                          <option value="">FORMA PGTO</option>
                          {formasPagamento.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <div className="flex gap-2">
                          <button onClick={() => finalizarVenda(p.id)} className="bg-emerald-600 text-white text-[8px] font-black px-4 py-1.5 rounded-lg uppercase">Concluir</button>
                          <button onClick={() => setVendaEmCurso(null)} className="text-rose-500 text-[8px] font-black uppercase">Cancelar</button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setVendaEmCurso(p.id)}
                        className="bg-[#064e3b] text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#b49157] transition-all"
                      >
                        Lançar Venda
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              listaVendas.length > 0 ? (
                listaVendas.map(v => (
                  <div key={v.id} className="venda-card-print bg-white p-5 rounded-2xl border-l-4 border-l-[#b49157] flex justify-between items-center shadow-sm">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-black bg-slate-100 px-2 py-0.5 rounded text-slate-500">{v.dataVenda.split('-').reverse().join('/')}</span>
                        <span className="text-[8px] font-black text-[#b49157] uppercase tracking-widest">{v.pagamento}</span>
                      </div>
                      <h3 className="text-md font-black text-[#064e3b] uppercase">{v.modelo}</h3>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Vendedor(a): <span className="text-slate-700 underline">{v.vendedor}</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-800">R$ {v.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      <span className="text-[8px] font-black text-emerald-500 uppercase no-print italic">Saída Confirmada</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center opacity-30 font-black uppercase text-sm tracking-[0.4em]">Nenhuma venda nesta data</div>
              )
            )}
            
            {/* Totalizador na Impressão */}
            <div className="hidden print:block mt-10 text-right border-t-2 border-black pt-4">
               <p className="text-sm font-black uppercase">Volume Total do Período</p>
               <h2 className="text-3xl font-black text-[#064e3b]">R$ {vendasData.reduce((acc, v) => acc + v.preco, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h2>
            </div>
          </div>
        </div>

        {/* PAGINAÇÃO FIXA */}
        <div className="p-4 border-t bg-white flex justify-center items-center gap-8 shrink-0 no-print">
          <button 
            disabled={abaAtiva === "estoque" ? pagEstoque === 1 : pagVendas === 1}
            onClick={() => abaAtiva === "estoque" ? setPagEstoque(p => p - 1) : setPagVendas(p => p - 1)}
            className="text-[10px] font-black text-slate-400 hover:text-[#064e3b] disabled:opacity-10 uppercase"
          >
            〈 Anterior
          </button>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {abaAtiva === "estoque" ? `Pág ${pagEstoque} de ${totalPagEstoque}` : `Pág ${pagVendas} de ${totalPagVendas}`}
          </span>
          <button 
            disabled={abaAtiva === "estoque" ? pagEstoque === totalPagEstoque : pagVendas === totalPagVendas}
            onClick={() => abaAtiva === "estoque" ? setPagEstoque(p => p + 1) : setPagVendas(p => p + 1)}
            className="text-[10px] font-black text-slate-400 hover:text-[#064e3b] disabled:opacity-10 uppercase"
          >
            Próxima 〉
          </button>
        </div>

        {/* RODAPÉ */}
        <div className="bg-slate-100 p-3 flex justify-between items-center px-8 shrink-0 no-print">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em]">Rickman Architecture • 2026</p>
          <div className="flex gap-4 items-center">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[8px] font-black text-emerald-500 uppercase">Sistema Operacional Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaLoja;