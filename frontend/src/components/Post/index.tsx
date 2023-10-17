'use client';
import { useState, useEffect, useContext } from 'react';
import { FaRegCommentAlt, FaRegHeart } from 'react-icons/fa';
import { GlobalContext } from '@/context/globalProvider';
import { useSession } from 'next-auth/react';
import { IPostInfo } from '@/utils/type';
import MediaContent from '../Media';
import { sendLike } from '@/utils/community';
import { ISession } from '@/context/SessionsProvider';
import UserPost from '@/components/UserPost';
import Iframe from '../Iframe';
import './style.css';

const stateInit = { like: '0', mad: '0', funny: '0', clap: '0' };

export default function Post({ postInf }: IPostInfo) {
    const [openEmote, setOpenEmote] = useState(false);
  const [emote, setEmote] = useState(stateInit);
  const { handleVideo } = useContext(GlobalContext);
  const { data: session } = useSession() as ISession;
  const {
    id,
    text,
    emote00,
    emote01,
    emote02,
    emote03,
    pathMedia,
    totalOfComments,
    page,
  } = postInf;

  const isReact = page === 'react' && pathMedia;
  const file = process.env.NEXT_PUBLIC_URL_FILE as string;
  const totalLikes = Object.values(emote).reduce(
    (acc, el) => (acc += parseInt(el)),
    0
  );

  const handleOpenEmote = () => {
    setOpenEmote((prev) => !prev);
  };

  const handleLike = async (typeOfLike: string) => {
    const token = session!.accessToken;
    try {
      const response = await sendLike(id, typeOfLike, token);
      if (!response.error) {
        const update = response.update;
        setEmote((prevEmote) => ({
          ...prevEmote,
          like: update.emote00,
          mad: update.emote01,
          funny: update.emote02,
          clap: update.emote03,
        }));
        setOpenEmote(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setEmote({ like: emote00, mad: emote01, funny: emote02, clap: emote03 });
  }, []);
  return (
    <article className="midiaContainer">
      <UserPost user={postInf} />
      <h2 className="userText">{text}</h2>
      <div className="userMidia">
        {isReact ? (
          <Iframe url={pathMedia} />
        ) : (
          <MediaContent path={pathMedia} />
        )}
      </div>
      <div className="userInteractions">
        <span onClick={() => handleVideo(`${id}`)}>
          <FaRegCommentAlt /> {totalOfComments}
        </span>
        <span onClick={handleOpenEmote}>
          <FaRegHeart />
          {totalLikes}
          <ul className={`emotes ${openEmote && "openEmotes"}`}>
            <li onClick={() => handleLike('0')}>
              <img src={file + 'emotes/like.webp'} alt="like" />
              <span className="emoteCount">{emote.like}</span>
            </li>
            <li onClick={() => handleLike('1')}>
              <img src={file + 'emotes/mad.png'} alt="mad" />
              <span className="emoteCount">{emote.mad}</span>
            </li>
            <li onClick={() => handleLike('2')}>
              <img src={file + 'emotes/haha.png'} alt="hahaha" />
              <span className="emoteCount">{emote.funny}</span>
            </li>
            <li onClick={() => handleLike('3')}>
              <img src={file + 'emotes/clap.gif'} alt="clap" />
              <span className="emoteCount">{emote.clap}</span>
            </li>
          </ul>
        </span>
      </div>
    </article>
  );
}
