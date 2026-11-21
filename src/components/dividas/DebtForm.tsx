'use client';

import { useState } from 'react';
import { Plus, Calculator, User, FileText } from 'lucide-react';
import { Divida } from '@/src/types/divida';

interface DebtFormProps {
  onAdicionarDivida: (novaDivida: Divida) => void;
}

export function DebtForm({ onAdicionarDivida }: DebtFormProps) {
  const [credor, setCredor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valorTotalInput, setValorTotalInput] = useState('');
  const [parcelasInput, setParcelasInput] = useState('12');

  const valorTotal = parseFloat(valorTotalInput.replace(',', '.')) || 0;
  const quantidadeParcelas = Math.max(parseInt(parcelasInput) || 1, 1);
  const valorParcelaCalculado = valorTotal > 0 ? valorTotal / quantidadeParcelas : 0;

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valorTotal <= 0 || quantidadeParcelas <= 0) return;

    const novaDivida: Divida = {
      id: crypto.randomUUID(),
      credor: credor.trim() || 'Credor Geral',
      descricao: descricao.trim() || 'Acordo de Dívida',
      valorTotal,
      quantidadeParcelas,
      valorParcela: valorParcelaCalculado,
      parcelasPagas: 0,
      valorPago: 0,
    };

    onAdicionarDivida(novaDivida);
    setCredor('');
    setDescricao('');
    setValorTotalInput('');
    setParcelasInput('12');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-5 self-start"
    >
      <div>
        <span className="text-[11px] font-semibold tracking-wider text-[#E5B83B] uppercase">
          Nova Tabuleta
        </span>
        <h2 className="text-base font-bold text-white">
          Registrar Dívida
        </h2>
      </div>

      {/* Credor */}
      <div className="space-y-1.5">
        <label className="text-xs text-[#9CA3AF]">Nome do Credor:</label>
        <div className="relative">
          <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            value={credor}
            onChange={(e) => setCredor(e.target.value)}
            placeholder="Ex: Banco, Cartão, Loja"
            className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-[#9CA3AF] outline-none"
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-1.5">
        <label className="text-xs text-[#9CA3AF]">Descrição (Opcional):</label>
        <div className="relative">
          <FileText className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Renegociação em tabuleta"
            className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder-[#9CA3AF] outline-none"
          />
        </div>
      </div>

      {/* Valor Total e Quantidade de Parcelas */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs text-[#9CA3AF]">Valor Total (R$):</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            required
            value={valorTotalInput}
            onChange={(e) => setValorTotalInput(e.target.value)}
            placeholder="0,00"
            className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-3 py-2.5 text-sm font-bold text-white outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-[#9CA3AF]">Nº de Parcelas:</label>
          <input
            type="number"
            min="1"
            max="360"
            required
            value={parcelasInput}
            onChange={(e) => setParcelasInput(e.target.value)}
            className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg px-3 py-2.5 text-sm font-bold text-white outline-none"
          />
        </div>
      </div>

      {/* Exibição Automática da Parcela Calculada */}
      <div className="bg-[#18181B] border border-[#E5B83B]/40 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
          <Calculator className="w-4 h-4 text-[#E5B83B]" />
          <span>Valor de cada parcela:</span>
        </div>
        <span className="text-base font-bold text-[#E5B83B]">
          {formatarMoeda(valorParcelaCalculado)}
        </span>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Adicionar Dívida</span>
      </button>
    </form>
  );
}
