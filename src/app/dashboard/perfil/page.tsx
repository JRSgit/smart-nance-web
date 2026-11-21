'use client';

import { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Lock,
  Award,
  Coins,
  CheckCircle2,
  AlertCircle,
  Save,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { supabase } from '@/src/lib/supabase';
import { useFinance } from '@/src/contexts/FinanceContext';

export default function PerfilPage() {
  const {
    userName,
    totalPoupancaAcumulada,
    pinOuroConquistado,
    melhorAproveitamentoCurso,
  } = useFinance();

  const [email, setEmail] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [salvandoSenha, setSalvandoSenha] = useState(false);
  const [mensagemPerfil, setMensagemPerfil] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);
  const [mensagemSenha, setMensagemSenha] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  // Carrega o e-mail e o nome atual do usuário logado
  useEffect(() => {
    async function carregarUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        setNovoNome(user.user_metadata?.full_name || userName || '');
      }
    }
    carregarUsuario();
  }, [userName]);

  const iniciais =
    (novoNome || userName || 'SN')
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'SN';

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Atualiza o nome do usuário no Supabase Auth
  const handleAtualizarNome = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    setSalvandoPerfil(true);
    setMensagemPerfil(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: novoNome.trim() },
      });

      if (error) throw error;

      setMensagemPerfil({
        tipo: 'sucesso',
        texto: 'Nome atualizado com sucesso! Recarregue se necessário para refletir no cabeçalho.',
      });
    } catch (err: any) {
      setMensagemPerfil({
        tipo: 'erro',
        texto: err.message || 'Não foi possível atualizar o nome.',
      });
    } finally {
      setSalvandoPerfil(false);
    }
  };

  // Atualiza a senha do usuário no Supabase Auth
  const handleAtualizarSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemSenha(null);

    if (novaSenha.length < 6) {
      setMensagemSenha({
        tipo: 'erro',
        texto: 'A nova senha deve ter no mínimo 6 caracteres.',
      });
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setMensagemSenha({
        tipo: 'erro',
        texto: 'As senhas digitadas não coincidem.',
      });
      return;
    }

    setSalvandoSenha(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: novaSenha,
      });

      if (error) throw error;

      setNovaSenha('');
      setConfirmarSenha('');
      setMensagemSenha({
        tipo: 'sucesso',
        texto: 'Senha alterada com segurança!',
      });
    } catch (err: any) {
      setMensagemSenha({
        tipo: 'erro',
        texto: err.message || 'Erro ao alterar a senha.',
      });
    } finally {
      setSalvandoSenha(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <header className="flex items-center gap-3.5 pb-6 border-b border-[#2E2E32]">
        <div className="p-3 rounded-xl bg-[#332B14] border border-[#E5B83B]/40 text-[#E5B83B]">
          <User className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-semibold tracking-wider text-[#E5B83B] uppercase">
            Conta & Conquistas
          </span>
          <h1 className="text-2xl font-bold text-white">Perfil do Usuário</h1>
        </div>
      </header>

      {/* Card Principal de Identidade + Conquistas */}
      <div className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
          <div className="w-20 h-20 rounded-full border-2 border-[#E5B83B] bg-[#18181B] flex items-center justify-center text-[#E5B83B] font-bold text-2xl shrink-0 shadow-lg shadow-[#E5B83B]/10">
            {iniciais}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-white">{novoNome || 'Usuário'}</h2>
              {pinOuroConquistado && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#332B14] border border-[#E5B83B]/50 text-[#E5B83B] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Pin de Ouro
                </span>
              )}
            </div>
            <p className="text-sm text-[#9CA3AF]">{email}</p>
            <p className="text-xs text-[#E5B83B] pt-1">
              Membro da Academia de Arkad
            </p>
          </div>
        </div>

        {/* Mini Resumo de Status */}
        <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
          <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-[#9CA3AF] mb-1">
              <Coins className="w-3.5 h-3.5 text-[#E5B83B]" />
              <span>Tesouro</span>
            </div>
            <p className="text-sm font-bold text-white">
              {formatarMoeda(totalPoupancaAcumulada)}
            </p>
          </div>

          <div className="bg-[#18181B] border border-[#2E2E32] rounded-xl p-3.5 text-center">
            <div className="flex items-center justify-center gap-1 text-xs text-[#9CA3AF] mb-1">
              <Award className="w-3.5 h-3.5 text-[#E5B83B]" />
              <span>Curso Arkad</span>
            </div>
            <p className="text-sm font-bold text-[#E5B83B]">
              {melhorAproveitamentoCurso}%
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Formulários: Dados Pessoais e Segurança */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Formulário 1: Dados Pessoais */}
        <form
          onSubmit={handleAtualizarNome}
          className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#E5B83B]" />
            <h3 className="text-base font-bold text-white">Dados Pessoais</h3>
          </div>

          {mensagemPerfil && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                mensagemPerfil.tipo === 'sucesso'
                  ? 'bg-[#332B14]/50 border-[#E5B83B] text-[#E5B83B]'
                  : 'bg-[#E06C65]/15 border-[#E06C65] text-[#E06C65]'
              }`}
            >
              {mensagemPerfil.tipo === 'sucesso' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{mensagemPerfil.texto}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs text-[#9CA3AF]">Nome completo:</label>
            <div className="relative">
              <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-[#9CA3AF]">E-mail cadastrado (não editável):</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                disabled
                value={email}
                className="w-full bg-[#18181B] border border-[#2E2E32] rounded-lg pl-10 pr-4 py-3 text-sm text-[#9CA3AF] cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={salvandoPerfil}
            className="w-full flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] disabled:opacity-60 text-[#121214] font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{salvandoPerfil ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </form>

        {/* Formulário 2: Segurança / Alterar Senha */}
        <form
          onSubmit={handleAtualizarSenha}
          className="bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#E5B83B]" />
            <h3 className="text-base font-bold text-white">Segurança e Senha</h3>
          </div>

          {mensagemSenha && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                mensagemSenha.tipo === 'sucesso'
              }`}
            >
              {mensagemSenha.tipo === 'sucesso' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{mensagemSenha.texto}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs text-[#9CA3AF]">Nova senha:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-[#9CA3AF]">Confirmar nova senha:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-4 py-3 text-sm text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={salvandoSenha}
            className="w-full flex items-center justify-center gap-2 bg-[#E5B83B] hover:bg-[#D4A62A] disabled:opacity-60 text-[#121214] font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{salvandoSenha ? 'Salvando...' : 'Alterar Senha'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}