import { PiMonitorLight, PiArticleLight } from 'react-icons/pi';
import { AiOutlineHome } from 'react-icons/ai';
import MenuUser from '../MenuUser';
import Link from 'next/link';
import './style.css';
function Header() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          {/* <img src="/logo.png" alt="logo" draggable="false"/> */}
          <p>LOGO</p>
        </Link>
        <ul className="menu">
          <li>
            <Link href="/">
              <AiOutlineHome />
            </Link>
          </li>
          <li>
            <Link href="/react">
              <PiMonitorLight />
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <PiArticleLight />
            </Link>
          </li>
        </ul>
        <MenuUser />
      </nav>
    </header>
  );
}
export default Header;
