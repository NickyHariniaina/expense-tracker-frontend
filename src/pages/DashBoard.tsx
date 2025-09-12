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
        <div className="flex-1 bg-white dark:bg-gray-50 rounded-xl border-2 border-gray-100 m-4 md:m-8 shadow-3xl overflow-auto transition-all duration-300 hover:shadow-5xl relative z-10 transform hover:scale-[1.02]">
          <Outlet />
        </div>
      </div>
    </div>
  );

};

export default DashBoard;

