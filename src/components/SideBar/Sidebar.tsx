import type { FC } from "react";
import { Link , useLocation } from 'react-router-dom';

const SideBar: FC = () => {
  const location = useLocation();

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname == path;

  {/*TODO : change taiwinds customization*/}
    return `block px-4 py-2 rounded-lg transition-colors ${
isActive 
? 'bg-blue-600 text-white font-semibold' 
: 'text-gray-300 hover:bg-gray-700'
}`;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard" className={getLinkClasses('/dashboard')}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard/expense" className={getLinkClasses('/dashboard/expense')}>
            Expense
          </Link>
        </li> 
        <li>
          <Link to="/dashboard/income" className={getLinkClasses('/dashboard/income')}>
            Income
          </Link>
        </li>
        <li>
          <Link to="/dashboard/category" className={getLinkClasses('/dashboard/category')}>
            Category
          </Link>
        </li>
        <li>
          <Link to="/dashboard/summary" className={getLinkClasses('/dashboard/summary')}>
            Summary
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
