'use client';
import { GlobalContext } from '@/context/globalProvider';
import { useContext } from 'react';
import PostModal from '../PostModal';

export default function ModalByLink() {
  const { videoModal } = useContext(GlobalContext);
  return <>{videoModal && <PostModal />}</>;
}
