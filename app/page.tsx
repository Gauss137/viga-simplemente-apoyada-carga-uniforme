import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export default function Home() {
  redirect(ROUTES.BEAM_CALCULATOR);
}
