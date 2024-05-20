import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import ClarityBreakdown from "./pages/breakdown";
import OPAudit from "./pages/DOTaudit";
import ChatPage from './pages/ChatPage'
import TransactionWizard from './pages/TransactionWizard'; 

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/ClarityBreakdown/:clarityAddress"
          element={<ClarityBreakdown />}
        />
        <Route path="/" element={<Home />} />
        
        <Route path="/ClarityAudit" element={<OPAudit/>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/TransactionWizard" element={<TransactionWizard />} />
      </Routes>
    </div>
  );
}

export default App;