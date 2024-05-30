import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '@/app/api/uploadthing/core';
import { Toaster } from '@/components/ui/toaster';
import '../styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Jeetdex',
  description:
    'Best memecoin dex on the Multiversx blockchain. Trade your favorite memecoins with ease.',
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
      <body className="dark bg-[url('/assets/img/bg.png')] ">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
