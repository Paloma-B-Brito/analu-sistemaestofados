/**
 * @file Relatorios.jsx
 * @description Central de Inteligência - Relatórios Avançados com Exportação e Analytics
 * @author © 2026 Minister Noiret • Software Engineering
 */

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx'; // Lib para Excel
import { 
  Download, Printer, Search, Filter, Calendar, 
  ChevronLeft, ChevronRight, ArrowUp, ArrowDown, 
  TrendingUp, DollarSign, Users, ShoppingBag 
} from 'lucide-react';

// --- MOCK DATA GENERATOR (Simulando 50+ Vendas) ---
const gerarDados = () => {
  const dados = [];
  const statusList = ['CONCLUÍDO', 'PENDENTE', 'CANCELADO', 'EM_ROTA'];
  const vendedores = ['Ana Silva', 'Carlos Eduardo', 'Roberto Campos', 'Mariana X.'];
  const produtos = ['Sofá Chesterfield', 'Poltrona Eames', 'Mesa de Jantar', 'Cadeira Office'];

  for (let i = 1; i <= 64; i++) {
    dados.push({
      id: `#PED-${1000 + i}`,
      data: `2026-02-${Math.floor(Math.random() * 28) + 1}`.replace(/-(\d)$/, '-0$1'), // Data aleatória
      cliente: `Cliente ${String.fromCharCode(65 + Math.floor(Math.random() * 26))} - Empresa`,
      vendedor: vendedores[Math.floor(Math.random() * vendedores.length)],
      produto: produtos[Math.floor(Math.random() * produtos.length)],
      qtd: Math.floor(Math.random() * 5) + 1,
      valor: Math.floor(Math.random() * 5000) + 1200,
      status: statusList[Math.floor(Math.random() * statusList.length)]
    });
  }
  return dados;
};

const DADOS_VENDAS = gerarDados();

