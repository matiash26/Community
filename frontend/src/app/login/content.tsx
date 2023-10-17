'use client';
import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
export default function Content() {
  useEffect(() => {
    signIn('twitch');
  }, []);
  return (
    <main
      className="loginPage"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textTransform: 'capitalize',
      }}
    >
      <h1>Você será redirecionado...</h1>
    </main>
  );
}
