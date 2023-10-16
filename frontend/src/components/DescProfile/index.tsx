'use client';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { EditDesc } from '@/utils/community';
import { useSession } from 'next-auth/react';
import { ISession } from '@/context/SessionsProvider';
import './style.css';
export default function DescProfile({
  desc,
  user,
}: {
  desc: string;
  user: string;
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [descText, setDescText] = useState('');
  const [owner, setOwner] = useState(false);
  const { data: session } = useSession() as ISession;

  const editIsOpen = openEdit && 'editOpen';
  const handleOpen = () => {
    setOpenEdit((prev) => !prev);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = session?.accessToken as string;
    try {
      const response = await EditDesc(descText, token);
      !response.error && setOpenEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchName = user?.toLowerCase();
    const sessionName = session?.user?.name?.toLowerCase();
    setOwner(fetchName === sessionName);
  }, [session]);
  return (
    <>
      {owner && (
        <form onSubmit={handleSubmit} className={`edit ${editIsOpen}`}>
          {openEdit && (
            <input
              placeholder="descrição"
              className="inputDesc"
              maxLength={300}
              onChange={({ target }) => setDescText(target.value)}
            />
          )}
          <div className="editDesc" onClick={handleOpen}>
            <AiOutlineEdit />
          </div>
        </form>
      )}
      <p>{desc}</p>
    </>
  );
}
