import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCog, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Header: React.FC = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 600);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth > 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getLinkClasses = (path: string) => {
        const isActive = location.pathname === path;
        return `flex items-center space-x-2 px-4 py-2 rounded-lg ${
            isActive ? 'bg-red-500 text-white font-semibold' : 'text-gray'
        }`;
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        navigate('/auth'); // Remplace par ta logique de déconnexion
        setIsDropdownOpen(false); // Ferme le dropdown
    };

    return (
        <header className="w-full bg-white p-4 flex justify-end items-center fixed top-0 z-10">
            <nav>
                <ul className="flex space-x-2">
                    <li>
                        <button className="terty-color flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer ">
                            <FaBell className="size-5 text-white" />
                            {isWideScreen && <span className="text-white">Notification</span>}
                        </button>
                    </li>
                    <li className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="terty-color flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer"
                        >
                            <FaUserCog className="size-5 text-white" />
                            {isWideScreen && <span className="text-white">User Settings</span>}
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                <li>
                                    <NavLink
                                        to="/dashboard/profile"
                                        className={getLinkClasses('/dashboard/profile')}
                                        onClick={toggleDropdown}
                                    >
                                        <FaUser className="size-5" />
                                        {isWideScreen && <span>Profile</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/settings"
                                        className={getLinkClasses('/dashboard/settings')}
                                        onClick={toggleDropdown}
                                    >
                                        <FaCog className="size-5" />
                                        {isWideScreen && <span>Settings</span>}
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className={getLinkClasses('/dashboard/logout')}
                                    >
                                        <FaSignOutAlt className="size-5" />
                                        {isWideScreen && <span>Logout</span>}
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