import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './reset.css';
import './globals.scss';
import Header from './_components/Header';
import QueryProvider from '@/lib/QueryPovider';
import Footer from './_components/Footer';

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
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
