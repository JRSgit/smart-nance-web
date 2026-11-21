import { Sidebar } from '@/src/components/Sidebar';
import { FinanceProvider } from '@/src/contexts/FinanceContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FinanceProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#18181B] text-white">
        <Sidebar />
        <main className="flex-1 w-full px-4 py-6 pb-24 md:p-8 md:pb-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </FinanceProvider>
  );
}
