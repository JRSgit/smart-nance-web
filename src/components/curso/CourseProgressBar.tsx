interface CourseProgressBarProps {
  etapaAtual: number;
  totalLicoes: number;
  progressoPercentual: number;
}

export function CourseProgressBar({
  etapaAtual,
  totalLicoes,
  progressoPercentual,
}: CourseProgressBarProps) {
  return (
    <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white">
          Lição {etapaAtual + 1} de {totalLicoes}
        </span>
        <span className="text-[#E5B83B] font-bold">
          {Math.round(progressoPercentual)}% concluído
        </span>
      </div>
      <div className="w-full h-2.5 bg-[#18181B] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#E5B83B] transition-all duration-500 rounded-full"
          style={{ width: `${progressoPercentual}%` }}
        />
      </div>
    </div>
  );
}
