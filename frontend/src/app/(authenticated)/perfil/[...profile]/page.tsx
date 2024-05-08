import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { searchUser } from '@/utils/community';
import DescProfile from '@/components/DescProfile';
import NotFound from '@/components/NotFound/page';
import Content from '@/components/Content/';
import './style.css';

interface IParams {
  params: { profile: string };
}
interface ISessionServer {
  accessToken: string;
}
export default async function Profile({ params }: IParams) {
  const userProfile = params.profile[0];
  const session = (await getServerSession(authOptions)) as ISessionServer;
  const token = session.accessToken as string;

  const user = await searchUser(userProfile, 'get', token);
  const [userInf] = user.search;
  if (user.error || !userInf) {
    return <NotFound />;
  }
  return (
    <main className="mainProfile">
      <section className="profileSection">
        <div className="profileBanner">
          <div className="banner">
            <img src="/banner.jpeg" alt="" />
          </div>
          <div className="profile">
            <div className="profilePic">
              <img src={userInf.picture} alt="profile picture" />
            </div>
            <div className="name">
              <h1>{userInf.username}</h1>
              <DescProfile desc={userInf.descText} user={userInf.username} />
            </div>
          </div>
          <ul className="profileCardInf">
            <li>
              <span>{userInf.totalPosts}</span>
              <span>Posts</span>
            </li>
            <li>
              <span>{userInf.totalComments}</span>
              <span>Comments</span>
            </li>
            <li>
              <span>{userInf.totalLikes}</span>
              <span>Likes</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="profilePosts">
        <Content page={undefined} user={userInf.username} />
      </section>
    </main>
  );
}
