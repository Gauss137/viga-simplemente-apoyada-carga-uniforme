import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-[#f8b133] hover:bg-[#e6a030] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>¿Necesitas ayuda?</p>
            <a 
              href="https://www.cswingenieriacivil.com/contacto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f8b133] hover:underline"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 