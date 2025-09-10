import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/expense" element={<h1>Expense Page</h1>} />
          <Route path="/income" element={<h1>Income Page</h1>} />
          <Route path="/summary" element={<h1>Summary Page</h1>} />
        </Routes>
        <Toaster />
    </Router>
    
  );
};

export default App;
