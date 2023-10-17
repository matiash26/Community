'use client';
import {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

type IProps = Dispatch<SetStateAction<{ limit: number; offset: number }>>;

export default function useInfinityScroll(setLimit: IProps): void {
  const [scrolled, setScrolled] = useState<boolean>(false);

  const getPercScroll = useCallback(() => {
    const innerHeight = window.innerHeight;
    const pageSize = document.documentElement.scrollHeight - innerHeight;
    const scrollSize = window.scrollY;

    const getPorc = (scrollSize / pageSize) * 100;
    if (getPorc >= 100 && scrolled === false) {
      setLimit((prev) => ({ ...prev, offset: prev.offset + prev.limit }));
      setScrolled(true);
    }
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', getPercScroll);
    return () => window.removeEventListener('scroll', getPercScroll);
  }, [scrolled]);
}
