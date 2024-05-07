import { Layout } from '@/components/Layout';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';
import '../styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Template dApp Next.js',
  description:
    'A basic implementation of MultiversX dApp providing the basics for MultiversX authentication and TX signing.',
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={fontSans.variable}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
