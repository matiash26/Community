'use client';
import { useEffect, useState } from 'react';
import useInfinityScroll from '@/Hooks/useInfinityScroll';
import { useSession } from 'next-auth/react';
import { userList } from '@/utils/community';
import { ISession } from '@/context/SessionsProvider';
import UserTable from '@/components/UserTable';
import { IUser } from '@/utils/type';

const stateInit = { limit: 15, offset: 0 };
export default function Content() {
  const [pag, setPag] = useState(stateInit);
  const [thereIsMoreData, setThereIsMoreData] = useState(true);
  const [userListData, setUserListData] = useState<IUser[]>([]);
  const { data: session } = useSession() as ISession;
  useInfinityScroll(setPag);

  const fetchData = async () => {
    const token = session?.accessToken as string;
    if (thereIsMoreData && token) {
      console.log('rener');
      try {
        const response = (await userList({ ...pag, token })) as IUser[];
        setUserListData((prev) => [...prev, ...response]);
        response.length < 15 ? setThereIsMoreData(false) : null;
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [pag, session]);
  return (
    <table>
      <thead>
        <tr className="column">
          <th>userId</th>
          <th>foto</th>
          <th>usuário</th>
          <th>data</th>
          <th>cargo</th>
          <th>opt</th>
        </tr>
      </thead>
      <tbody>
        {userListData.map((user: IUser) => (
          <UserTable key={user.id} row={user} />
        ))}
      </tbody>
    </table>
  );
}
