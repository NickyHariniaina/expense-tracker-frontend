import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaHome,
  FaMoneyBill,
  FaWallet,
  FaChartBar,
  FaList,
} from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { useUserStore } from "../../store/user";

const Sidebar: React.FC = () => {
  const { userData, fetchUserData } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const displayName = userData?.email
    ? userData.email.split("@")[0]
    : "User";
  const initial = displayName.charAt(0).toUpperCase() || "U";

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-300 group ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;
  };

  return (
    <aside className="z-10 w-64 h-screen bg-white flex flex-col fixed left-5">
      {/* Section haute */}
      <div className="flex flex-col items-center space-y-3 p-6 border-b border-gray-100">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {initial}
        </div>
        <p className="text-lg font-spartan font-semibold text-gray-800 capitalize">
          {displayName}
        </p>
        {userData?.email && (
          <p className="text-sm font-spartan text-gray-500 truncate max-w-full">
            {userData.email}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {[
            { to: "/dashboard", icon: FaHome, label: "Home" },
            { to: "/dashboard/expense", icon: FaMoneyBill, label: "Expense" },
            { to: "/dashboard/income", icon: FaWallet, label: "Income" },
            { to: "/dashboard/category", icon: FaList, label: "Category" },
            { to: "/dashboard/summary", icon: FaChartBar, label: "Summary" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink to={item.to} className={getLinkClasses(item.to)}>
                  <Icon className="text-lg flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-5 border-t border-gray-100 bg-gray-50 mt-auto">
        <div className="flex flex-col items-center space-y-2 -mt-2"> {/* Remonté avec -mt-2 */}
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 bg-green-100 rounded-full"> {/* Changé pour vert */}
              <FaSackDollar className="text-xl text-green-600" /> {/* Changé pour vert */}
            </div>
            <h1 className="text-gray-800 font-bold text-lg">WalletWatch</h1>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Manage your finances wisely
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
