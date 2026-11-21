'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Coins, 
  ScrollText, 
  BookOpen, 
  AlertCircle, 
  ListFilter, 
  Inbox, 
  Settings,
  Plus,
  CircleDollarSign,
  TrendingDown,
  Trash2, 
  Sparkles
} from 'lucide-react';
import { TransactionModal } from '@/src/components/TransactionModal';
import { useFinance } from '@/src/contexts/FinanceContext';
import Link from 'next/link';

const atalhosBabilonia = [
  { title: 'Oráculo', subtitle: 'Projeções', icon: TrendingUp },
  { title: '9 Moedas', subtitle: 'Regra dos 10%', icon: Coins },
  { title: 'Tabuletas', subtitle: 'Quitar Dívidas', icon: ScrollText },
  { title: 'Arkad', subtitle: 'Mini Curso', icon: BookOpen },
];

export default function DashboardPage() {
  const [modalAberto, setModalAberto] = useState(false);

  // Consome os dados globais compartilhados
  const {
    adicionarTransacao,
    pinOuroConquistado,
    excluirTransacao,
    saldoDisponivel,
    metaPoupanca10,
    limiteGastos70,
    totalReceitas,
    totalDespesas,
    totalPoupancaAcumulada,
    transacoes,
    userName,
  } = useFinance();


  const metaDividas20 = totalReceitas * 0.20;
  // const limiteGastos70 = totalReceitas * 0.70;

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Gera as iniciais dinâmicas do usuário (ex: "Ronaldo Santos" -> "RS")
  const iniciais = userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'SN';

  return (
    <div className="sm:space-y-8 space-y-4">
       {/* Cabeçalho Responsivo: */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2E2E32]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full border-2 border-[#E5B83B] bg-[#121214] flex items-center justify-center text-[#E5B83B] font-bold text-base shrink-0">
            {iniciais}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#9CA3AF]">Boas-vindas,</p>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-bold text-white truncate">{userName}</h2>
              {pinOuroConquistado && (
                <span
                  title="Pin de Ouro da Babilônia Conquistado"
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#332B14] border border-[#E5B83B]/50 text-[#E5B83B] uppercase tracking-wider"
                >
                  Pin de Ouro
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setModalAberto(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Transação</span>
          </button>

          {/* <Link href="/configuracoes">
            <button
              title="Configurações"
              className="p-2.5 rounded-full bg-[#121214] border border-[#2E2E32] text-[#9CA3AF] hover:text-[#E5B83B] hover:border-[#E5B83B] transition-all cursor-pointer shrink-0"
            >
              <Settings className="w-5 h-5" />
            </button>
          </Link> */}
        </div>
      </header>

      {/* Grid Principal de 2 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA (5 colunas) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Ouro Total Acumulado */}
          <div className="bg-[#121214] border border-[#E06C65] rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Ouro Total Acumulado
              </span>
              <div className="p-2 rounded-lg bg-[#332B14] text-[#E5B83B]">
                <Coins className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-end justify-between mt-4">
              <div>
                {transacoes.length > 0 ? (
                  <p className={`text-3xl font-bold ${saldoDisponivel >= 0 ? 'text-white' : 'text-[#E06C65]'}`}>
                    {formatarMoeda(saldoDisponivel)}
                  </p>
                ) : (
                  <div className="flex items-center gap-2 text-[#E5B83B] italic text-sm">
                    <AlertCircle className="w-4 h-4 text-[#9CA3AF]" />
                    <span>Sem saldo disponível</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid dos 4 Atalhos da Babilônia */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
            {atalhosBabilonia.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  className="bg-[#121214] border border-[#2E2E32] hover:border-[#E5B83B] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all group text-center cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-[#18181B] text-[#E5B83B] group-hover:bg-[#332B14] transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-white">{item.title}</span>
                  <span className="text-[11px] text-[#9CA3AF]">{item.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Card Resumo da Regra 10 / 20 / 70 */}
          <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-wider text-[#E5B83B] uppercase">
                Projeção de Arkad
              </h3>
              <span className="text-xs text-[#9CA3AF]">
                Receita: {totalReceitas}
              </span>
            </div>

            <div className="space-y-3 text-sm pt-2">
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#18181B]">
                <span className="text-[#9CA3AF]">10% Pague-se primeiro</span>
                <span className="font-bold text-[#E5B83B]">{formatarMoeda(metaPoupanca10)}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#18181B]">
                <span className="text-[#9CA3AF]">20% Quitação de Dívidas</span>
                <span className="font-bold text-[#E06C65]">{formatarMoeda(metaDividas20)}</span>
              </div>
              <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#18181B]">
                <span className="text-[#9CA3AF]">70% Custo de Vida</span>
                <span className="font-bold text-white">{formatarMoeda(limiteGastos70)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card Resumo Mensal / Estado Vazio */}
          {transacoes.length === 0 ? (
            <div className="bg-[#121214] border border-[#E06C65] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[260px]">
              <div className="w-12 h-12 rounded-full bg-[#E06C65]/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7 text-[#E06C65]" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">
                Sem dados registrados neste mês!
              </h3>
              <p className="text-sm text-[#9CA3AF] max-w-sm mb-6">
                Adicione suas primeiras transações para ver o resumo de receitas versus despesas aqui.
              </p>

              <button 
                onClick={() => setModalAberto(true)}
                className="flex items-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span>Adicionar receita</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:space-y-6 space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-[#9CA3AF] uppercase">
                Balanço do Mês
              </h3>

              <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
                <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-4">
                  <span className="text-xs text-[#9CA3AF]">Total de Receitas</span>
                  <p className="text-2xl font-bold text-[#E5B83B] mt-1">
                    {formatarMoeda(totalReceitas)}
                  </p>
                </div>

                <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-4">
                  <span className="text-xs text-[#9CA3AF]">Total de Despesas</span>
                  <p className="text-2xl font-bold text-[#E06C65] mt-1">
                    {formatarMoeda(totalDespesas)}
                  </p>
                </div>

                <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-4">
                  <span className="text-xs text-[#9CA3AF]">Total de Poupança</span>
                  <p className="text-2xl font-bold text-[#4CAF50] mt-1">
                    {formatarMoeda(totalPoupancaAcumulada)}
                  </p>
                </div>

              </div>


              {/* Barra Visual de Uso dos 70% de Custo de Vida */}
              {totalReceitas > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#9CA3AF]">Uso do teto de 70% (Custo de vida)</span>
                    <span className="font-semibold text-white">
                      {Math.min(Math.round((totalDespesas / limiteGastos70) * 100), 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Card Últimas Transações */}
          <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="text-base font-bold text-white">Últimas Transações</h3>
              <p className="text-xs text-[#9CA3AF]">Veja suas últimas movimentações</p>
            </div>

            {transacoes.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-[#9CA3AF]">
                <Inbox className="w-12 h-12 mb-3 stroke-[1.5]" />
                <p className="text-sm">Nenhuma movimentação registrada ainda</p>
              </div>
            ) : (
              <div className="sm:space-y-3 space-y-2">
                {transacoes.map((transacao) => (
                  <div 
                    key={transacao.id} 
                    className="flex items-center justify-between p-4 rounded-xl border border-[#2E2E32] hover:border-[#E5B83B] transition-colors"
                  >
                    <div className="flex items-center gap-3 ">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transacao.tipo === 'receita' 
                          ? 'bg-[#332B14] text-[#E5B83B]' 
                          : 'bg-[#2E2E32] text-[#E06C65]'
                      }`}>
                        {transacao.tipo === 'receita' ? (
                          <CircleDollarSign className="w-5 h-5" />
                        ) : (
                          <TrendingDown className="w-5 h-5" />
                        )}
                      </div>
                      <div className='hidden sm:block'>
                        <p className="font-medium text-white">{transacao.descricao}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {new Date(transacao.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${
                        transacao.tipo === 'receita' ? 'text-[#E5B83B]' : 'text-[#E06C65]'
                      }`}>
                        {transacao.tipo === 'receita' ? '+' : '-'}{formatarMoeda(transacao.valor)}
                      </span>
                      <button 
                        onClick={() => excluirTransacao(transacao.id)}
                        className="p-2 rounded-lg hover:bg-[#2E2E32] text-[#9CA3AF] hover:text-[#E06C65] transition-colors"
                        title="Excluir transação"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Modal de Transação */}
      <TransactionModal     
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        onAddTransaction={ (transacao) => adicionarTransacao(transacao as any)}
      />
    </div>
  );
}
