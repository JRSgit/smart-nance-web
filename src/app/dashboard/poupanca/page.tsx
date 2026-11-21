'use client';

import { useState } from 'react';
import { 
  PiggyBank, 
  Coins, 
  TrendingUp, 
  Plus, 
  Calculator,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { useFinance } from '@/src/contexts/FinanceContext';

interface DepositoPoupanca {
  descricao: string;
  valor: number;
  data: string;
}

export default function PoupancaPage() {
  const { depositosPoupanca, adicionarDepositoPoupanca } = useFinance();
  const [valorAporte, setValorAporte] = useState('');
  const [descricaoAporte, setDescricaoAporte] = useState('');

  // Estados do Simulador de Juros da Babilônia
  const [aporteMensalSimulado, setAporteMensalSimulado] = useState('300');
  const [mesesSimulados, setMesesSimulados] = useState('24');
  const [taxaMensal, setTaxaMensal] = useState('0.8');

  const totalAcumulado = depositosPoupanca.reduce((acc, item) => acc + item.valor, 0);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAdicionarAporte = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(valorAporte.replace(',', '.')) || 0;
    if (valor <= 0) return;

    const novoDeposito: DepositoPoupanca = {
      descricao: descricaoAporte.trim() || '10% Pague-se primeiro',
      valor,
      data: new Date().toISOString().split('T')[0],
    };

    adicionarDepositoPoupanca(novoDeposito);
    setValorAporte('');
    setDescricaoAporte('');
  };

  // Cálculo de Juros Compostos para o Simulador
  const pmt = parseFloat(aporteMensalSimulado) || 0;
  const n = parseInt(mesesSimulados) || 1;
  const i = (parseFloat(taxaMensal) || 0) / 100;

  const montanteFinal = i > 0 
    ? pmt * ((Math.pow(1 + i, n) - 1) / i) 
    : pmt * n;
  const totalInvestido = pmt * n;
  const rendimentosGerados = montanteFinal - totalInvestido;

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2E2E32]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-[#332B14] border border-[#E5B83B]/40 text-[#E5B83B]">
            <PiggyBank className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#E5B83B] uppercase">
              1ª Cura de Arkad
            </span>
            <h1 className="text-2xl font-bold text-white">
              Tesouro & Poupança
            </h1>
          </div>
        </div>
      </header>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUNA ESQUERDA: Saldo e Novo Aporte (5 colunas) */}
        <div className="lg:col-span-5 space-y-6">
            
            {/* Card Ouro Acumulado */}
            <div className="bg-[#121214] border border-[#E5B83B] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase">
                    Ouro Guardado na Bolsa
                </span>
                <Coins className="w-5 h-5 text-[#E5B83B]" />
                </div>
                <p className="text-3xl font-bold text-white">
                {formatarMoeda(totalAcumulado)}
                </p>
                <p className="text-xs text-[#9CA3AF]">
                "Uma parte de tudo o que você ganha pertence a você."
                </p>
            </div>

            {/* Formulário de Novo Aporte */}
            <form 
                onSubmit={handleAdicionarAporte}
                className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-4"
            >
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Guardar Moedas (Novo Aporte)
                </h2>

                <div className="space-y-2">
                <label className="block text-xs text-[#9CA3AF]">Valor do aporte (R$):</label>
                <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={valorAporte}
                    onChange={(e) => setValorAporte(e.target.value)}
                    placeholder="0,00"
                    className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-4 py-3 text-sm font-bold text-white outline-none"
                />
                </div>

                <div className="space-y-2">
                <label className="block text-xs text-[#9CA3AF]">Origem / Descrição:</label>
                <input
                    type="text"
                    value={descricaoAporte}
                    onChange={(e) => setDescricaoAporte(e.target.value)}
                    placeholder="Ex: 10% do Salário, Renda Extra"
                    className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-4 py-3 text-sm text-white outline-none"
                />
                </div>

                <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
                >
                <Plus className="w-4 h-4" />
                <span>Adicionar ao Tesouro</span>
                </button>
            </form>
        </div>
     
        {/* COLUNA DIREITA: Simulador de Multiplicação + Histórico (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Simulador de Multiplicação de Ouro (3ª Cura) */}
          <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-[#E5B83B]" />
              <div>
                <h2 className="text-base font-bold text-white">
                  Simulador: Multiplique os Seus Rendimentos
                </h2>
                <p className="text-xs text-[#9CA3AF]">
                  Veja como suas moedas trabalham para você ao longo do tempo
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-[#9CA3AF]">Aporte Mensal (R$)</label>
                <input
                  type="number"
                  value={aporteMensalSimulado}
                  onChange={(e) => setAporteMensalSimulado(e.target.value)}
                  className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#9CA3AF]">Tempo (Meses)</label>
                <input
                  type="number"
                  value={mesesSimulados}
                  onChange={(e) => setMesesSimulados(e.target.value)}
                  className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#9CA3AF]">Rendimento (% ao mês)</label>
                <input
                  type="number"
                  step="0.1"
                  value={taxaMensal}
                  onChange={(e) => setTaxaMensal(e.target.value)}
                  className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-3 py-2 text-sm text-white outline-none"
                />
              </div>
            </div>

            {/* Resultado da Projeção */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-4">
                <span className="text-xs text-[#9CA3AF]">Total Guardado</span>
                <p className="text-base font-bold text-white mt-1">
                  {formatarMoeda(totalInvestido)}
                </p>
              </div>

              <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-4">
                <span className="text-xs text-[#9CA3AF]">Filhos do Ouro (Juros)</span>
                <p className="text-base font-bold text-[#E5B83B] mt-1">
                  +{formatarMoeda(rendimentosGerados)}
                </p>
              </div>

              <div className="bg-[#332B14]/50 border border-[#E5B83B]/40 rounded-xl p-4">
                <span className="text-xs text-[#E5B83B] font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Montante Final
                </span>
                <p className="text-lg font-bold text-white mt-1">
                  {formatarMoeda(montanteFinal)}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Depósitos na Poupança */}
          <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-white mb-4">Histórico de Aportes</h3>
                
                {depositosPoupanca.length === 0 ? (
                <p className="text-sm text-[#9CA3AF] text-center py-8">
                    Nenhum aporte registrado na poupança ainda.
                </p>
                ) : (
                <div className="space-y-3">
                    {depositosPoupanca.map((dep) => (
                    <div 
                        key={dep.id}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-[#18181B] border border-[#2E2E32]"
                    >
                        <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#332B14] text-[#E5B83B]">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-sm text-white">{dep.descricao}</p>
                            <p className="text-xs text-[#9CA3AF]">{new Date(dep.data + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                        </div>
                        <p className="text-sm font-bold text-white">
                            {formatarMoeda(dep.valor)}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    </div>
</div>
  )
}
