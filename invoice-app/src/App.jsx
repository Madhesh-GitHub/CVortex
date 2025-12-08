import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import CreateInvoice from './pages/CreateInvoice';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>

        {/* WRAPPER ROUTE: Applies Layout to everything inside */}
        <Route path="/" element={<Layout />}>

          {/* Inner Routes */}
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateInvoice />} />

          {/* FIXED: Now pointing to the real History component */}
          <Route path="history" element={<History />} />

          <Route path="settings" element={<div className="text-2xl font-bold text-gray-500">Settings Page Coming Soon</div>} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;