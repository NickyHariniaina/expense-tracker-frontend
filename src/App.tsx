import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import { Toaster } from "react-hot-toast";
import DashboardHome from "./components/DashboardElement/DashboardHome";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/auth" element={<Auth />} />
          {/*dashboard routes*/}
          <Route path="/dashboard" element={<DashBoard />}>
            <Route index element={<DashboardHome />} />
          </Route>

        </Routes>
        <Toaster />
      </Router>
    </>
  );
};
export default App;
