import Content from '@/components/Content';
import ProfileCard from '@/components/ProfileCard';
import SendPost from '@/components/SendPost';
import Search from '@/components/Search';
import CatSpinner from './CatSpinner';
import './style.css';

export default async function Feed() {
  return (
    <>
      <main className="feedContainer">
        <ProfileCard />
        <section>
          <SendPost />
          <Content page="feed" />
          <CatSpinner />
        </section>
        <Search />
      </main>
    </>
  );
}
