'use client';
import { useContext, useState } from 'react';
import { GlobalContext } from '@/context/globalProvider';
import UserPermission from '@/components/UserPermission';
import { postApprove } from '@/utils/community';
import { IPostTable } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { BiExpand } from 'react-icons/bi';
import { ISession } from '@/context/SessionsProvider';
import './style.css';
interface IProps {
  row: IPostTable;
}
export default function UserPostTable({ row }: IProps) {
  const [modalOpt, setModalOpt] = useState(false);
  const [postStatus, setPostStatus] = useState(null);
  const { handleVideo } = useContext(GlobalContext);
  const { data: session } = useSession() as ISession;

  let statusClass!: string;
  const getStatus = (approved: string) => {
    let status: string = '';
    switch (approved) {
      case '0':
        status = 'negado';
        statusClass = 'red';
        break;
      case '1':
        status = 'pendente';
        statusClass = 'warning';
        break;
      case '2':
        status = 'aprovado';
        statusClass = 'red';
        break;
    }
    return status;
  };
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const fullDate = newDate.toLocaleString().replace(',', ' -');
    return fullDate;
  };
  const handleStatus = async (status: string, postId: number) => {
    if (status !== '1') {
      const token = session!.accessToken;
      try {
        const response = await postApprove(postId, status, token);
        setPostStatus(response.error);
      } catch (error) {
        console.error(error);
      }
    }
    setModalOpt((prev) => !prev);
  };
  const status = getStatus(row.approved);
  const date = formatDate(row.date);
  const isReact = row.page === 'react';
  const checkResponse =
    postStatus !== null ? (postStatus ? 'error' : 'success') : 'none';

  return (
    <tr className={checkResponse}>
      <td data-cell="videoId">{row.id}</td>
      <td data-cell="userName">{row.username}</td>
      <td data-cell="desc">{row.text}</td>
      <td data-cell="page" className={isReact ? 'react' : 'feed'}>
        {row.page}
      </td>
      <td data-cell="status" className={statusClass}>
        {status}
      </td>
      <td data-cell="date">{date}</td>
      <td data-cell="video" id="videoButton">
        <BiExpand onClick={() => handleVideo(`${row.id}`)} />
      </td>
      <UserPermission>
        <td data-cell="Opt" className="columnOpt">
          <ul className={`opt ${modalOpt && 'openOpt'}`}>
            <li onClick={() => handleStatus('1', row.id)}>Pendente</li>
            <li onClick={() => handleStatus('0', row.id)}>Negado</li>
            <li onClick={() => handleStatus('2', row.id)}>Aprovado</li>
          </ul>
        </td>
      </UserPermission>
    </tr>
  );
}
