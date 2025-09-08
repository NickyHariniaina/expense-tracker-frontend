import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Auth from "./pages/Auth";

const App: React.FC = () => {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </Router>
  
    </>
  );
};
export default App;
