import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Content from './content';
import "./style.css"
export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');
  return <Content />;
}
