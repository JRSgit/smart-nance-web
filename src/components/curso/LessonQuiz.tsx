import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Licao } from '@/src/data/licoesArkad';

interface LessonQuizProps {
  licao: Licao;
  opcaoSelecionada: number | null;
  respondeu: boolean;
  isUltimaLicao: boolean;
  onSelectOpcao: (index: number) => void;
  onConfirmar: () => void;
  onProxima: () => void;
}

export function LessonQuiz({
  licao,
  opcaoSelecionada,
  respondeu,
  isUltimaLicao,
  onSelectOpcao,
  onConfirmar,
  onProxima,
}: LessonQuizProps) {
  return (
    <section className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <span className="text-xs font-semibold tracking-wider text-[#E5B83B] uppercase">
          Teste seu Conhecimento
        </span>
        <h3 className="text-lg font-bold text-white mt-1">
          {licao.pergunta}
        </h3>
      </div>

      <div className="space-y-3">
        {licao.opcoes.map((opcao, index) => {
          const isSelecionada = opcaoSelecionada === index;
          const isCorreta = index === licao.respostaCorreta;

          let estiloBotao = 'bg-[#18181B] border-[#2E2E32] text-gray-200 hover:border-[#E5B83B]';

          if (respondeu) {
            if (isCorreta) {
              estiloBotao = 'bg-[#332B14] border-[#E5B83B] text-white';
            } else if (isSelecionada && !isCorreta) {
              estiloBotao = 'bg-[#E06C65]/15 border-[#E06C65] text-white';
            } else {
              estiloBotao = 'bg-[#18181B] border-[#2E2E32] text-[#9CA3AF] opacity-60';
            }
          } else if (isSelecionada) {
            estiloBotao = 'bg-[#332B14]/60 border-[#E5B83B] text-white';
          }

          return (
            <button
              key={index}
              type="button"
              disabled={respondeu}
              onClick={() => onSelectOpcao(index)}
              className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${estiloBotao}`}
            >
              <span className="text-sm font-medium">{opcao}</span>

              {respondeu && isCorreta && (
                <CheckCircle2 className="w-5 h-5 text-[#E5B83B] shrink-0" />
              )}
              {respondeu && isSelecionada && !isCorreta && (
                <XCircle className="w-5 h-5 text-[#E06C65] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {respondeu && (
        <div
          className={`p-4 rounded-xl border text-sm ${
            opcaoSelecionada === licao.respostaCorreta
              ? 'bg-[#332B14]/40 border-[#E5B83B]/50 text-gray-200'
              : 'bg-[#E06C65]/10 border-[#E06C65]/50 text-gray-200'
          }`}
        >
          <strong
            className={
              opcaoSelecionada === licao.respostaCorreta
                ? 'text-[#E5B83B]'
                : 'text-[#E06C65]'
            }
          >
            {opcaoSelecionada === licao.respostaCorreta
              ? 'Resposta Correta! '
              : 'Atenção ao ensinamento: '}
          </strong>
          {licao.explicacao}
        </div>
      )}

      <div className="flex justify-end pt-2">
        {!respondeu ? (
          <button
            type="button"
            disabled={opcaoSelecionada === null}
            onClick={onConfirmar}
            className="bg-[#E5B83B] hover:bg-[#D4A62A] disabled:opacity-40 text-[#121214] font-bold px-6 py-3 rounded-lg text-sm transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            Confirmar Resposta
          </button>
        ) : (
          <button
            type="button"
            onClick={onProxima}
            className="flex items-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] text-[#121214] font-bold px-6 py-3 rounded-lg text-sm transition-all cursor-pointer"
          >
            <span>{!isUltimaLicao ? 'Próxima Lição' : 'Ver Resultado Final'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}
