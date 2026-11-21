import { ScrollText } from 'lucide-react';
import { Licao } from '@/src/data/licoesArkad';

interface LessonReaderProps {
  licao: Licao;
}

export function LessonReader({ licao }: LessonReaderProps) {
  return (
    <article className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-start gap-3">
        <ScrollText className="w-6 h-6 text-[#E5B83B] shrink-0 mt-1" />
        <div>
          <h2 className="text-xl font-bold text-white">{licao.titulo}</h2>
          <p className="text-sm text-[#9CA3AF]">{licao.subtitulo}</p>
        </div>
      </div>

      <div className="space-y-4 text-sm sm:text-base text-gray-200 leading-relaxed">
        {licao.conteudo.map((paragrafo, index) => (
          <p key={index}>{paragrafo}</p>
        ))}
      </div>

      <blockquote className="bg-[#18181B] border-l-4 border-[#E5B83B] p-4 rounded-r-xl italic text-sm text-[#E5B83B]">
        "{licao.citacao}" — <strong>Arkad</strong>
      </blockquote>
    </article>
  );
}
