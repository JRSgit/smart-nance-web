'use client';

import { Inbox } from 'lucide-react';
import { useFinance } from '@/src/contexts/FinanceContext';
import { DebtHeader } from '@/src/components/dividas/DebtHeader';
import { DebtForm } from '@/src/components/dividas/DebtForm';
import { DebtCard } from '@/src/components/dividas/DebtCard';

export default function DividasPage() {
  const {
    dividas,
    orcamentoDividas20,
    adicionarDivida,
    amortizarParcelaDivida,
    excluirDivida,
  } = useFinance();

  const totalAmortizado = dividas.reduce((acc, d) => acc + d.valorPago, 0);
  const totalDevidoRestante = dividas.reduce(
    (acc, d) => acc + Math.max(d.valorTotal - d.valorPago, 0),
    0
  );
  const compromissoMensalTotal = dividas
    .filter((d) => d.parcelasPagas < d.quantidadeParcelas)
    .reduce((acc, d) => acc + d.valorParcela, 0);

  return (
    <div className="space-y-8">
      <DebtHeader
        totalDevidoRestante={totalDevidoRestante}
        totalAmortizado={totalAmortizado}
        compromissoMensalTotal={compromissoMensalTotal}
        orcamentoDividas20={orcamentoDividas20}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <DebtForm
            onAdicionarDivida={(nova) =>
              adicionarDivida({
                credor: nova.credor,
                descricao: nova.descricao,
                valorTotal: nova.valorTotal,
                quantidadeParcelas: nova.quantidadeParcelas,
                valorParcela: nova.valorParcela,
              })
            }
          />
        </div>

        <div className="lg:col-span-8 bg-[#121214] border border-[#2E2E32] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Suas Dívidas Cadastradas</h2>
              <p className="text-xs text-[#9CA3AF]">
                Amortize cada parcela mensalmente até limpar todas as tabuletas
              </p>
            </div>
            {dividas.length > 0 && (
              <span className="text-xs bg-[#18181B] text-[#E5B83B] px-3 py-1 rounded-full border border-[#2E2E32]">
                {dividas.length} {dividas.length === 1 ? 'tabuleta' : 'tabuletas'}
              </span>
            )}
          </div>

          {dividas.length === 0 ? (
            <div className="py-14 flex flex-col items-center justify-center text-center text-[#9CA3AF]">
              <Inbox className="w-12 h-12 mb-3 stroke-[1.5]" />
              <p className="text-sm font-medium text-white">Nenhuma dívida registrada</p>
              <p className="text-xs max-w-xs mt-1">
                Cadastre suas dívidas ao lado para calcular o valor das parcelas e acompanhar a amortização.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {dividas.map((divida) => (
                <DebtCard
                  key={divida.id}
                  divida={divida}
                  onAmortizar={amortizarParcelaDivida}
                  onExcluir={excluirDivida}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
