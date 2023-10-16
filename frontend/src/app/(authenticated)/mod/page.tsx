import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Content from './Content';
interface IUserSession {
  email: string;
  name: string;
  image: string;
  role: string;
}
export default async function Mod() {
  const session = await getServerSession(authOptions);
  const user = session?.user as IUserSession;
  const role = user.role;
  if (role !== '2') redirect('/');
  return (
    <main className="mainMod">
      <Content />
    </main>
  );
}
