import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './reset.css';
import './globals.scss';
import Header from './_components/Header';
import QueryProvider from '@/lib/QueryPovider';
import Footer from './_components/Footer';
import Script from 'next/script';
import AuthProvider from './_components/AuthProvider';
import ModalRoot from './_components/Modal/ModalRoot';
import SnackbarProvider from './_components/SnackbarProvider';

const LineSeedKr = localFont({
  src: './fonts/LINESeedKR-Rg.woff',
});

export const metadata: Metadata = {
  title: 'Bookland',
  description: 'Search books, authors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={LineSeedKr.className}>
        <SnackbarProvider>
          <AuthProvider>
            <QueryProvider>
              <Header />
              {children}
              <Footer />
            </QueryProvider>
          </AuthProvider>
        </SnackbarProvider>
        <ModalRoot />
      </body>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
    </html>
  );
}
