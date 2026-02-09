/**
 * @file AreaLoja.jsx
 * @description Gestão Comercial com Dual-View: Operacional (Loja) e Gerencial (Admin)
 * @author © 2026 Rickman Brown • Software Engineering
 */

import { useState, useEffect } from "react";
import "../App.css";

const mockEstoqueLoja = [
  { id: "LJ-CH-001", modelo: "Sofá Chesterfield 3 Lugares", categoria: "Sofás", acabamento: "Couro Legítimo", preco: 8500.00, custo: 4200.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
  { id: "COS-SK-022", modelo: "Kit Skin Care Advanced", categoria: "Cosméticos", acabamento: "Sérum + Hidratante", preco: 249.90, custo: 90.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
  { id: "LJ-EAM-042", modelo: "Poltrona Charles Eames", categoria: "Poltronas", acabamento: "Pau-Ferro / Preto", preco: 4200.00, custo: 1800.00, status: "VENDIDO", vendedor: "Mestre Ricardo", dataVenda: "2026-02-09", pagamento: "Pix" },
  { id: "LJ-SL-003", modelo: "Sofá Retrátil Slim", categoria: "Sofás", acabamento: "Linho Cinza", preco: 5800.00, custo: 2900.00, status: "DISPONÍVEL", vendedor: null, dataVenda: null, pagamento: null },
];

const vendedoresEquipe = ["Ana Paula", "Juliana Silva", "Fernanda Costa", "Mestre Ricardo"];
const formasPagamento = ["Dinheiro", "Pix", "Cartão de Crédito", "Cartão de Débito", "Boleto"];

function AreaLoja({ userRole }) {
  const [abaAtiva, setAbaAtiva] = useState("estoque");
  const [produtos, setProdutos] = useState(mockEstoqueLoja);
  const [categoriaFiltro, setCategoriaFiltro] = useState("TODOS");
  
  const [pagEstoque, setPagEstoque] = useState(1);
  const [pagVendas, setPagVendas] = useState(1);
  const itensPorPagina = 4;

  const [vendaEmCurso, setVendaEmCurso] = useState(null);
  const [dadosVenda, setDadosVenda] = useState({ vendedor: "", pagamento: "" });
  const [filtroDataImpressao, setFiltroDataImpressao] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  // Lógica de Filtros
  const estoqueFiltrado = produtos.filter(p => (categoriaFiltro === "TODOS" || p.categoria === categoriaFiltro) && p.status === "DISPONÍVEL");
  const totalPagEstoque = Math.max(1, Math.ceil(estoqueFiltrado.length / itensPorPagina));
  const listaEstoque = estoqueFiltrado.slice((pagEstoque - 1) * itensPorPagina, pagEstoque * itensPorPagina);

  const vendasData = produtos.filter(p => p.status === "VENDIDO" && p.dataVenda === filtroDataImpressao);
  const totalPagVendas = Math.max(1, Math.ceil(vendasData.length / itensPorPagina));
  const listaVendas = vendasData.slice((pagVendas - 1) * itensPorPagina, pagVendas * itensPorPagina);

  // KPIs Exclusivos do ADMIN
  const totalVendasValor = vendasData.reduce((acc, v) => acc + v.preco, 0);
  const lucroEstimado = vendasData.reduce((acc, v) => acc + (v.preco - v.custo), 0);

  const finalizarVenda = (id) => {
    if (!dadosVenda.vendedor || !dadosVenda.pagamento) return alert("Credenciais de venda incompletas.");
    setProdutos(produtos.map(p => 
      p.id === id ? { ...p, status: "VENDIDO", vendedor: dadosVenda.vendedor, pagamento: dadosVenda.pagamento, dataVenda: new Date().toISOString().split('T')[0] } : p
    ));
    setVendaEmCurso(null);
    setDadosVenda({ vendedor: "", pagamento: "" });
  };

  return (
    <div className="fixed inset-0 bg-[#f8f9f5] flex flex-col overflow-hidden px-4 md:px-8 py-6 animate-fade-in font-sans">
      
      <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">

        {/* HEADER DINÂMICO BASEADO NA ROLE */}
        <div className={`p-6 text-white shrink-0 no-print transition-colors ${userRole === 'ADMIN' ? 'bg-[#1e293b]' : 'bg-[#064e3b]'}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b49157] mb-1">
                {userRole === 'ADMIN' ? 'Governança Unidade Loja' : 'Terminal Comercial'}
              </p>
              <h2 className="text-2xl font-black uppercase tracking-tighter">
                {userRole === 'ADMIN' ? 'Painel de Controle' : 'Área da Loja'}
              </h2>
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => setAbaAtiva("estoque")} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${abaAtiva === "estoque" ? 'bg-[#b49157]' : 'bg-white/10'}`}>Vitrine</button>
              <button onClick={() => setAbaAtiva("vendas")} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${abaAtiva === "vendas" ? 'bg-[#b49157]' : 'bg-white/10'}`}>Relatórios</button>
            </div>
          </div>

          {/* INDICADORES EXCLUSIVOS ADMIN */}
          {userRole === "ADMIN" && abaAtiva === "vendas" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 animate-slide-up">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-[8px] font-black uppercase text-slate-400">Receita Bruta</p>
                <p className="text-lg font-black text-[#b49157]">R$ {totalVendasValor.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-[8px] font-black uppercase text-slate-400">Margem Estimada</p>
                <p className="text-lg font-black text-emerald-400">R$ {lucroEstimado.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* BARRA DE FERRAMENTAS */}
        <div className="bg-slate-50 border-b p-3 flex justify-between items-center px-6 no-print">
          {abaAtiva === "estoque" ? (
            <div className="flex gap-2">
              {["TODOS", "Sofás", "Poltronas", "Cosméticos"].map(cat => (
                <button key={cat} onClick={() => setCategoriaFiltro(cat)} className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${categoriaFiltro === cat ? 'bg-[#064e3b] text-white' : 'bg-white text-slate-400'}`}>{cat}</button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <input type="date" className="bg-white border rounded-lg px-3 py-1 text-[10px] font-black" value={filtroDataImpressao} onChange={(e) => setFiltroDataImpressao(e.target.value)} />
              {userRole === "ADMIN" && (
                <button onClick={() => window.print()} className="bg-black text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase">🖨️ Master Print</button>
              )}
            </div>
          )}
        </div>

        {/* CONTEÚDO */}
        <div id="printable-area" className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          <div className="max-w-4xl mx-auto space-y-4">
            {abaAtiva === "estoque" ? (
              listaEstoque.map(p => (
                <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-100 flex justify-between items-center no-print">
                  <div className="text-left">
                    <span className="text-[8px] font-black text-[#b49157] uppercase">{p.id}</span>
                    <h3 className="text-lg font-black text-[#064e3b] uppercase leading-tight">{p.modelo}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{p.acabamento}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-800">R$ {p.preco.toLocaleString()}</p>
                      {userRole === "ADMIN" && <p className="text-[8px] font-bold text-rose-400 uppercase tracking-tighter">Custo: R$ {p.custo}</p>}
                    </div>

                    {userRole === "LOJA" && (
                       vendaEmCurso === p.id ? (
                        <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-emerald-100 animate-fade-in">
                          <select className="text-[9px] font-black border rounded p-1" onChange={(e) => setDadosVenda({...dadosVenda, vendedor: e.target.value})}>
                            <option value="">VENDEDOR</option>
                            {vendedoresEquipe.map(v => <option key={v} value={v}>{v}</option>)}
                          </select>
                          <select className="text-[9px] font-black border rounded p-1" onChange={(e) => setDadosVenda({...dadosVenda, pagamento: e.target.value})}>
                            <option value="">PAGAMENTO</option>
                            {formasPagamento.map(f => <option key={f} value={f}>{f}</option>)}
                          </select>
                          <button onClick={() => finalizarVenda(p.id)} className="bg-emerald-600 text-white text-[8px] font-black py-1.5 rounded-lg uppercase">Concluir</button>
                        </div>
                      ) : (
                        <button onClick={() => setVendaEmCurso(p.id)} className="bg-[#064e3b] text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#b49157] transition-all">Lançar Venda</button>
                      )
                    )}
                  </div>
                </div>
              ))
            ) : (
              // VISÃO DE VENDAS (HISTÓRICO)
              listaVendas.map(v => (
                <div key={v.id} className="bg-white p-5 rounded-2xl border-l-4 border-l-[#b49157] flex justify-between items-center shadow-sm">
                  <div className="text-left">
                    <h3 className="text-md font-black text-[#064e3b] uppercase">{v.modelo}</h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Vendedor: {v.vendedor} | {v.pagamento}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-800">R$ {v.preco.toLocaleString()}</p>
                    {userRole === "ADMIN" && <p className="text-[8px] font-black text-emerald-500 uppercase">Margem: R$ {(v.preco - v.custo).toLocaleString()}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PAGINAÇÃO */}
        <div className="p-4 border-t bg-white flex justify-center items-center gap-8 no-print">
          <button disabled={abaAtiva === "estoque" ? pagEstoque === 1 : pagVendas === 1} onClick={() => abaAtiva === "estoque" ? setPagEstoque(p => p - 1) : setPagVendas(p => p - 1)} className="text-[10px] font-black text-slate-400 uppercase">〈 Anterior</button>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{abaAtiva === "estoque" ? pagEstoque : pagVendas}</span>
          <button disabled={abaAtiva === "estoque" ? pagEstoque === totalPagEstoque : pagVendas === totalPagVendas} onClick={() => abaAtiva === "estoque" ? setPagEstoque(p => p + 1) : setPagVendas(p => p + 1)} className="text-[10px] font-black text-slate-400 uppercase">Próxima 〉</button>
        </div>
      </div>
    </div>
  );
}

export default AreaLoja;