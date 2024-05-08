'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { IResponse } from '@/utils/type';
import { BsImages } from 'react-icons/bs';
import { postData } from '@/utils/community';
import { ISession } from '@/context/SessionsProvider';
import './style.css';

const ErrorInit = {
  error: false,
  message: '',
};
const postInit = {
  text: '',
  file: null,
  videoId: '',
};
type IPosts = {
  text: string;
  file?: File | null;
  videoId: string;
};
export default function SendPost() {
  const [opt, setOpt] = useState(false);
  const [select, setSelect] = useState('Feed');
  const [post, setPost] = useState<IPosts>(postInit);
  const [error, setError] = useState<IResponse>(ErrorInit);
  const { data: session } = useSession() as ISession;

  const fileName = post?.file?.name;
  const userTyping = !!post.text.split('').length;
  const filter = select === 'Feed' ? 'React' : 'Feed';
  const isReact = select === 'React';
  isReact && post.file ? setPost({ text: '', videoId: '', file: null }) : null;

  const openSelect = () => {
    setOpt((prev) => !prev);
  };
  const handleSelect = () => {
    setSelect((prev) => (prev === 'Feed' ? 'React' : 'Feed'));
    setOpt(false);
  };
  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const el = event.target as HTMLInputElement | HTMLTextAreaElement;

    if (el instanceof HTMLInputElement && el.type === 'file') {
      const file = el.files as FileList;
      setPost((prev) => ({ ...prev, file: file[0] }));
      return;
    }
    const inputName = el.name;
    setPost((prev) => ({ ...prev, [inputName]: el.value }));
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (post) {
      const token = session!.accessToken;
      const bodyFormData = new FormData();
      bodyFormData.append('videoId', post.videoId);
      bodyFormData.append('file', post.file as File);
      bodyFormData.append('text', post.text);
      bodyFormData.append('page', select);
      try {
        const response = await postData(bodyFormData, token);
        console.log(response);
        if (response.error) {
          setError(response);
          return;
        }
        setPost({ text: '', file: null, videoId: '' });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="sendPost">
      <div className="formPubli">
        <ul className={`postOpt ${opt && 'openOpt'}`}>
          <li onClick={openSelect}>{select}</li>
          <li onClick={handleSelect}>{filter}</li>
        </ul>
        {error && <p className="errorSubmit">{error.message}</p>}
        <form onSubmit={onSubmit}>
          <div
            className={`submitPost ${userTyping && 'open'} ${
              isReact && 'reactType'
            }`}
          >
            <img src={session?.user.image} draggable="false" />
            <div className="inputs">
              <textarea
                placeholder="No que você está pensando?"
                name="text"
                onChange={handleInput}
                value={post.text}
                autoComplete="off"
                className={'textArea '}
                maxLength={500}
              />
              {isReact && (
                <>
                  <input
                    type="text"
                    onChange={handleInput}
                    value={post.videoId}
                    name="videoId"
                    id="videoId"
                    placeholder="VideoId"
                  />
                  <p className="example">
                    youtube.com/watch?v=<span>xxxxx</span>
                  </p>
                </>
              )}
            </div>
          </div>
          <div className={`fileDiv ${isReact && 'hidden'}`}>
            <label htmlFor="post">
              <BsImages />
              <span>{fileName}</span>
            </label>
            <input
              type="file"
              onChange={handleInput}
              name="file"
              id="post"
              accept=".png, .jpeg, .jpg, .mp4"
            />
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
