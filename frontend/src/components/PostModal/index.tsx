'use client';
import { useContext, FormEvent, useRef } from 'react';
import { GlobalContext } from '@/context/globalProvider';
import { postComment } from '@/utils/community';
import { useSession } from 'next-auth/react';
import MediaContent from '../Media';
import { ISession } from '@/context/SessionsProvider';
import TypeOfMedia from '@/utils/TypeOfMedia';
import UserComment from '../UserComment';
import { BsXLg } from 'react-icons/bs';
import { IPost } from '@/utils/type';
import Media from '../Post';
import Post from '../Post';
import 'plyr/dist/plyr.css';
import './style.css';

export default function PostModal() {
  const { handleVideo, modalPost, setModalPost } = useContext(GlobalContext);
  const { data: session } = useSession() as ISession;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const post = modalPost.post as IPost;
  const comments = modalPost.comment;
  const urlModal = post?.pathMedia as string;
  const thereIsMedia = TypeOfMedia(urlModal) ? 'exist' : 'notExist';
  const isMedia = thereIsMedia === 'exist';
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      const postId = post?.id;
      const comment = inputRef.current.value;
      const token = session!.accessToken;
      try {
        const response = await postComment(1, `${postId}`, comment, token);
        if (!response.error) {
          inputRef.current.value = '';
          setModalPost((prev) => ({ ...prev, comment: response.comment }));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <section className={`videoContainer ${thereIsMedia}`}>
      <div className="videoContent">
        <div className="videoItem">
          <MediaContent path={urlModal} />
        </div>
        <div className="commentsContainer">
          <div className="exit">
            <span onClick={() => handleVideo('exit')}>
              <BsXLg />
            </span>
            {isMedia && (
              <div className="userPostInf">
                <Post postInf={post} />
              </div>
            )}
          </div>
          <div className="userModal">
            <Media postInf={modalPost.post!} />
          </div>
          <ul className="comments">
            <h2>Comentários</h2>
            {comments.map((comment) => (
              <UserComment key={comment.id} data={comment} />
            ))}
          </ul>
          <form className="inputComment" onSubmit={onSubmit}>
            <img src={session?.user?.image ?? ''} alt="user picture" />
            <input
              type="text"
              ref={inputRef}
              placeholder="Adicionar um comentário..."
            />
          </form>
        </div>
      </div>
    </section>
  );
}