function Relatorios() {
  // --- STATES ---
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10);
  const [ordenacao, setOrdenacao] = useState({ campo: 'data', direcao: 'desc' });
  const [loadingExport, setLoadingExport] = useState(false);

  // --- LÓGICA DE FILTRO & ORDENAÇÃO ---
  const dadosFiltrados = useMemo(() => {
    let lista = DADOS_VENDAS.filter(item => {
      const matchTexto = 
        item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        item.vendedor.toLowerCase().includes(busca.toLowerCase()) ||
        item.id.toLowerCase().includes(busca.toLowerCase());
      
      const matchStatus = filtroStatus === "TODOS" ? true : item.status === filtroStatus;
      
      return matchTexto && matchStatus;
    });

    // Ordenação
    lista.sort((a, b) => {
      if (a[ordenacao.campo] < b[ordenacao.campo]) return ordenacao.direcao === 'asc' ? -1 : 1;
      if (a[ordenacao.campo] > b[ordenacao.campo]) return ordenacao.direcao === 'asc' ? 1 : -1;
      return 0;
    });

    return lista;
  }, [busca, filtroStatus, ordenacao]);

  // --- PAGINAÇÃO ---
  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const dadosAtuais = dadosFiltrados.slice(indexPrimeiro, indexUltimo);
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  // --- EXPORTAR PARA EXCEL ---
  const exportarExcel = () => {
    setLoadingExport(true);
    setTimeout(() => {
      const ws = XLSX.utils.json_to_sheet(dadosFiltrados);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Relatorio_Vendas_2026");
      XLSX.writeFile(wb, "Analu_Relatorio_Gerencial.xlsx");
      setLoadingExport(false);
    }, 1000); // Fake delay para UX
  };

  // --- IMPRIMIR ---
  const handlePrint = () => {
    window.print();
  };

  // --- SORT HANDLER ---
  const handleSort = (campo) => {
    const isAsc = ordenacao.campo === campo && ordenacao.direcao === 'asc';
    setOrdenacao({ campo, direcao: isAsc ? 'desc' : 'asc' });
  };

  // --- CÁLCULO DE TOTAIS (KPIS) ---
  const totalFaturado = dadosFiltrados.reduce((acc, item) => acc + item.valor, 0);
  const ticketMedio = totalFaturado / (dadosFiltrados.length || 1);

  return (
    <div className="animate-fade-in font-sans pb-20 print:pb-0">
      
      {/* --- HEADER SUPERIOR --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 print:hidden">
        <div>
          <h1 className="text-3xl font-black text-[#064e3b] uppercase tracking-tighter">
            Relatórios <span className="text-[#b49157] font-light italic">& Analytics</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Análise de Desempenho Comercial • Fev/2026
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-black uppercase hover:bg-slate-50 transition-all shadow-sm"
          >
            <Printer size={16} /> Imprimir PDF
          </button>
          <button 
            onClick={exportarExcel}
            disabled={loadingExport}
            className="flex items-center gap-2 bg-[#064e3b] text-white px-6 py-2 rounded-lg text-xs font-black uppercase hover:bg-[#08634b] transition-all shadow-lg hover:shadow-emerald-900/20 disabled:opacity-50"
          >
            {loadingExport ? 'Gerando...' : <><Download size={16} /> Exportar Excel</>}
          </button>
        </div>
      </div>

      {/* --- KPIs CARDS (RESUMO) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 print:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faturamento Total</p>
            <p className="text-2xl font-black text-[#064e3b]">R$ {totalFaturado.toLocaleString('pt-BR')}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700"><DollarSign size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pedidos Filtrados</p>
            <p className="text-2xl font-black text-blue-600">{dadosFiltrados.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700"><ShoppingBag size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Médio</p>
            <p className="text-2xl font-black text-[#b49157]">R$ {ticketMedio.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#b49157]"><TrendingUp size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversão</p>
            <p className="text-2xl font-black text-rose-500">18.4%</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700"><Users size={20} /></div>
        </div>
      </div>

      {/* --- CONTROLES DE FILTRO --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between print:hidden">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Buscar pedido, cliente ou vendedor..." 
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPaginaAtual(1); }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#b49157] transition-colors"
            />
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
          
          <div className="relative">
            <select 
              value={filtroStatus}
              onChange={(e) => { setFiltroStatus(e.target.value); setPaginaAtual(1); }}
              className="pl-10 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold uppercase text-slate-600 focus:outline-none appearance-none cursor-pointer hover:bg-slate-100"
            >
              <option value="TODOS">Todos Status</option>
              <option value="CONCLUÍDO">Concluídos</option>
              <option value="PENDENTE">Pendentes</option>
              <option value="CANCELADO">Cancelados</option>
              <option value="EM_ROTA">Em Rota</option>
            </select>
            <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
          <Calendar size={14} /> Período: Fev/2026
        </div>
      </div>

      {/* --- TABELA COMPLEXA --- */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#064e3b] text-white text-[10px] uppercase font-black tracking-wider">
                <th className="px-6 py-4 cursor-pointer hover:bg-[#08634b]" onClick={() => handleSort('id')}>
                  <div className="flex items-center gap-1">ID {ordenacao.campo === 'id' && (ordenacao.direcao === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-[#08634b]" onClick={() => handleSort('data')}>
                  <div className="flex items-center gap-1">Data {ordenacao.campo === 'data' && (ordenacao.direcao === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}</div>
                </th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Vendedor</th>
                <th className="px-6 py-4 cursor-pointer hover:bg-[#08634b]" onClick={() => handleSort('valor')}>
                   <div className="flex items-center gap-1">Valor {ordenacao.campo === 'valor' && (ordenacao.direcao === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />)}</div>
                </th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dadosAtuais.length > 0 ? (
                dadosAtuais.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group text-xs font-medium text-slate-600">
                    <td className="px-6 py-4 font-bold text-[#b49157] font-mono">{item.id}</td>
                    <td className="px-6 py-4">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                    <td className="px-6 py-4 font-bold text-slate-700">{item.cliente}</td>
                    <td className="px-6 py-4">
                      {item.produto} <span className="text-[9px] text-slate-400 ml-1">({item.qtd}x)</span>
                    </td>
                    <td className="px-6 py-4">{item.vendedor}</td>
                    <td className="px-6 py-4 font-black text-slate-800">
                      R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase
                        ${item.status === 'CONCLUÍDO' ? 'bg-emerald-100 text-emerald-700' : 
                          item.status === 'PENDENTE' ? 'bg-amber-100 text-amber-700' :
                          item.status === 'CANCELADO' ? 'bg-rose-100 text-rose-700' : 
                          'bg-blue-100 text-blue-700'}
                      `}>
                        {item.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-slate-400 font-bold uppercase text-xs">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINAÇÃO FOOTER --- */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center print:hidden">
          <p className="text-[10px] font-bold text-slate-500 uppercase">
            Mostrando {indexPrimeiro + 1} a {Math.min(indexUltimo, dadosFiltrados.length)} de {dadosFiltrados.length} resultados
          </p>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: Math.min(totalPaginas, 5) }, (_, i) => {
              // Lógica simples para mostrar páginas próximas (pode ser melhorada para muitos dados)
              let pageNum = i + 1; 
              if (totalPaginas > 5 && paginaAtual > 3) pageNum = paginaAtual - 2 + i;
              if (pageNum > totalPaginas) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => setPaginaAtual(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-black ${
                    paginaAtual === pageNum 
                    ? 'bg-[#064e3b] text-white shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 print:block hidden">
        <p className="text-[10px] text-slate-400 uppercase">Relatório gerado automaticamente pelo Sistema Analu • {new Date().toLocaleDateString()}</p>
      </div>

    </div>
  );
}

export default Relatorios;