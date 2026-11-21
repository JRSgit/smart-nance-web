import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-cinzel',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: "Smart Nance",
  description: "Gerencie suas finanças com inteligência",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
