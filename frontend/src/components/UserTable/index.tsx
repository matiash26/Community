'use client';
import { PiUserBold, PiSwordDuotone } from 'react-icons/pi';
import { RiVipDiamondLine } from 'react-icons/ri';
import { modAction } from '@/utils/community';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { ISession } from '@/context/SessionsProvider';
import { IUser } from '@/utils/type';
import '../UserPostTable';
interface IProps {
  row: IUser;
}
export default function UserTable({ row }: IProps) {
  const [postStatus, setPostStatus] = useState(null);
  const { data: session } = useSession() as ISession;
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const fullDate = newDate.toLocaleString().replace(',', ' -');
    return fullDate;
  };
  const handleOptions = async (action: string, id: number) => {
    const token = session!.accessToken;
    try {
      const response = await modAction(id, action, token);
      setPostStatus(response.error);
    } catch (error) {
      console.error(error);
    }
  };
  const date = formatDate(row.date);
  const roleText = { '0': 'Usuário', '1': 'Vip', '2': 'Moderador' };
  const role = row.role as '0' | '1' | '2';
  const checkResponse =
    postStatus !== null ? (postStatus ? 'error' : 'success') : 'none';

  return (
    <tr className={checkResponse}>
      <td data-cell="userId">{row.id}</td>
      <td data-cell="foto">
        <img src={row.picture} alt="profile picture" className="picture" />
      </td>
      <td data-cell="usuário">{row.username}</td>
      <td data-cell="data">{date}</td>
      <td data-cell="cargo">{roleText[role]}</td>
      <td data-cell="Opt" className="columnOpt">
        <ul className="adminOpt">
          <li onClick={() => handleOptions('0', row.id)}>
            <PiUserBold />
          </li>
          <li onClick={() => handleOptions('1', row.id)}>
            <RiVipDiamondLine />
          </li>
          <li onClick={() => handleOptions('2', row.id)}>
            <PiSwordDuotone />
          </li>
        </ul>
      </td>
    </tr>
  );
}
