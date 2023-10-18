import ProfileCard from '@/components/ProfileCard';
import SendPost from '@/components/SendPost';
import Content from '@/components/Content/';
import Search from '@/components/Search';
import './style.css';

export default async function Feed() {
  return (
    <>
      <main className="feedContainer">
        <ProfileCard />
        <section>
          <SendPost />
          <Content page="feed" />
        </section>
        <Search />
      </main>
    </>
  );
}
