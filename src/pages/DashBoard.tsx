import { type FC } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const DashBoard: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden pt-10">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-70 h-full relative z-50">
          <Sidebar />
        </div>
        
        {/* Content area */}
        <div className="flex-1 bg-white/10 dark:bg-gray-400/30 backdrop-blur-lg border border-gray-400/50 dark:border-gray-700/50 m-4 md:m-8 shadow-2xl overflow-auto transition-all duration-300 hover:shadow-3xl">

          <Outlet />
        </div>
      </div>
    </div>
  );

};

export default DashBoard;

