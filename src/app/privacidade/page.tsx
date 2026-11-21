'use client'

import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Landmark } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PoliticaPrivacidadePage() {
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
            <ShieldCheck className="w-4 h-4" />
            <span>Transparência e Segurança</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Política de Privacidade
          </h1>
          <p className="text-xs text-[#9CA3AF]">
            Última atualização: {dataAtual}
          </p>
        </header>

        {/* Conteúdo Legal */}
        <article className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-gray-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">1. Informações que Coletamos</h2>
            <p>
              O <strong>Smart-Nance</strong> coleta apenas as informações estritamente necessárias para o funcionamento da plataforma de gestão financeira pessoal:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#9CA3AF]">
              <li>Dados de identificação básica (nome e endereço de e-mail) fornecidos no cadastro ou via autenticação Google (OAuth).</li>
              <li>Registros financeiros inseridos voluntariamente pelo usuário (receitas, despesas, metas de poupança, dívidas e progresso no mini curso).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">2. Como Usamos Suas Informações</h2>
            <p>
              Seus dados são utilizados exclusivamente para calcular suas projeções financeiras (regra 10% / 20% / 70%), sincronizar suas informações entre dispositivos e salvar seu progresso educacional. <strong>Nós não vendemos, alugamos ou compartilhamos seus dados financeiros com terceiros ou anunciantes.</strong>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">3. Armazenamento e Segurança</h2>
            <p>
              Todos os dados são armazenados em infraestrutura segura na nuvem (Supabase) com criptografia em trânsito (HTTPS) e políticas de isolamento por usuário (Row Level Security), garantindo que apenas você tenha acesso às suas movimentações financeiras.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#E5B83B]">4. Seus Direitos e Exclusão de Dados</h2>
            <p>
              Você pode editar seu nome, excluir registros financeiros individuais ou encerrar o uso da plataforma a qualquer momento diretamente nas configurações do seu perfil.
            </p>
          </section>
        </article>

      </div>
    </div>
  );
}
