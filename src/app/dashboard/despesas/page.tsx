'use client';
import { useState, useEffect } from 'react';
import { 
  TrendingDown, 
  Plus, 
  Trash2, 
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { useFinance } from '@/src/contexts/FinanceContext';

interface DespesaItem {
  id: string;
  descricao: string;
  tipoGasto: 'Necessidade' | 'Desejo';
  valor: number;
  data: string;
  tipo: 'despesa';
}

export default function DespesasPage() {
  const {
    adicionarTransacao,
    excluirTransacao,
  } = useFinance();
  
  const { despesas } = useFinance();
  const [descricao, setDescricao] = useState('');
  const [tipoGasto, setTipoGasto] = useState<'Necessidade' | 'Desejo'>('Necessidade');
  const [valorInput, setValorInput] = useState('');
  const [data, setData] = useState<string | undefined>(undefined);

  useEffect(() => {
    setData(new Date().toISOString().split('T')[0]);
  }, []);

  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const totalNecessidades = despesas
    .filter((d) => d.tipoGasto === 'Necessidade')
    .reduce((acc, item) => acc + item.valor, 0);
  const totalDesejos = despesas
    .filter((d) => d.tipoGasto === 'Desejo')
    .reduce((acc, item) => acc + item.valor, 0);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAdicionarDespesa = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(valorInput.replace(',', '.')) || 0;
    if (valor <= 0) return;

    const nova: DespesaItem = {
      id: crypto.randomUUID(),
      descricao: descricao.trim() || 'Despesa',
      tipoGasto,
      valor,
      data: data || new Date().toISOString().split('T')[0],
      tipo: 'despesa',
    };

    adicionarTransacao(nova);
    setDescricao('');
    setValorInput('');
  };

  const handleExcluir = (id: string) => {
    excluirTransacao(id);
  };

  return (
    <div className="space-y-8">
      {/* Cabeçalho */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2E2E32]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-[#E06C65]/15 border border-[#E06C65]/40 text-[#E06C65]">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#E06C65] uppercase">
              2ª Cura de Arkad
            </span>
            <h1 className="text-2xl font-bold text-white">
              Controle de Despesas
            </h1>
          </div>
        </div>

        <div className="bg-[#121214] border border-[#E06C65]/40 px-5 py-3 rounded-xl">
          <span className="text-xs text-[#9CA3AF] block">Total Gasto no Mês</span>
          <span className="text-xl font-bold text-[#E06C65]">
            {formatarMoeda(totalDespesas)}
          </span>
        </div>
      </header>

      {/* Comparativo: Necessidades vs Desejos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5">
          <span className="text-xs text-[#9CA3AF]">Despesas Necessárias (Essenciais)</span>
          <p className="text-xl font-bold text-white mt-1">
            {formatarMoeda(totalNecessidades)}
          </p>
        </div>

        <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">Desejos Supérfluos (Atenção)</span>
            <p className="text-xl font-bold text-[#E06C65] mt-1">
              {formatarMoeda(totalDesejos)}
            </p>
          </div>
          <AlertTriangle className="w-6 h-6 text-[#E06C65]/70" />
        </div>
      </div>

      {/* Formulário + Lista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulário (4 colunas) */}
        <form 
          onSubmit={handleAdicionarDespesa}
          className="lg:col-span-4 bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-4 self-start"
        >
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Nova Despesa
          </h2>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Valor (R$):</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              placeholder="0,00"
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E06C65] rounded-lg px-4 py-3 text-base font-bold text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Classificação de Arkad:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTipoGasto('Necessidade')}
                className={`py-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  tipoGasto === 'Necessidade'
                    ? 'bg-[#27272A] border-white text-white'
                    : 'bg-[#18181B] border-[#2E2E32] text-[#9CA3AF]'
                }`}
              >
                Necessidade
              </button>
              <button
                type="button"
                onClick={() => setTipoGasto('Desejo')}
                className={`py-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  tipoGasto === 'Desejo'
                    ? 'bg-[#E06C65]/20 border-[#E06C65] text-[#E06C65]'
                    : 'bg-[#18181B] border-[#2E2E32] text-[#9CA3AF]'
                }`}
              >
                Desejo
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Descrição:</label>
            <input
              type="text"
              required
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Supermercado, Energia, Lanche"
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E06C65] rounded-lg px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Data:</label>
            <input
              type="date"
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E06C65] rounded-lg px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#E06C65] hover:bg-[#d15b54] text-white font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Despesa</span>
          </button>
        </form>

        {/* Lista de Despesas (8 colunas) */}
        <div className="lg:col-span-8 bg-[#121214] border border-[#2E2E32] rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">Despesas Registradas</h3>

          {despesas.length === 0 ? (
            <div className="py-12 text-center text-[#9CA3AF] text-sm">
              Nenhuma despesa registrada neste mês.
            </div>
          ) : (
            <div className="space-y-3">
              {despesas.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#18181B] border border-[#2E2E32]"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.descricao}</span>
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${
                        item.tipoGasto === 'Desejo'
                          ? 'bg-[#E06C65]/15 text-[#E06C65]'
                          : 'bg-[#27272A] text-[#9CA3AF]'
                      }`}>
                        {item.tipoGasto}
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#E06C65]">
                      -{formatarMoeda(item.valor)}
                    </span>
                    <button
                      onClick={() => handleExcluir(item.id)}
                      className="text-[#9CA3AF] hover:text-[#E06C65] transition-colors cursor-pointer"
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
  );
}
