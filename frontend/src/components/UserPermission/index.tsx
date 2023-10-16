'use client';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { ISession } from '@/context/SessionsProvider';
export default function UserPermission({ children }: { children: ReactNode }) {
  const { data: session } = useSession() as ISession;

  return session?.user?.role === '2' && children;
}
