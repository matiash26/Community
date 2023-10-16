import './style.css';
import { IComment } from '@/utils/type';
export default function UserComment({ data }: { data: IComment }) {
  const { username, picture, date, comment } = data;
  return (
    <li className="userComment">
      <img src={picture} alt="user picture" />
      <div className="comment">
        <div className="userCommentInf">
          <h2>{username}</h2>
          <span>{date}</span>
        </div>
        <p>{comment}</p>
      </div>
    </li>
  );
}
