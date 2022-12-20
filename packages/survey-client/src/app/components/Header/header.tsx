import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex flex-row justify-between items-center px-6 w-full bg-purple-800 shadow-md">
      <h1 className="text-3xl font-bold text-white">Header</h1>
      <div role="navigation" className="flex-auto p-4">
        <ul className="flex justify-start items-center pl-16">
          <li className={`${pathname === '/' ? 'active' : ''}`}>
            <Link to="/">Surveys</Link>
          </li>
          <li className={`${pathname === '/page-2' ? 'active' : ''}`}>
            <Link to="/page-2">Users</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
