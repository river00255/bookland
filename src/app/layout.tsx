import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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
      <body className={LineSeedKr.className}>{children}</body>
    </html>
  );
}
