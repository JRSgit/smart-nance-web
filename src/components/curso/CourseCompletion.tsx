import { Award, Sparkles, Lock, RotateCcw } from 'lucide-react';

interface CourseCompletionProps {
  acertos: number;
  totalLicoes: number;
  onReiniciar: () => void;
}

export function CourseCompletion({
  acertos,
  totalLicoes,
  onReiniciar,
}: CourseCompletionProps) {
  const aproveitamento = Math.round((acertos / totalLicoes) * 100);
  const conquistouPinOuro = aproveitamento >= 80;

  return (
    <div
      className={`bg-[#121214] border ${
        conquistouPinOuro ? 'border-[#E5B83B]' : 'border-[#E06C65]'
      } rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl`}
    >
      {conquistouPinOuro ? (
        <>
          <div className="w-24 h-24 rounded-full bg-[#332B14] border-2 border-[#E5B83B] flex items-center justify-center mx-auto shadow-lg shadow-[#E5B83B]/20 relative">
            <Award className="w-12 h-12 text-[#E5B83B]" />
            <Sparkles className="w-5 h-5 text-[#E5B83B] absolute -top-1 -right-1" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#332B14] text-[#E5B83B] text-xs font-bold uppercase tracking-wider">
              Conquista Desbloqueada
            </span>
            <h2 className="text-3xl font-bold text-white">
              Pin de Ouro da Babilônia!
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-md mx-auto">
              Parabéns! Você atingiu{' '}
              <strong className="text-[#E5B83B]">{aproveitamento}% de aproveitamento</strong>{' '}
              ({acertos} de {totalLicoes} questões) e dominou os princípios fundamentais de Arkad.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="w-20 h-20 rounded-full bg-[#E06C65]/15 border border-[#E06C65] flex items-center justify-center mx-auto">
            <Lock className="w-10 h-10 text-[#E06C65]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E06C65]/15 text-[#E06C65] text-xs font-bold uppercase tracking-wider">
              Quase lá
            </span>
            <h2 className="text-2xl font-bold text-white">
              Aproveitamento de {aproveitamento}%
            </h2>
            <p className="text-sm text-[#9CA3AF] max-w-md mx-auto">
              Você acertou {acertos} de {totalLicoes} questões. Para conquistar o{' '}
              <strong className="text-[#E5B83B]">Pin de Ouro</strong>, é necessário atingir pelo menos{' '}
              <strong className="text-white">80%</strong>. Revise as lições e tente novamente!
            </p>
          </div>
        </>
      )}

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onReiniciar}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-white border border-[#2E2E32] text-sm font-semibold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refazer Mini Curso</span>
        </button>
      </div>
    </div>
  );
}
