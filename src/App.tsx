import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/expense" />
          <Route path="/dashboard/income" />
          <Route path="/dashboard/category" />
          <Route path="/dashboard/summary" />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
