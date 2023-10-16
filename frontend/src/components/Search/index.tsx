'use client';
import { useState, ChangeEvent } from 'react';
import { searchUser } from '@/utils/community';
import { useSession } from 'next-auth/react';
import { ISession } from '@/context/SessionsProvider';
import { IUser } from '@/utils/type';
import Link from 'next/link';
import './style.css';

function Search(): JSX.Element {
  const [search, setSearch] = useState<IUser[]>([]);
  const { data: session } = useSession() as ISession;

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const token = session?.accessToken as string;
    try {
      const { search } = await searchUser(text, 'like', token);
      if (search) {
        setSearch(search);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <aside className="search">
      <form>
        <input type="text" onChange={handleSearch} placeholder="Buscar..." />
      </form>
      <ul className="listUserSearch">
        {search.map((user: IUser) => (
          <li className="userSearch">
            <Link href={'/perfil/' + user.username}>
              <img src={user.picture} alt="profile picture" />
              <span>{user.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default Search;
