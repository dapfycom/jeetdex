import { MainLayout } from '@/components/Layout/MainLayout';
import { Toaster } from '@/components/ui/toaster';
import { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import type { ReactNode } from 'react';
import { Toaster as Toaster2 } from 'react-hot-toast';
import '../styles/globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTED_URL),
  title: 'Jeet Dex',

  description:
    'Launch coins on MultiversX in just a few clicks: Get instant branding, real-time charts and chats.',
  openGraph: {
    title: 'Jeet Dex',
    description:
      'Launch coins on MultiversX in just a few clicks: Get instant branding, real-time charts and chats.',
    url: './',
    siteName: 'Jeet Dex',
    images: ['/assets/img/social.png'],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    title: 'Jeet Dex',
    card: 'summary_large_image',
    images: ['/assets/img/social.png']
  },

  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={fontSans.variable}>
      <body className='dark scroll-smooth'>
        <Toaster />
        <Toaster2 position='bottom-right' />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
