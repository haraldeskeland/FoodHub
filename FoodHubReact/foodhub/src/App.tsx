// Portions of this file may be inspired by course demos created by the course lecturer: "Baifan Zhou".
// These were used as learning references. Credit goes to Baifan Zhou for similar code.
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './home/HomePage';
import ItemListPage from './items/ItemListPage';
import NavBar from './shared/NavBar';
import ItemCreatePage from './items/ItemCreatePage';
import ItemUpdatePage from './items/ItemUpdatePage';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow container mx-auto px-4 mt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/itemcreate" element={<ItemCreatePage />} />
            <Route path="/itemupdate/:itemId" element={<ItemUpdatePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {/* You can add your footer here if needed */}
      </div>
    </Router>
  );
};

export default App;
