'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Landmark, Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '@/src/lib/supabase';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [anoAtual, setAnoAtual] = useState<number>(2026);

  useEffect(() => {
    setAnoAtual(new Date().getFullYear());
  }, []);

  // Login / Cadastro tradicional por E-mail e Senha
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: { full_name: nome },
          },
        });
        if (error) throw error;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setErro(err.message || 'Erro ao autenticar. Verifique seus dados.');
    } finally {
      setLoading(false);
    }
  };

  // Login com Conta Google (OAuth)
  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setErro(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // Redireciona direto para o dashboard após o Google confirmar o login
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErro(err.message || 'Erro ao conectar com o Google.');
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#18181B] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#E5B83B] bg-[#121214] flex items-center justify-center text-[#E5B83B] mb-3 shadow-lg shadow-[#E5B83B]/10">
          <Landmark className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wide">Smart-Nance</h1>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Sabedoria da Babilônia para suas finanças
        </p>
      </div>

      <h2 className="text-2xl font-bold text-[#E5B83B] mb-6">
        {isLogin ? 'Entrar' : 'Criar Conta'}
      </h2>

      <div className="w-full max-w-[400px] bg-[#121214] border border-[#2E2E32] rounded-2xl p-6 sm:p-8 shadow-2xl">
        {erro && (
          <div className="mb-4 p-3 rounded-lg bg-[#E06C65]/15 border border-[#E06C65] text-xs text-[#E06C65] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{erro}</span>
          </div>
        )}

        {/* Botão de Login com Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loadingGoogle || loading}
          className="w-full bg-[#18181B] hover:bg-[#27272A] border border-[#2E2E32] hover:border-[#E5B83B]/60 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
        >
          {/* Ícone SVG Oficial do Google */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
            />
          </svg>
          <span className="text-sm">
            {loadingGoogle ? 'Conectando ao Google...' : 'Continuar com Google'}
          </span>
        </button>

        {/* Divisor Visual */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2E2E32]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#121214] px-3 text-[#9CA3AF]">ou use seu e-mail</span>
          </div>
        </div>

        {/* Formulário Tradicional */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">Nome completo:</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#9CA3AF] outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Email:</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#9CA3AF] outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">Senha:</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Senha (mínimo 6 caracteres)"
                className="w-full bg-[#27272A] border border-[#2E2E32] focus:border-[#E5B83B] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-[#9CA3AF] outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || loadingGoogle}
              className="w-full bg-[#E5B83B] hover:bg-[#D4A62A] disabled:opacity-60 text-[#121214] font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? 'Autenticando...' : isLogin ? 'Entrar' : 'Cadastrar'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>

      <button
        type="button"
        onClick={() => {
          setIsLogin(!isLogin);
          setErro(null);
        }}
        className="mt-6 text-sm font-medium text-[#E5B83B] hover:underline cursor-pointer"
      >
        {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
      </button>



      {/* Adicione no final do container principal da tela de Login (src/app/page.tsx) */}
      <footer className="mt-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-xs text-[#9CA3AF]">
          <Link href="/privacidade" className="hover:text-[#E5B83B] transition-colors">
            Política de Privacidade
          </Link>
          <span>•</span>
          <Link href="/termos" className="hover:text-[#E5B83B] transition-colors">
            Termos de Uso
          </Link>
        </div>
        <p className="text-[11px] text-[#9CA3AF]/60">
          Smart-Nance © {anoAtual} — Todos os direitos reservados
        </p>
      </footer>

    </div>
  );
}
