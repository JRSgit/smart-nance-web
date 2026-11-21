'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/src/lib/supabase';
import { Divida } from '@/src/types/divida';

export interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  categoria?: string;
  tipoGasto?: 'Necessidade' | 'Desejo';
  valor: number;
  data: string;
}

export interface DepositoPoupanca {
  id: string;
  descricao: string;
  valor: number;
  data: string;
}

interface FinanceContextData {
  userName: string;
  loadingData: boolean;
  transacoes: Transacao[];
  receitas: Transacao[];
  despesas: Transacao[];
  depositosPoupanca: DepositoPoupanca[];
  dividas: Divida[];

  totalReceitas: number;
  totalDespesas: number;
  saldoDisponivel: number;
  totalPoupancaAcumulada: number;
  metaPoupanca10: number;
  orcamentoDividas20: number;
  limiteGastos70: number;

  adicionarTransacao: (transacao: Omit<Transacao, 'id'>) => Promise<void>;
  excluirTransacao: (id: string) => Promise<void>;
  adicionarDepositoPoupanca: (deposito: Omit<DepositoPoupanca, 'id'>) => Promise<void>;
  adicionarDivida: (divida: Omit<Divida, 'id' | 'parcelasPagas' | 'valorPago'>) => Promise<void>;
  amortizarParcelaDivida: (id: string) => Promise<void>;
  excluirDivida: (id: string) => Promise<void>;
  sairDaConta: () => Promise<void>;

  melhorAproveitamentoCurso: number;
  pinOuroConquistado: boolean;
  salvarProgressoCurso: (aproveitamentoAtual: number) => Promise<void>;
}

