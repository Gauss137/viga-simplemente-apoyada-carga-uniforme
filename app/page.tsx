import { redirect } from 'next/navigation';

export default function Home() {
  // Redirigir a la primera calculadora específica implementada
  redirect('/vigas/simplemente-apoyadas/carga-uniforme');
}
