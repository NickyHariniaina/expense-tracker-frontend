import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaBell, FaUserCog, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../utils/auth";

const Header: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const handleResize = () => setIsWideScreen(window.innerWidth > 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-red-500 text-white font-semibold"
        : "text-gray-300 hover:bg-red-600"
    }`;
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="w-full neutraly-color text-white p-4 flex justify-end items-center fixed top-0">
      <nav>
        <ul className="flex space-x-2">
          <li>
            <button className={getLinkClasses("/dashboard/notifications")}>
              <FaBell className="size-5" />
              {isWideScreen && <span>Notification</span>}
            </button>
          </li>
          <li className="relative">
            <button
              onClick={toggleDropdown}
              className={getLinkClasses("/dashboard/user-settings")}
            >
              <FaUserCog className="size-5" />
              {isWideScreen && <span>User Settings</span>}
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={getLinkClasses("/dashboard/profile")}
                    onClick={toggleDropdown}
                  >
                    <FaUser className="size-5" /> <span>Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/settings"
                    className={getLinkClasses("/dashboard/settings")}
                    onClick={toggleDropdown}
                  >
                    <FaCog className="size-5" /> <span>Settings</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    className={getLinkClasses("/dashboard/logout")}
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="size-5" /> <span>Logout</span>
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
