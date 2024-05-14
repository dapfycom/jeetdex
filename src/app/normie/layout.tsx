import { NormieLayout } from '@/components/Layout/NormieLayout';
import type { ReactNode } from 'react';
import '../../styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return <NormieLayout>{children}</NormieLayout>;
}
