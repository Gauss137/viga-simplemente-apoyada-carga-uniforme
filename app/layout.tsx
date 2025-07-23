// app/layout.tsx
import './globals.css'
import { Metadata } from 'next'  // Opcional, para definir metadatos SEO
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Calculadora Viga Simplemente Apoyada',
  description: 'Calculadora de viga simplemente apoyada con carga uniforme'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable}`} suppressHydrationWarning>
      <body className="bg-white text-black"> 
        {/* Contenido principal */}
        <main className="p-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
