'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Landmark,
  CircleDollarSign,
  TrendingDown,
  PiggyBank,
  Scale,
  BookOpen,
  LogOut,
  User,
} from 'lucide-react';
import { useFinance } from '@/src/contexts/FinanceContext';

const menuItems = [
  { name: 'Início', fullName: 'Smart-Nance', href: '/dashboard', icon: Landmark },
  { name: 'Receitas', fullName: 'Receitas', href: '/dashboard/receitas', icon: CircleDollarSign },
  { name: 'Despesas', fullName: 'Despesas', href: '/dashboard/despesas', icon: TrendingDown },
  { name: 'Poupança', fullName: 'Poupança', href: '/dashboard/poupanca', icon: PiggyBank },
  { name: 'Dívidas', fullName: 'Dívidas', href: '/dashboard/dividas', icon: Scale },
  { name: 'Curso', fullName: 'Curso de Arkad', href: '/dashboard/curso', icon: BookOpen },
  {name: 'Perfil', fullName: 'Perfil', href: '/dashboard/perfil', icon: User},
];

export function Sidebar() {
  const pathname = usePathname();
  const { sairDaConta } = useFinance();

  return (
    <>
      {/* TOP BAR MOBILE (Exibida apenas em telas pequenas) */}
      <div className="md:hidden sticky top-0 z-40 bg-[#121214]/95 backdrop-blur-md border-b border-[#2E2E32] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-[#E5B83B] bg-[#332B14] flex items-center justify-center text-[#E5B83B] font-bold text-xs">
            SN
          </div>
          <span className="text-sm font-bold text-white tracking-wide">Smart-Nance</span>
        </div>

        <button
          onClick={sairDaConta}
          title="Sair da conta"
          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-[#E06C65] px-2.5 py-1.5 rounded-lg bg-[#18181B] border border-[#2E2E32]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sair</span>
        </button>
      </div>

      {/* SIDEBAR DESKTOP (Oculta no mobile, fixa a partir de md: 768px) */}
      <aside className="hidden md:flex w-64 bg-[#121214] border-r border-[#2E2E32] min-h-screen flex-col justify-between p-6 shrink-0 sticky top-0 h-screen">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-full border border-[#E5B83B] bg-[#332B14] flex items-center justify-center text-[#E5B83B] font-bold">
              SN
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wide">Smart-Nance</h1>
              <p className="text-xs text-[#E5B83B]">Sabedoria da Babilônia</p>
            </div>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#332B14] text-[#E5B83B] border border-[#E5B83B]/40'
                      : 'text-[#9CA3AF] hover:bg-[#18181B] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.fullName}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={sairDaConta}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#9CA3AF] hover:bg-[#18181B] hover:text-[#E06C65] transition-all w-full cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair da conta</span>
        </button>
      </aside>

      {/* BOTTOM TAB BAR MOBILE (Estilo App Nativo - Exibida apenas no mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121214]/95 backdrop-blur-md border-t border-[#2E2E32] px-1 py-2">
        <div className="grid grid-cols-6 gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 rounded-lg transition-colors ${
                  isActive ? 'text-[#E5B83B]' : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                <div
                  className={`p-1 rounded-lg mb-0.5 ${
                    isActive ? 'bg-[#332B14]' : 'bg-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium truncate max-w-full px-0.5">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
