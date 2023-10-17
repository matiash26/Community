'use client';
import { useEffect, useCallback, useState } from 'react';
import useInfinityScroll from '@/Hooks/useInfinityScroll';
import UserPermission from '@/components/UserPermission';
import { IPostTable } from '@/utils/type';
import { useSession } from 'next-auth/react';
import UserPostTable from '@/components/UserPostTable';
import { postList } from '@/utils/community';
import { ISession } from '@/context/SessionsProvider';

const stateInit = { limit: 15, offset: 0 };
export default function Mod() {
  const [pag, setPag] = useState(stateInit);
  const [thereIsMoreData, setThereIsMoreData] = useState(true);
  const [postData, setPostData] = useState<IPostTable[]>([]);
  const { data: session } = useSession() as ISession;
  useInfinityScroll(setPag);

  const fetchData = useCallback(async () => {
    const token = session?.accessToken as string;
    if (thereIsMoreData && token) {
      try {
        const response = (await postList(
          pag.limit,
          pag.offset,
          token,
        )) as IPostTable[];
        setPostData((prev) => [...prev, ...response]);
        response.length < 15 ? setThereIsMoreData(false) : null;
      } catch (error) {
        console.error(error);
      }
    }
  }, [pag, session]);

  useEffect(() => {
    fetchData();
  }, [pag, session]);
  return (
    <main className="mainMod">
      <h2>Listagem de posts</h2>
      <table>
        <thead>
          <tr className="column">
            <th>videoId</th>
            <th>usuário</th>
            <th>desc</th>
            <th>page</th>
            <th>status</th>
            <th>data</th>
            <th>post</th>
            <UserPermission>
              <th>opt</th>
            </UserPermission>
          </tr>
        </thead>
        <tbody>
          {postData.map((user: IPostTable) => (
            <UserPostTable key={user.id} row={user} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
