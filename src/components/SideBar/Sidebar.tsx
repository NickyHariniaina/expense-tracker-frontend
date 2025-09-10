import type { FC } from "react";
import { Link , useLocation } from 'react-router-dom';

const SideBar: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link 
            to="/dashboard" className={`block px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/dashboard' 
                  ? 'bg-blue-600 text-white font-semibold' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
