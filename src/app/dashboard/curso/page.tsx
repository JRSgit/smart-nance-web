'use client';

import { useState } from 'react';
import { licoesArkad } from '@/src/data/licoesArkad';
import { CourseHeader } from '@/src/components/curso/CourseHeader';
import { CourseProgressBar } from '@/src/components/curso/CourseProgressBar';
import { LessonReader } from '@/src/components/curso/LessonReader';
import { LessonQuiz } from '@/src/components/curso/LessonQuiz';
import { CourseCompletion } from '@/src/components/curso/CourseCompletion';
import { BookOpen, CheckCircle2 } from 'lucide-react';

import { useFinance } from '@/src/contexts/FinanceContext';

export default function MiniCursoArkadPage() {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<number | null>(null);
  const [cursoConcluido, setCursoConcluido] = useState(false);
  const [respondeu, setRespondeu] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [acertos, setAcertos] = useState(0);

  const {
    pinOuroConquistado,
    melhorAproveitamentoCurso,
    salvarProgressoCurso,
  } = useFinance();

  const licao = licoesArkad[etapaAtual];
  const totalLicoes = licoesArkad.length;
  const progressoPercentual = ((etapaAtual + (respondeu ? 1 : 0)) / totalLicoes) * 100;

  const handleVerificarResposta = () => {
    if (opcaoSelecionada === null) return;
    setRespondeu(true);
    if (opcaoSelecionada === licao.respostaCorreta) {
      setAcertos((prev) => prev + 1);
    }
  };

  const handleProximaEtapa = async () => {
    if (etapaAtual + 1 < totalLicoes) {
      setEtapaAtual((prev) => prev + 1);
      setOpcaoSelecionada(null);
      setRespondeu(false);
    } else {
      // Calcula o aproveitamento final e grava no Supabase
      const aproveitamentoFinal = Math.round((acertos / totalLicoes) * 100);
      await salvarProgressoCurso(aproveitamentoFinal);
      setCursoConcluido(true);
    }
  };

  const handleReiniciarCurso = () => {
    setEtapaAtual(0);
    setOpcaoSelecionada(null);
    setRespondeu(false);
    setAcertos(0);
    setCursoConcluido(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Breve conteúdo do mini curso</h1>
        <hr className="border-[#2E2E32]" />
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#F59E0B]" />
          <p className="text-sm text-[#9CA3AF]">
            Em breve teremos mais conteúdo para você!
          </p>
        </div>
      </div>
      {/* <CourseHeader
        pinOuroConquistado={pinOuroConquistado}
        melhorAproveitamento={melhorAproveitamentoCurso}
      />

      {!cursoConcluido && (
        <CourseProgressBar
          etapaAtual={etapaAtual}
          totalLicoes={totalLicoes}
          progressoPercentual={progressoPercentual}
        />
      )}

      {cursoConcluido ? (
        <CourseCompletion
          acertos={acertos}
          totalLicoes={totalLicoes}
          onReiniciar={handleReiniciarCurso}
        />
      ) : (
        <div className="space-y-6">
          <LessonReader licao={licao} />

          <LessonQuiz
            licao={licao}
            opcaoSelecionada={opcaoSelecionada}
            respondeu={respondeu}
            isUltimaLicao={etapaAtual + 1 === totalLicoes}
            onSelectOpcao={setOpcaoSelecionada}
            onConfirmar={handleVerificarResposta}
            onProxima={handleProximaEtapa}
          />
        </div>
      )} */}
    </div>
  );
}
