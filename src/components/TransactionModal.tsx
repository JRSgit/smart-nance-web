'use client';

import { useState, useEffect } from 'react';
import { 
  X, 
  CircleDollarSign, 
  TrendingDown, 
  Coins, 
  Scale, 
  Wallet,
  Calendar,
  FileText
} from 'lucide-react';

import { useFinance } from '@/src/contexts/FinanceContext';

export interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa' | 'poupanca';
  descricao: string;
  valor: number;
  data: string;
}

export interface DepositoPoupanca {
  descricao: string;
  valor: number;
  data: string;
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transacao: Transacao) => void;
  initialType?: 'receita' | 'despesa' | 'poupanca';
}

export function TransactionModal({ 
  isOpen, 
  onClose, 
  onAddTransaction, 
  initialType = 'receita' 
}: TransactionModalProps) {
  const [tipo, setTipo] = useState<'receita' | 'despesa' | 'poupanca'>(initialType);
  const [descricao, setDescricao] = useState('');
  const [valorInput, setValorInput] = useState('');
  const [data, setData] = useState<string | undefined>(undefined);

  const { adicionarDepositoPoupanca } = useFinance();

  useEffect(() => {
    setData(new Date().toISOString().split('T')[0]);
  }, []);

  if (!isOpen) return null;

  // Converte o texto digitado em número válido
  const valorNumerico = parseFloat(valorInput.replace(',', '.')) || 0;

  // Cálculos da Sabedoria da Babilônia (10% / 20% / 70%)
  const dezPorCento = valorNumerico * 0.10;
  const vintePorCento = valorNumerico * 0.20;
  const setentaPorCento = valorNumerico * 0.70;

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valorNumerico <= 0) return;

    if (tipo === 'poupanca') {
      const deposito: DepositoPoupanca = {
        descricao: descricao.trim() || 'Depósito em poupança',
        valor: valorNumerico,
        data: data || new Date().toISOString().split('T')[0],
      };
      adicionarDepositoPoupanca(deposito);
      onClose();
      return;
    }

    onAddTransaction({
      id: crypto.randomUUID(),
      tipo,
      descricao: descricao.trim() || (tipo === 'receita' ? 'Receita Mensal' : 'Despesa Geral'),
      valor: valorNumerico,
      data: data || new Date().toISOString().split('T')[0],
    });

    // Limpa os campos e fecha o modal
    setDescricao('');
    setValorInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-[#E5B83B] uppercase">
              Gestão de Movimentos
            </span>
            <h2 className="text-xl font-bold text-white">
              Nova Transação
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#18181B] text-[#9CA3AF] hover:text-white border border-[#2E2E32] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Seletor de Tipo: Receita vs Despesa */}
        <div className="grid grid-cols-3 gap-3 p-1 bg-[#18181B] rounded-xl border border-[#2E2E32] mb-6">
          <button
            type="button"
            onClick={() => setTipo('receita')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tipo === 'receita'
                ? 'bg-[#E5B83B] text-[#121214] shadow-md'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <CircleDollarSign className="w-4 h-4" />
            <span>Receita</span>
          </button>

          <button
            type="button"
            onClick={() => setTipo('despesa')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tipo === 'despesa'
                ? 'bg-[#E06C65] text-white shadow-md'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span>Despesa</span>
          </button>

          <button
            type="button"
            onClick={() => setTipo('poupanca')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              tipo === 'poupanca'
                ? 'bg-[#4CAF50] text-white shadow-md'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Poupança</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo Valor */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-[#9CA3AF] uppercase tracking-wider">
              Valor (R$):
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#E5B83B]">
                R$
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={valorInput}
                onChange={(e) => setValorInput(e.target.value)}
                placeholder="0,00"
                className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-12 pr-4 py-3.5 text-lg font-bold text-white placeholder-[#9CA3AF] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Simulação Automática de Arkad (Aparece ao digitar uma Receita) */}
          {tipo === 'receita' && (
            <div className="bg-[#18181B] border border-[#E5B83B]/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#E5B83B] uppercase tracking-wider">
                  Projeção de Arkad (10 / 20 / 70)
                </span>
                <span className="text-[11px] text-[#9CA3AF]">Cálculo em tempo real</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {/* 10% Poupança */}
                <div className="bg-[#121214] border border-[#2E2E32] rounded-lg p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#E5B83B] text-xs font-medium mb-1">
                    <Coins className="w-3.5 h-3.5" />
                    <span>10% Você</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatarMoeda(dezPorCento)}
                  </p>
                </div>

                {/* 20% Dívidas */}
                <div className="bg-[#121214] border border-[#2E2E32] rounded-lg p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#E06C65] text-xs font-medium mb-1">
                    <Scale className="w-3.5 h-3.5" />
                    <span>20% Dívidas</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatarMoeda(vintePorCento)}
                  </p>
                </div>

                {/* 70% Custo de Vida */}
                <div className="bg-[#121214] border border-[#2E2E32] rounded-lg p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 text-[#9CA3AF] text-xs font-medium mb-1">
                    <Wallet className="w-3.5 h-3.5" />
                    <span>70% Gastos</span>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatarMoeda(setentaPorCento)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Campo Descrição e Data lado a lado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#9CA3AF]">
                Descrição:
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder={tipo === 'receita' ? 'Ex: Salário, Vendas' : tipo === 'despesa' ? 'Ex: Aluguel, Mercado' : 'Ex: Poupança, USDT, Bitcoin'}
                  className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-[#9CA3AF] outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-[#9CA3AF]">
                Data:
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-3 py-2.5 text-sm text-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2E2E32]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-[#9CA3AF] hover:text-white bg-[#18181B] border border-[#2E2E32] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                tipo === 'receita'
                  ? 'bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214]'
                  : tipo === 'despesa'
                    ? 'bg-[#E06C65] hover:bg-[#d15b54] text-white'
                    : 'bg-[#4CAF50] hover:bg-[#45a049] text-white'
              }`}
            >
              Salvar {tipo === 'receita' ? 'Receita' : tipo === 'despesa' ? 'Despesa' : 'Poupança'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
