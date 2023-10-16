'use client';
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { IPost, IComments } from '@/utils/type';
import { getComment } from '@/utils/community';
import { useSession } from 'next-auth/react';
import { ISession } from '@/context/SessionsProvider';

interface IContext {
  handleVideo: (postId: string) => void;
  videoModal: boolean;
  posts: IPost[];
  setPosts: Dispatch<SetStateAction<IPost[]>>;
  modalPost: IComments;
  setModalPost: Dispatch<SetStateAction<IComments>>;
}

export const GlobalContext = createContext<IContext>({
  handleVideo: (postId: string) => {},
  videoModal: false,
  posts: [],
  setPosts: () => {},
  modalPost: {} as IComments,
  setModalPost: () => {},
});
const initState = {
  comment: [],
  post: null,
  error: false,
};
export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [videoModal, setVideoModal] = useState(false);
  const [modalPost, setModalPost] = useState<IComments>(initState);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: session } = useSession() as ISession;
  const router = useRouter();

  const getPostIdFromParams = useSearchParams().get('post');

  const fetchVideo = async (postId: string) => {
    const token = session?.accessToken as string;
    if (token) {
      const comment = (await getComment(postId, token)) as IComments;
      if (!comment.error) {
        setModalPost({
          post: comment.post,
          comment: comment.comment,
          error: comment.error,
        });
        setVideoModal((prev) => !prev);
      }
    }
  };

  const handleVideo = async (postId: string) => {
    if (getPostIdFromParams && postId === 'exit') {
      router.replace(window.location.pathname);
      setVideoModal(false);
      return;
    } else if (postId === 'exit') {
      setVideoModal(false);
      return;
    }
    fetchVideo(postId);
  };
  useEffect(() => {
    if (getPostIdFromParams) {
      handleVideo(getPostIdFromParams);
    }
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        handleVideo,
        videoModal,
        posts,
        setPosts,
        modalPost,
        setModalPost,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
