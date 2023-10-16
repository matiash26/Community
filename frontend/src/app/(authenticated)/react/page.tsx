import ProfileCard from '@/components/ProfileCard';
import CatSpinner from '../(feed)/CatSpinner';
import SendPost from '@/components/SendPost';
import Content from '@/components/Content';
import Search from '@/components/Search';
import './style.css';
export default function React() {
  return (
    <>
      <main className="reactContainer">
        <ProfileCard />
        <section>
          <SendPost />
          <Content page="react" />
          <CatSpinner />
        </section>
        <Search />
      </main>
    </>
  );
}
