import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import { Toaster } from "react-hot-toast";
import DashboardHome from "./components/DashboardElement/DashboardHome";
import DashboardIncome from "./components/DashboardElement/DashboardIncome";
import DashboardCategory from "./components/DashboardElement/DashboardCategory";
import DashboardExpense from "./components/DashboardElement/DashboardExpense";
import DashboardSummary from "./components/DashboardElement/DashboardSummary";

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
            <Route path="expense" element={< DashboardExpense/>} />
            <Route path="income" element={<DashboardIncome />} />
            <Route path="category" element={<DashboardCategory />} />
            <Route path="summary" element={<DashboardSummary />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
