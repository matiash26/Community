'use client';
import './style.css';
import { PiSwordDuotone } from 'react-icons/pi';
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import UserPermission from '../UserPermission';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { ISession } from '@/context/SessionsProvider';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function MenuUser() {
  const { data: session } = useSession() as ISession;
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="userMenu" onClick={handleMenu}>
      <span className="menuMobile">
        <AiOutlineMenu />
      </span>
      <div>
        <img
          src={session?.user?.image}
          alt="profile picture"
          draggable="false"
        />
      </div>
      <ul className={`listMenu ${openMenu && 'openMenu'}`}>
        <li className="userName">
          <div>
            <img
              src={session?.user?.image}
              alt="profile picture"
              draggable="false"
            />
          </div>
          <span>{session?.user?.name}</span>
        </li>
        <li>
          <Link href={`/perfil/${session?.user?.name}`}>
            <AiOutlineUser />
            <span>Perfil</span>
          </Link>
        </li>
        <UserPermission>
          <li>
            <Link href="/mod">
              <PiSwordDuotone />
              <span>Moderação</span>
            </Link>
          </li>
        </UserPermission>
        <li onClick={() => signOut()}>
          <div>
            <BiLogOut />
            <span>Sair</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
