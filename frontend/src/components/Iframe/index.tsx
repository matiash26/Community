import './style.css';
export default function Iframe({ url }: { url: string }) {
  return (
    <iframe
      width="100%"
      height="100%"
      src={'https://www.youtube.com/embed/' + url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="iFrame"
    ></iframe>
  );
}
