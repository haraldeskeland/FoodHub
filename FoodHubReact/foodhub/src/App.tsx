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
      <div className="font-inter flex flex-col min-h-screen text-base leading-normal text-gray-800 dark:bg-[#101010] dark:text-white overflow-x-hidden">
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
