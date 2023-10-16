import { getServerSession } from 'next-auth';
import type { Metadata } from 'next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import GlobalProvider from '@/context/globalProvider';
import { redirect } from 'next/navigation';
import ModalByLink from '@/components/ModalByLink';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'sarisCommunity',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  return (
    <GlobalProvider>
      <ModalByLink />
      <Header />
      {children}
    </GlobalProvider>
  );
}
