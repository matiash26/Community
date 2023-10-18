'use client';
import { useState, useEffect, useCallback } from 'react';
import useInfinityScroll from '../../Hooks/useInfinityScroll';
import { useSession } from 'next-auth/react';
import { getAllFeed } from '@/utils/community';
import { ISession } from '@/context/SessionsProvider';
import AlertScreen from './AlertScreen';
import { IPost } from '@/utils/type';
import Media from '../Media';
import Post from '../Post';

interface Props {
  page: string | undefined;
  user?: string;
}
const stateInit = { limit: 10, offset: 0 };
function Content({ page, user }: Props) {
  const [pag, setPag] = useState(stateInit);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession() as ISession;
  const [thereIsMoreData, setThereIsMoreData] = useState(true);
  const [thereIsError, setThereIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  useInfinityScroll(setPag);

  const fetch = useCallback(async () => {
    const token = session?.accessToken as string;
    if (thereIsMoreData && token) {
      try {
        const response = await getAllFeed(
          page,
          pag.limit,
          pag.offset,
          user,
          token,
        );
        if (!response.error) {
          setPosts((prev) => [...prev, ...response.data]);
          response.data.length < 10 && setThereIsMoreData(false);
          response.data.length < 1 && setIsEmpty(true);
          return;
        }
      } catch (error) {
        setIsEmpty(true);
        setThereIsError(true);
        console.error(error);
      }
    }
  }, [pag, session]);

  useEffect(() => {
    fetch();
  }, [pag, session]);

  if (isEmpty) return <AlertScreen error={thereIsError} />;
  return (
    <>
      {posts.map((post: IPost) => (
        <Post key={post.id} postInf={post}>
          <Media key={post.id} path={post.pathMedia} />
        </Post>
      ))}
    </>
  );
}

export default Content;
