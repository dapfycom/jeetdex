import { DegenLayout } from '@/components/Layout/DegenLayout';
import type { ReactNode } from 'react';
import '../../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <DegenLayout>{children}</DegenLayout>;
}
