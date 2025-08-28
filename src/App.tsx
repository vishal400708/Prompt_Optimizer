import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PromptAnalyzer from './pages/PromptAnalyzer';
import OptimizationEngine from './pages/OptimizationEngine';
import FeedbackCollection from './pages/FeedbackCollection';
import PerformanceAnalytics from './pages/PerformanceAnalytics';
import ModelManagement from './pages/ModelManagement';
import APIDocumentation from './pages/APIDocumentation';
import SystemMonitoring from './pages/SystemMonitoring';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analyzer" element={<PromptAnalyzer />} />
              <Route path="/optimization" element={<OptimizationEngine />} />
              <Route path="/feedback" element={<FeedbackCollection />} />
              <Route path="/analytics" element={<PerformanceAnalytics />} />
              <Route path="/models" element={<ModelManagement />} />
              <Route path="/api" element={<APIDocumentation />} />
              <Route path="/monitoring" element={<SystemMonitoring />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;