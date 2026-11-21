import { Scale, CheckCircle2, AlertCircle, Coins } from 'lucide-react';

interface DebtHeaderProps {
  totalDevidoRestante: number;
  totalAmortizado: number;
  compromissoMensalTotal: number;
  orcamentoDividas20: number;
}

export function DebtHeader({
  totalDevidoRestante,
  totalAmortizado,
  compromissoMensalTotal,
  orcamentoDividas20,
}: DebtHeaderProps) {
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const ultrapassouLimite20 = orcamentoDividas20 > 0 && compromissoMensalTotal > orcamentoDividas20;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2E2E32]">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-[#E06C65]/15 border border-[#E06C65]/40 text-[#E06C65]">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-[#E06C65] uppercase">
              Sabedoria de Dabasir (Regra dos 20%)
            </span>
            <h1 className="text-2xl font-bold text-white">
              Tabuletas de Dívidas
            </h1>
          </div>
        </div>

        <blockquote className="text-xs italic text-[#9CA3AF] max-w-xs border-l-2 border-[#E5B83B] pl-3">
          "Onde há determinação, encontra-se o caminho." — <strong className="text-[#E5B83B]">Dabasir</strong>
        </blockquote>
      </header>

      {/* Cards de Resumo (Agora com o Limite de 20% conectado às Receitas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121214] border border-[#E5B83B]/50 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">Orçamento Mensal (20%)</span>
            <p className="text-xl font-bold text-[#E5B83B] mt-1">
              {formatarMoeda(orcamentoDividas20)}
            </p>
          </div>
          <Coins className="w-6 h-6 text-[#E5B83B]/70" />
        </div>

        <div className={`bg-[#121214] border ${ultrapassouLimite20 ? 'border-[#E06C65]' : 'border-[#2E2E32]'} rounded-2xl p-5 flex items-center justify-between`}>
          <div>
            <span className="text-xs text-[#9CA3AF]">Parcelas do Mês</span>
            <p className={`text-xl font-bold mt-1 ${ultrapassouLimite20 ? 'text-[#E06C65]' : 'text-white'}`}>
              {formatarMoeda(compromissoMensalTotal)}
            </p>
          </div>
          <Scale className="w-6 h-6 text-[#9CA3AF]/70" />
        </div>

        <div className="bg-[#121214] border border-[#E06C65]/50 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">Saldo Devedor Total</span>
            <p className="text-xl font-bold text-[#E06C65] mt-1">
              {formatarMoeda(totalDevidoRestante)}
            </p>
          </div>
          <AlertCircle className="w-6 h-6 text-[#E06C65]/70" />
        </div>

        <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#9CA3AF]">Total Já Amortizado</span>
            <p className="text-xl font-bold text-white mt-1">
              {formatarMoeda(totalAmortizado)}
            </p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-[#E5B83B]/70" />
        </div>
      </div>

      {/* Alerta inteligente caso as parcelas passem dos 20% da receita */}
      {ultrapassouLimite20 && (
        <div className="bg-[#E06C65]/10 border border-[#E06C65]/50 rounded-xl p-4 text-xs text-gray-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-[#E06C65] shrink-0" />
          <span>
            <strong className="text-[#E06C65]">Atenção ao limite de Dabasir:</strong> Suas parcelas mensais ({formatarMoeda(compromissoMensalTotal)}) estão acima dos 20% recomendados da sua receita ({formatarMoeda(orcamentoDividas20)}). Considere renegociar os prazos com seus credores.
          </span>
        </div>
      )}
    </div>
  );
}
