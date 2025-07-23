// components/Header.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full bg-gray-100 py-4 px-6 shadow">
      <nav className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo / Título del sitio */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/csw-logo.png"
              alt="CSW Ingeniería Civil"
              width={150}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        {/* Enlaces de navegación */}
        <div className="space-x-4 text-sm font-bold">
          <Link href="/flexion" className="hover:text-[#f8b133] transition-colors">Calculadora Flexión</Link>
          <Link href="/viga_simplementeapoyada_cargauniforme" className="hover:text-[#f8b133] transition-colors">Viga Simplemente Apoyada</Link>
          <a href="https://www.cswingenieriacivil.com/contacto" target="_blank" rel="noopener noreferrer" className="hover:text-[#f8b133] transition-colors">
            Contacto
          </a>
        </div>
      </nav>
    </header>
  )
}
