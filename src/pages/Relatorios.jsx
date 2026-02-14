/**
 * @file Relatorios.jsx
 * @description Relatórios Gerenciais de Vendas 
 * @author © 2026 Minister Noiret • Software Engineering
 */

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx'; 
import { 
  Download, Printer, Search, Filter, Calendar, 
  ChevronLeft, ChevronRight, ArrowUp, ArrowDown, 
  TrendingUp, DollarSign, Users, ShoppingBag 
} from 'lucide-react';

// --- MOCK DATA ---
const gerarDados = () => {
  const dados = [];
  const statusList = ['CONCLUÍDO', 'PENDENTE', 'CANCELADO', 'EM_ROTA'];
  const vendedores = ['Ana Silva', 'Carlos Eduardo', 'Roberto Campos', 'Mariana X.'];
  const produtos = ['Sofá Chesterfield', 'Poltrona Eames', 'Mesa de Jantar', 'Cadeira Office'];

  for (let i = 1; i <= 64; i++) {
    dados.push({
      id: `#PED-${1000 + i}`,
      data: `2026-02-${Math.floor(Math.random() * 28) + 1}`.replace(/-(\d)$/, '-0$1'),
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
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina] = useState(10);
  const [ordenacao, setOrdenacao] = useState({ campo: 'data', direcao: 'desc' });
  const [loadingExport, setLoadingExport] = useState(false);

  // Lógica de Filtro
  const dadosFiltrados = useMemo(() => {
    let lista = DADOS_VENDAS.filter(item => {
      const matchTexto = 
        item.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        item.vendedor.toLowerCase().includes(busca.toLowerCase()) ||
        item.id.toLowerCase().includes(busca.toLowerCase());
      const matchStatus = filtroStatus === "TODOS" ? true : item.status === filtroStatus;
      return matchTexto && matchStatus;
    });

    lista.sort((a, b) => {
      if (a[ordenacao.campo] < b[ordenacao.campo]) return ordenacao.direcao === 'asc' ? -1 : 1;
      if (a[ordenacao.campo] > b[ordenacao.campo]) return ordenacao.direcao === 'asc' ? 1 : -1;
      return 0;
    });

    return lista;
  }, [busca, filtroStatus, ordenacao]);


  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const dadosAtuais = dadosFiltrados.slice(indexPrimeiro, indexUltimo);
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);

  const totalFaturado = dadosFiltrados.reduce((acc, item) => acc + item.valor, 0);
  const ticketMedio = totalFaturado / (dadosFiltrados.length || 1);

  const exportarExcel = () => {
    setLoadingExport(true);
    setTimeout(() => {
      const ws = XLSX.utils.json_to_sheet(dadosFiltrados);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Relatorio_Vendas");
      XLSX.writeFile(wb, "Analu_Relatorio.xlsx");
      setLoadingExport(false);
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSort = (campo) => {
    const isAsc = ordenacao.campo === campo && ordenacao.direcao === 'asc';
    setOrdenacao({ campo, direcao: isAsc ? 'desc' : 'asc' });
  };

  return (
    <div className="animate-fade-in font-sans pb-20 print:pb-0 print:bg-white print:text-black">
      <style>{`
        @media print {
          @page { margin: 10mm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .quebra-pagina { break-inside: avoid; }
        }
        .print-only { display: none; }
      `}</style>

      {/* --- CABEÇALHO DE IMPRESSÃO (Só aparece no papel) --- */}
      <div className="print-only mb-8 border-b-2 border-[#064e3b] pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#b49157] rounded-lg flex items-center justify-center text-white font-black text-2xl border border-black">A</div>
            <div>
              <h1 className="text-3xl font-black text-[#064e3b] uppercase tracking-tighter">ANALU</h1>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-[0.3em]">Indústria de Estofados</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p className="font-bold">CNPJ: 00.000.000/0001-00</p>
            <p>Rua da Fábrica, 123 - Distrito Industrial</p>
            <p>Emitido em: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-black uppercase border-y-2 border-gray-200 py-2">Relatório Gerencial de Vendas</h2>
        </div>
      </div>

      {/* --- HEADER TELA (Some na impressão) --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 no-print">
        <div>
          <h1 className="text-3xl font-black text-[#064e3b] uppercase tracking-tighter">
            Relatórios <span className="text-[#b49157] font-light italic">& Analytics</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Análise de Desempenho Comercial • Fev/2026
          </p>
        </div>
        
        <div className="flex gap-2">
          <button onClick={handlePrint} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-xs font-black uppercase hover:bg-slate-50 transition-all shadow-sm">
            <Printer size={16} /> Imprimir Relatório
          </button>
          <button onClick={exportarExcel} disabled={loadingExport} className="flex items-center gap-2 bg-[#064e3b] text-white px-6 py-2 rounded-lg text-xs font-black uppercase hover:bg-[#08634b] transition-all shadow-lg hover:shadow-emerald-900/20 disabled:opacity-50">
            {loadingExport ? 'Gerando...' : <><Download size={16} /> Exportar Excel</>}
          </button>
        </div>
      </div>

      {/* --- RESUMO EXECUTIVO (KPIs) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 print:grid-cols-4 print:gap-2 print:mb-6">
        {/* Card 1 */}
        <div className="bg-white p-6 print:p-3 rounded-2xl border border-slate-100 shadow-sm print:shadow-none print:border-gray-300 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Faturamento</p>
            <p className="text-2xl print:text-lg font-black text-[#064e3b]">R$ {totalFaturado.toLocaleString('pt-BR')}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 no-print"><DollarSign size={20} /></div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 print:p-3 rounded-2xl border border-slate-100 shadow-sm print:shadow-none print:border-gray-300 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pedidos</p>
            <p className="text-2xl print:text-lg font-black text-blue-600">{dadosFiltrados.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 no-print"><ShoppingBag size={20} /></div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 print:p-3 rounded-2xl border border-slate-100 shadow-sm print:shadow-none print:border-gray-300 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Médio</p>
            <p className="text-2xl print:text-lg font-black text-[#b49157]">R$ {ticketMedio.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#b49157] no-print"><TrendingUp size={20} /></div>
        </div>
        {/* Card 4  */}
        <div className="bg-white p-6 print:p-3 rounded-2xl border border-slate-100 shadow-sm print:shadow-none print:border-gray-300 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Conversão</p>
            <p className="text-2xl print:text-lg font-black text-rose-500">18.4%</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 no-print"><Users size={20} /></div>
        </div>
      </div>

      {/* --- FILTROS (Some na impressão) --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between no-print">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Buscar..." 
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
            </select>
            <Filter className="absolute left-3 top-2.5 text-slate-400" size={16} />
          </div>
        </div>
      </div>

      {/* --- TABELA DE DADOS --- */}
      {/* Na impressão: remove bordas arredondadas e sombras */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden print:shadow-none print:border-0 print:rounded-none">
        
        {/* Aviso de filtro na impressão */}
        <div className="print-only mb-2 text-xs text-gray-500 italic">
          * Relatório filtrado por: {filtroStatus} | Busca: "{busca}"
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            {/* O bg-[#064e3b] será forçado a aparecer pelo CSS print-color-adjust */}
            <tr className="bg-[#064e3b] text-white text-[10px] uppercase font-black tracking-wider print:bg-gray-200 print:text-black print:border-b-2 print:border-black">
              <th className="px-6 py-4 print:px-2 print:py-2">ID</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Data</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Cliente</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Produto</th>
              <th className="px-6 py-4 print:px-2 print:py-2">Vendedor</th>
              <th className="px-6 py-4 print:px-2 print:py-2 text-right">Valor</th>
              <th className="px-6 py-4 print:px-2 print:py-2 text-center">Status</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 print:divide-gray-300">
            {/* Renderiza APENAS A PÁGINA ATUAL na TELA */}
            {dadosAtuais.map((item, index) => (
              <tr key={`screen-${index}`} className="hover:bg-slate-50 transition-colors text-xs font-medium text-slate-600 no-print">
                <td className="px-6 py-4 font-bold text-[#b49157] font-mono">{item.id}</td>
                <td className="px-6 py-4">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4 font-bold text-slate-700">{item.cliente}</td>
                <td className="px-6 py-4">{item.produto} <span className="text-slate-400">({item.qtd})</span></td>
                <td className="px-6 py-4">{item.vendedor}</td>
                <td className="px-6 py-4 font-black text-slate-800 text-right">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${item.status === 'CONCLUÍDO' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>{item.status}</span>
                </td>
              </tr>
            ))}

            {/* Renderiza TUDO na IMPRESSÃO  */}
            {dadosFiltrados.map((item, index) => (
              <tr key={`print-${index}`} className="text-[10px] text-black border-b border-gray-200 print-only quebra-pagina">
                <td className="px-2 py-1 font-bold">{item.id}</td>
                <td className="px-2 py-1">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                <td className="px-2 py-1">{item.cliente}</td>
                <td className="px-2 py-1">{item.produto} ({item.qtd})</td>
                <td className="px-2 py-1">{item.vendedor}</td>
                <td className="px-2 py-1 text-right font-bold">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="px-2 py-1 text-center font-bold">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- PAGINAÇÃO (Some na impressão) --- */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-between items-center no-print">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Mostrando página {paginaAtual}</p>
          <div className="flex gap-2">
            <button onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))} disabled={paginaAtual === 1} className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50"><ChevronLeft size={16} /></button>
            <button onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))} disabled={paginaAtual === totalPaginas} className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* --- ÁREA DE ASSINATURAS (Só aparece na impressão) --- */}
      <div className="print-only mt-16 pt-8 break-inside-avoid">
        <div className="grid grid-cols-2 gap-20">
          <div className="text-center">
            <div className="border-t border-black w-3/4 mx-auto mb-2"></div>
            <p className="font-bold text-xs uppercase">Gerente Comercial</p>
          </div>
          <div className="text-center">
            <div className="border-t border-black w-3/4 mx-auto mb-2"></div>
            <p className="font-bold text-xs uppercase">Diretoria Financeira</p>
          </div>
        </div>
        <div className="text-center mt-10 text-[9px] text-gray-400">
          Documento confidencial gerado pelo Sistema Analu. Uso interno exclusivo.
        </div>
      </div>

    </div>
  );
}

export default Relatorios;