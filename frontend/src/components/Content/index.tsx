'use client';
import { useState, useEffect, useCallback } from 'react';
import useInfinityScroll from '../Hooks/useInfinityScroll';
import { useSession } from 'next-auth/react';
import { getAllFeed } from '@/utils/community';
import { IPost } from '@/utils/type';
import { ISession } from '@/context/SessionsProvider';
import Post from '../Post';

const stateInit = { limit: 10, offset: 0 };
interface Props {
  page: string | undefined;
  user?: string;
}
function Content({ page, user }: Props) {
  const [thereIsMoreData, setThereIsMoreData] = useState(true);
  const [pag, setPag] = useState(stateInit);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession() as ISession;
  useInfinityScroll(setPag);
  const fetch = useCallback(async () => {
    const token = session?.accessToken as string;
    if (thereIsMoreData && token) {
      try {
        const response = (await getAllFeed(
          page,
          pag.limit,
          pag.offset,
          user,
          token,
        )) as IPost[];
        setPosts((prev: IPost[]) => [...prev, ...response]);
        response.length < 10 ? setThereIsMoreData(false) : null;
      } catch (error) {
        console.error(error);
      }
    }
  }, [pag, session]);
  useEffect(() => {
    fetch();
  }, [pag, session]);
  return (
    <>
      {posts.map((post: IPost) => (
        <Post key={post.id} postInf={post} />
      ))}
    </>
  );
}

export default Content;