const FinanceContext = createContext<FinanceContextData>({} as FinanceContextData);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [userName, setUserName] = useState('Usuário');
  const [loadingData, setLoadingData] = useState(true);

  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [depositosPoupanca, setDepositosPoupanca] = useState<DepositoPoupanca[]>([]);
  const [dividas, setDividas] = useState<Divida[]>([]);

  const [melhorAproveitamentoCurso, setMelhorAproveitamentoCurso] = useState(0);
  const [pinOuroConquistado, setPinOuroConquistado] = useState(false);

  // Verifica sessão e carrega dados do Supabase ao iniciar
  useEffect(() => {
    async function carregarDadosIniciais() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/');
        return;
      }

      if (user.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name);
      }

      // Busca progresso do curso
      const { data: resCurso } = await supabase
        .from('progresso_curso')
        .select('*')
        .maybeSingle();

      if (resCurso) {
        setMelhorAproveitamentoCurso(resCurso.melhor_aproveitamento);
        setPinOuroConquistado(resCurso.pin_ouro_conquistado);
      }

      // Busca simultânea das 3 tabelas
      const [resTransacoes, resPoupanca, resDividas] = await Promise.all([
        supabase.from('transacoes').select('*').order('data', { ascending: false }),
        supabase.from('depositos_poupanca').select('*').order('data', { ascending: false }),
        supabase.from('dividas').select('*').order('created_at', { ascending: false }),
      ]);

      if (resTransacoes.data) {
        setTransacoes(
          resTransacoes.data.map((t) => ({
            id: t.id,
            tipo: t.tipo,
            descricao: t.descricao,
            categoria: t.categoria,
            tipoGasto: t.tipo_gasto,
            valor: Number(t.valor),
            data: t.data,
          }))
        );
      }

      if (resPoupanca.data) {
        setDepositosPoupanca(
          resPoupanca.data.map((p) => ({
            id: p.id,
            descricao: p.descricao,
            valor: Number(p.valor),
            data: p.data,
          }))
        );
      }

      if (resDividas.data) {
        setDividas(
          resDividas.data.map((d) => ({
            id: d.id,
            credor: d.credor,
            descricao: d.descricao,
            valorTotal: Number(d.valor_total),
            quantidadeParcelas: d.quantidade_parcelas,
            valorParcela: Number(d.valor_parcela),
            parcelasPagas: d.parcelas_pagas,
            valorPago: Number(d.valor_pago),
          }))
        );
      }

      setLoadingData(false);
    }

    carregarDadosIniciais();
  }, [router]);

  // Filtros e cálculos consolidados
  const receitas = transacoes.filter((t) => t.tipo === 'receita');
  const despesas = transacoes.filter((t) => t.tipo === 'despesa');
  const poupanca = depositosPoupanca;

  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const saldoDisponivel = totalReceitas - totalDespesas;
  const totalPoupancaAcumulada = poupanca.reduce((acc, item) => acc + item.valor, 0);

  const metaPoupanca10 = totalReceitas * 0.10;
  const orcamentoDividas20 = totalReceitas * 0.20;
  const limiteGastos70 = totalReceitas * 0.70;

  // 4. Adicione a função para salvar no Supabase:
  const salvarProgressoCurso = async (aproveitamentoAtual: number) => {
    const conquistouAgora = aproveitamentoAtual >= 80;
    const novoPinStatus = pinOuroConquistado || conquistouAgora;
    const novoMelhorScore = Math.max(melhorAproveitamentoCurso, aproveitamentoAtual);

    const { error } = await supabase
      .from('progresso_curso')
      .upsert({
        melhor_aproveitamento: novoMelhorScore,
        pin_ouro_conquistado: novoPinStatus,
        updated_at: new Date().toISOString(),
      });

    if (!error) {
      setMelhorAproveitamentoCurso(novoMelhorScore);
      setPinOuroConquistado(novoPinStatus);
    }
  };

  // CRUD Transações
  const adicionarTransacao = async (nova: Omit<Transacao, 'id'>) => {
    const { data, error } = await supabase
      .from('transacoes')
      .insert({
        tipo: nova.tipo,
        descricao: nova.descricao,
        categoria: nova.categoria,
        tipo_gasto: nova.tipoGasto,
        valor: nova.valor,
        data: nova.data,
      })
      .select()
      .single();
    if (!error && data) {
      setTransacoes((prev) => [
        {
          id: data.id,
          tipo: data.tipo,
          descricao: data.descricao,
          categoria: data.categoria,
          tipoGasto: data.tipo_gasto,
          valor: Number(data.valor),
          data: data.data,
        },
        ...prev,
      ]);
    }
  };

  const excluirTransacao = async (id: string) => {
    const { error } = await supabase.from('transacoes').delete().eq('id', id);
    if (!error) {
      setTransacoes((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // CRUD Poupança
  const adicionarDepositoPoupanca = async (novo: Omit<DepositoPoupanca, 'id'>) => {
    const { data, error } = await supabase
      .from('depositos_poupanca')
      .insert({
        descricao: novo.descricao,
        valor: novo.valor,
        data: novo.data,
      })
      .select()
      .single();
    // console.log(error);
    if (!error && data) {
      setDepositosPoupanca((prev) => [
        {
          id: data.id,
          descricao: data.descricao,
          valor: Number(data.valor),
          data: data.data,
        },
        ...prev,
      ]);
    }
  };

  // CRUD Dívidas
  const adicionarDivida = async (nova: Omit<Divida, 'id' | 'parcelasPagas' | 'valorPago'>) => {
    const { data, error } = await supabase
      .from('dividas')
      .insert({
        credor: nova.credor,
        descricao: nova.descricao,
        valor_total: nova.valorTotal,
        quantidade_parcelas: nova.quantidadeParcelas,
        valor_parcela: nova.valorParcela,
      })
      .select()
      .single();

    if (!error && data) {
      setDividas((prev) => [
        {
          id: data.id,
          credor: data.credor,
          descricao: data.descricao,
          valorTotal: Number(data.valor_total),
          quantidadeParcelas: data.quantidade_parcelas,
          valorParcela: Number(data.valor_parcela),
          parcelasPagas: data.parcelas_pagas,
          valorPago: Number(data.valor_pago),
        },
        ...prev,
      ]);
    }
  };

  const amortizarParcelaDivida = async (id: string) => {
    const dividaAtual = dividas.find((d) => d.id === id);
    if (!dividaAtual || dividaAtual.parcelasPagas >= dividaAtual.quantidadeParcelas) return;

    const novasParcelasPagas = dividaAtual.parcelasPagas + 1;
    const novoValorPago =
      novasParcelasPagas === dividaAtual.quantidadeParcelas
        ? dividaAtual.valorTotal
        : dividaAtual.valorPago + dividaAtual.valorParcela;

    const { error } = await supabase
      .from('dividas')
      .update({
        parcelas_pagas: novasParcelasPagas,
        valor_pago: novoValorPago,
      })
      .eq('id', id);

    if (!error) {
      setDividas((prev) =>
        prev.map((d) =>
          d.id === id
            ? { ...d, parcelasPagas: novasParcelasPagas, valorPago: novoValorPago }
            : d
        )
      );
    }
  };

  const excluirDivida = async (id: string) => {
    const { error } = await supabase.from('dividas').delete().eq('id', id);
    if (!error) {
      setDividas((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const sairDaConta = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <FinanceContext.Provider
      value={{
        adicionarDepositoPoupanca,
        melhorAproveitamentoCurso,
        totalPoupancaAcumulada,
        amortizarParcelaDivida,
        salvarProgressoCurso,
        pinOuroConquistado,
        orcamentoDividas20,
        adicionarTransacao,
        depositosPoupanca,
        excluirTransacao,
        adicionarDivida,
        saldoDisponivel,
        metaPoupanca10,
        limiteGastos70,
        excluirDivida,
        totalReceitas,
        totalDespesas,
        loadingData,
        sairDaConta,
        transacoes,
        userName,
        receitas,
        despesas,
        dividas,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance deve ser usado dentro de um FinanceProvider');
  }
  return context;
}
