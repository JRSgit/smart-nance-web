import { 
  CheckCircle2, 
  Coins, 
  Trash2, 
  Award,
  ScrollText
} from 'lucide-react';
import { Divida } from '@/src/types/divida';

interface DebtCardProps {
  divida: Divida;
  onAmortizar: (id: string) => void;
  onExcluir: (id: string) => void;
}

export function DebtCard({ divida, onAmortizar, onExcluir }: DebtCardProps) {
  const isQuitada = divida.parcelasPagas >= divida.quantidadeParcelas;
  const saldoRestante = Math.max(divida.valorTotal - divida.valorPago, 0);
  const parcelasRestantes = Math.max(divida.quantidadeParcelas - divida.parcelasPagas, 0);
  const progressoPercentual = Math.min(
    Math.round((divida.parcelasPagas / divida.quantidadeParcelas) * 100),
    100
  );

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div
      className={`bg-[#18181B] border ${
        isQuitada ? 'border-[#E5B83B]' : 'border-[#2E2E32]'
      } rounded-2xl p-5 space-y-4 transition-all`}
    >
      {/* Topo do Card */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl shrink-0 ${
              isQuitada
                ? 'bg-[#332B14] text-[#E5B83B]'
                : 'bg-[#E06C65]/15 text-[#E06C65]'
            }`}
          >
            {isQuitada ? <Award className="w-5 h-5" /> : <ScrollText className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">{divida.credor}</h3>
              {isQuitada && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#332B14] text-[#E5B83B] uppercase tracking-wider">
                  Dívida Quitada
                </span>
              )}
            </div>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{divida.descricao}</p>
          </div>
        </div>

        <button
          onClick={() => onExcluir(divida.id)}
          title="Excluir dívida"
          className="text-[#9CA3AF] hover:text-[#E06C65] transition-colors cursor-pointer p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Valores da Dívida */}
      <div className="grid grid-cols-3 gap-3 bg-[#121214] border border-[#2E2E32] rounded-xl p-3.5 text-center sm:text-left">
        <div>
          <span className="text-[11px] text-[#9CA3AF] block">Valor Total</span>
          <span className="text-sm font-bold text-white">
            {formatarMoeda(divida.valorTotal)}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#9CA3AF] block">Parcela ({divida.quantidadeParcelas}x)</span>
          <span className="text-sm font-bold text-[#E5B83B]">
            {formatarMoeda(divida.valorParcela)}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-[#9CA3AF] block">Saldo Restante</span>
          <span className={`text-sm font-bold ${isQuitada ? 'text-[#E5B83B]' : 'text-[#E06C65]'}`}>
            {formatarMoeda(saldoRestante)}
          </span>
        </div>
      </div>

      {/* Barra de Evolução da Amortização */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9CA3AF]">
            Progresso: <strong className="text-white">{divida.parcelasPagas}</strong> de{' '}
            <strong className="text-white">{divida.quantidadeParcelas}</strong> parcelas pagas
          </span>
          <span className="font-bold text-[#E5B83B]">{progressoPercentual}%</span>
        </div>

        <div className="w-full h-2.5 bg-[#121214] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E5B83B] transition-all duration-500 rounded-full"
            style={{ width: `${progressoPercentual}%` }}
          />
        </div>
      </div>

      {/* Rodapé com Botão de Amortizar */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#2E2E32]">
        <span className="text-xs text-[#9CA3AF]">
          {isQuitada
            ? 'Parabéns! Esta tabuleta foi totalmente paga com honra.'
            : `Faltam ${parcelasRestantes} ${parcelasRestantes === 1 ? 'parcela' : 'parcelas'} para saldar.`}
        </span>

        {!isQuitada ? (
          <button
            type="button"
            onClick={() => onAmortizar(divida.id)}
            className="flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-bold px-4 py-2.5 rounded-lg text-xs transition-all cursor-pointer shrink-0"
          >
            <Coins className="w-4 h-4" />
            <span>Amortizar Parcela ({formatarMoeda(divida.valorParcela)})</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E5B83B]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saldada</span>
          </div>
        )}
      </div>
    </div>
  );
}
