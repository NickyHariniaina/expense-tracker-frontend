import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaMoneyBill, FaWallet, FaChartBar, FaList } from 'react-icons/fa';
import { FaSackDollar } from 'react-icons/fa6';
import { useUserStore } from '../../store/user'; // Ajuste le chemin selon ton projet

const Sidebar: React.FC = () => {
  const { userData, fetchUserData } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const displayName = userData?.email ? userData.email.split('@gmail.com')[0] : 'Utilisateur';
  const initial = displayName.charAt(0) || 'U'; 

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-2 px-4 py-4 rounded-lg transition-colors ${
      isActive ? 'secondary-color text-white font-semibold' : 'neutraly-color text-white hover:bg-secondary-color hover:text-white hover:font-semibold'
    }`;
  };

  return (
    <aside className="w-64 h-screen bg-white flex flex-col gap-20 p-5 fixed left-0">
      {/* Section haute (nom sans photo pour l'instant) */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-20 h-20 rounded-full primary-color flex items-center uppercase text-2xl justify-center font-bold text-white">
          {initial}
        </div>
        <p className="text-xl font-medium capitalize text-green">{displayName}</p>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard" className={getLinkClasses('/dashboard')}>
              <FaHome className="size-5" /> <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/expense" className={getLinkClasses('/dashboard/expense')}>
              <FaMoneyBill className="size-5" /> <span>Expense</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/income" className={getLinkClasses('/dashboard/income')}>
              <FaWallet className="size-5" /> <span>Income</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/category" className={getLinkClasses('/dashboard/category')}>
              <FaList className="size-5" /> <span>Category</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/summary" className={getLinkClasses('/dashboard/summary')}>
              <FaChartBar className="size-5" /> <span>Summary</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Section basse (WalletWatch) */}
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-green font-bold text-lg">WalletWatch</h1>
        <FaSackDollar className="size-7 text-red" />
      </div>
    </aside>
  );
};

export default Sidebar;