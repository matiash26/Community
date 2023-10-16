import { IBM_Plex_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import SessionsProvider from '@/context/SessionsProvider';
import './globals.css';
const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'sarisCommunity',
  description: 'comunidade sarisla',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plex.className}>
        <SessionsProvider>{children}</SessionsProvider>
      </body>
    </html>
  );
}
