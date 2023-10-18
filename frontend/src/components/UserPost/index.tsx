import { PiSwordDuotone, PiPaperclipLight } from 'react-icons/pi';
import UserPermission from '@/components/UserPermission';
import { IPost } from '@/utils/type';
import Link from 'next/link';
import './style.css';
interface IUser {
  user: IPost;
}
export default function UserPost({ user }: IUser) {
  const { id, picture, username, date } = user;
  const handleCopy = () => {
    const url = document.location.href;
    navigator.clipboard.writeText(url + '?post=' + id);
  };
  return (
    <div className="userPost">
      <div>
        <img src={picture} draggable="false" alt="profile picture" />
        <div className="userInfPost">
          <Link href={`/perfil/${username}`}>
            {username}
            <UserPermission>
              <PiSwordDuotone />
            </UserPermission>
          </Link>
          <span>{date}</span>
        </div>
      </div>
      <span id="copy" onClick={handleCopy}>
        <PiPaperclipLight />
      </span>
    </div>
  );
}
