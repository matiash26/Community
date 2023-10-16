'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export interface ISession {
  data: {
    accessToken: string;
    expires: string;
    user: {
      email: string;
      image: string;
      name: string;
      role: string;
    };
    status: string;
  } | null;
  update?: any;
}
export default function SessionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
