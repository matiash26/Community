'use client';
import { useSession } from 'next-auth/react';
import { IUser } from '@/utils/type';
import Link from 'next/link';
import './style.css';
interface IUserSession extends IUser {
  image: string;
  name: string;
}
function ProfileCard() {
  const { data: session } = useSession();
  const user = session?.user as IUserSession;
  return (
    <aside className="cardContainer">
      <div className="cardContent">
        <div className="profileCard">
          <div className="profileInfo">
            <img src={user?.image ?? ''} draggable="false" />
            <h2>
              <Link href={`/perfil/${user?.name}`}>{user?.name}</Link>
            </h2>
          </div>
          <p>{user?.descText}</p>
        </div>
        <ul className="profileCardInf">
          <li>
            <span>{user?.totalPosts}</span>
            <span>Posts</span>
          </li>
          <li>
            <span>{user?.totalComments}</span>
            <span>Comments</span>
          </li>
          <li>
            <span>{user?.totalLikes}</span>
            <span>Likes</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
export default ProfileCard;
