import { Toaster } from '@/components/ui/toaster';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster as Toaster2 } from 'react-hot-toast';
import '../styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Jeet Dex',
  description:
    'Launch coins on MultiversX in just a few clicks: Get instant branding, real-time charts and chats.',
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
      <body className='dark scroll-smooth'>
        <Toaster />
        <Toaster2 position='bottom-right' />
        {children}
      </body>
    </html>
  );
}
