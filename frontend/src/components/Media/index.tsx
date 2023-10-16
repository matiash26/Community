'use client';
import { useRef, useEffect } from 'react';
import TypeOfMedia from '@/utils/TypeOfMedia';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';
import './style.css';

export default function Media({ path }: { path: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const media = TypeOfMedia(path);
  const file = process.env.NEXT_PUBLIC_URL_FILE as string;
  const url = file + path;
  let player: any;
  useEffect(() => {
    if (media === 'mp4') {
      if (videoRef.current && !player) {
        player = new Plyr(videoRef?.current, {
          controls: [
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'fullscreen',
          ],
        });
      } else {
        player.source = {
          type: 'video',
          sources: [
            {
              src: url,
              provider: 'html5',
            },
          ],
        };
        player.play();
      }
      return () => {
        if (player) {
          player.destroy();
        }
      };
    }
  }, []);
  return (
    <>
      {media === 'mp4' ? (
        <div className="video">
          <video ref={videoRef}>
            <source src={url} type="video/mp4" style={{ height: '100%' }} />
          </video>
        </div>
      ) : (
        <img
          src={url}
          className="videoImg"
          style={{ display: media ? 'block' : 'none' }}
        />
      )}
    </>
  );
}
