'use client';

import { useEffect, useState } from 'react';
import { 
  CircleDollarSign, 
  Plus, 
  Trash2, 
  Coins, 
  Scale, 
  Wallet,
  Calendar
} from 'lucide-react';
import { useFinance } from '@/src/contexts/FinanceContext';

interface ReceitaItem {
  id: string;
  descricao: string;
  categoria: string;
  valor: number;
  data: string;
  tipo: 'receita';
}

export default function ReceitasPage() {

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setData(today);
  }, []);
  
  const { receitas, adicionarTransacao, excluirTransacao } = useFinance();
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Salário');
  const [valorInput, setValorInput] = useState('');
  const [data, setData] = useState('');

  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAdicionarReceita = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(valorInput.replace(',', '.')) || 0;
    if (valor <= 0) return;

    const nova: ReceitaItem = {
      id: crypto.randomUUID(),
      descricao: descricao.trim() || categoria,
      categoria,
      valor,
      data,
      tipo: 'receita',
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
          <div className="p-3 rounded-xl bg-[#332B14] border border-[#E5B83B]/40 text-[#E5B83B]">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#E5B83B] uppercase">
              Fluxo de Entrada
            </span>
            <h1 className="sm:text-2xl text-base font-bold text-white">
              Gestão de Receitas
            </h1>
          </div>
        </div>

        <div className="bg-[#121214] border border-[#E5B83B]/40 px-5 py-3 rounded-xl">
          <span className="text-xs text-[#9CA3AF] block">Total Recebido no Mês</span>
          <span className="text-xl font-bold text-[#E5B83B]">
            {formatarMoeda(totalReceitas)}
          </span>
        </div>
      </header>

      {/* Cards da Divisão Automática de Arkad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">10% Para Você (Poupança)</span>
            <p className="text-lg font-bold text-[#E5B83B] mt-1">
              {formatarMoeda(totalReceitas * 0.10)}
            </p>
          </div>
          <Coins className="w-6 h-6 text-[#E5B83B]/70" />
        </div>

        <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">20% Quitar Dívidas</span>
            <p className="text-lg font-bold text-[#E06C65] mt-1">
              {formatarMoeda(totalReceitas * 0.20)}
            </p>
          </div>
          <Scale className="w-6 h-6 text-[#E06C65]/70" />
        </div>

        <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">70% Custo de Vida</span>
            <p className="text-lg font-bold text-white mt-1">
              {formatarMoeda(totalReceitas * 0.70)}
            </p>
          </div>
          <Wallet className="w-6 h-6 text-[#9CA3AF]/70" />
        </div>
      </div>

      {/* Formulário + Lista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Formulário (4 colunas) */}
        <form 
          onSubmit={handleAdicionarReceita}
          className="lg:col-span-4 bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-4 self-start"
        >
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Nova Receita
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
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-4 py-3 text-base font-bold text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Categoria:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-4 py-3 text-sm text-white outline-none"
            >
              <option value="Salário">Salário</option>
              <option value="Renda Extra">Renda Extra</option>
              <option value="Comissões / Vendas">Comissões / Vendas</option>
              <option value="Rendimentos">Rendimentos</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Pagamento Mensal"
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-[#9CA3AF]">Data:</label>
            <input
              type="date"
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Cadastrar Receita</span>
          </button>
        </form>

        {/* Lista de Receitas (8 colunas) */}
        <div className="lg:col-span-8 bg-[#121214] border border-[#2E2E32] rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-4">Receitas Registradas</h3>

          {receitas.length === 0 ? (
            <div className="py-12 text-center text-[#9CA3AF] text-sm">
              Nenhuma receita cadastrada neste mês.
            </div>
          ) : (
            <div className="space-y-3">
              {receitas.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#18181B] border border-[#2E2E32]"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.descricao}</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#332B14] text-[#E5B83B]">
                        {item.categoria}
                      </span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] flex items-center gap-1 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.data + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#E5B83B]">
                      +{formatarMoeda(item.valor)}
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