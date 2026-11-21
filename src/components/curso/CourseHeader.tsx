import { BookOpen, Award, Sparkles } from 'lucide-react';

interface CourseHeaderProps {
  pinOuroConquistado: boolean;
  melhorAproveitamento: number;
}

export function CourseHeader({
  pinOuroConquistado,
  melhorAproveitamento,
}: CourseHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2E2E32]">
      <div className="flex items-center gap-3.5">
        <div className="p-3 rounded-xl bg-[#332B14] border border-[#E5B83B]/40 text-[#E5B83B]">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#E5B83B] uppercase">
            Academia da Riqueza
          </span>
          <h1 className="text-2xl font-bold text-white">
            Mini Curso: Sabedoria de Arkad
          </h1>
        </div>
      </div>

      {pinOuroConquistado ? (
        <div className="flex items-center gap-2 bg-[#332B14] border border-[#E5B83B] px-4 py-2 rounded-full self-start sm:self-auto shadow-md shadow-[#E5B83B]/10">
          <Award className="w-4 h-4 text-[#E5B83B]" />
          <span className="text-xs font-bold text-[#E5B83B] flex items-center gap-1">
            Pin de Ouro Conquistado ({melhorAproveitamento}%)
            <Sparkles className="w-3.5 h-3.5" />
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-[#121214] border border-[#2E2E32] px-4 py-2 rounded-full self-start sm:self-auto">
          <Award className="w-4 h-4 text-[#E5B83B]" />
          <span className="text-xs text-[#9CA3AF]">
            Meta para Pin de Ouro: <strong className="text-white">80% de acertos</strong>
          </span>
        </div>
      )}
    </header>
  );
}
