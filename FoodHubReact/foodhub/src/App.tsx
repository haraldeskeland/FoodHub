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
import Layout from './shared/Layout';
import ItemPage from './items/ItemPage';




const App: React.FC = () => {
  return (
    <Router>
      <div className="font-inter flex flex-col min-h-screen text-base leading-normal text-gray-800 dark:bg-[#0d0d0d] dark:text-white overflow-x-hidden">
        <NavBar />
        <main className="flex-grow mx-auto px-4 mt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/itemcreate" element={<ItemCreatePage />} />
            <Route path="/itemupdate/:itemId" element={<ItemUpdatePage />} />
            <Route path="/item/:itemId" element={<ItemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {/* You can add your footer here if needed */}
      </div>
    </Router>
  );
};

export default App;
