'use client';
import { useState, useEffect } from 'react';
import useInfinityScroll from '../../Hooks/useInfinityScroll';
import { useSession } from 'next-auth/react';
import { getAllFeed } from '@/utils/community';
import { ISession } from '@/context/SessionsProvider';
import AlertScreen from './AlertScreen';
import { IPost } from '@/utils/type';
import Media from '../Media';
import Post from '../Post';
import CatSpinner from './CatSpinner';
interface Props {
  page: string | undefined;
  user?: string;
}
const stateInit = { limit: 10, offset: 0 };
function Content({ page, user }: Props) {
  const [pag, setPag] = useState(stateInit);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [feedStatus, setFeedStatus] = useState({ empty: false, error: false });
  const [thereIsMoreData, setThereIsMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession() as ISession;
  useInfinityScroll(setPag);

  const fetch = async () => {
    const token = session?.accessToken as string;
    if (thereIsMoreData && token) {
      setIsLoading(true);
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
          response.data.length < 1 &&
            setFeedStatus((prev) => ({ ...prev, empty: true }));
          return;
        }
      } catch (error) {
        setFeedStatus({ empty: true, error: true });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    fetch();
  }, [pag, session]);

  if (feedStatus.error || feedStatus.empty) {
    return <AlertScreen error={feedStatus.error} />;
  }

  return (
    <>
      {posts.map((post: IPost) => (
        <Post key={post.id} postInf={post}>
          <Media key={post.id} path={post.pathMedia} />
        </Post>
      ))}
      {isLoading && <CatSpinner />}
    </>
  );
}

export default Content;
