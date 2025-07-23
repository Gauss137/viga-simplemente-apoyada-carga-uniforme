import './globals.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { APP_CONFIG } from '@/lib/constants';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: APP_CONFIG.TITLE,
  description: APP_CONFIG.DESCRIPTION,
  authors: [{ name: APP_CONFIG.COMPANY }],
  keywords: ['calculadora', 'viga', 'ingeniería civil', 'estructuras', 'momento', 'cortante', 'deflexión']
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable} suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
