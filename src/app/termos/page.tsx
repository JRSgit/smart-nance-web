'use client';

import Link from 'next/link';
import { ScrollText, ArrowLeft, Landmark } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function TermosDeUsoPage() {
  const [dataAtual, setDataAtual] = useState('');

  useEffect(() => {
    setDataAtual(new Date().toLocaleDateString('pt-BR'));
  }, []);

  return (
    <div className="min-h-screen bg-[#18181B] text-white py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navegação de Volta */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#E5B83B] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para o início</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <Landmark className="w-4 h-4 text-[#E5B83B]" />
            <span>Smart-Nance</span>
          </div>
        </div>

        {/* Cabeçalho */}
        <header className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#332B14] text-[#E5B83B] text-xs font-semibold uppercase tracking-wider">
            <ScrollText className="w-4 h-4" />
            <span>Regras de Utilização</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Termos de Uso
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Última atualização: {dataAtual}
          </p>
        </header>

        {/* Conteúdo Legal */}
        <article className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o aplicativo ou plataforma web <strong>Smart-Nance</strong>, você concorda em cumprir estes Termos de Uso. Caso não concorde com algum ponto, recomendamos não utilizar o serviço.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">2. Caráter Educacional e Organizacional</h2>
            <p>
              O <strong>Smart-Nance</strong> é uma ferramenta de organização financeira pessoal e educação financeira inspirada nos princípios da obra <em>"O Homem Mais Rico da Babilônia"</em>. As projeções (10% / 20% / 70%), simuladores e lições do mini curso têm finalidade exclusivamente educativa e <strong>não constituem consultoria de investimentos, recomendação de compra de ativos ou aconselhamento jurídico/contábil</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">3. Responsabilidade do Usuário</h2>
            <p>
              Você é responsável pela veracidade dos valores inseridos na plataforma e pela guarda segura de suas credenciais de acesso (e-mail/senha ou conta Google vinculada).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">4. Disponibilidade do Serviço</h2>
            <p>
              Trabalhamos continuamente para manter a plataforma disponível e atualizada, podendo realizar melhorias, ajustes visuais ou atualizações de funcionalidades sem aviso prévio.
            </p>
          </section>
        </article>

      </div>
    </div>
  );
}
