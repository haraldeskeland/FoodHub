import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FoodHub. All rights reserved.</p>
        <p className="text-sm">Follow us on <a href="https://instagram.com" className="text-blue-400 hover:underline">Instagram</a></p>
      </div>
    </footer>
  );
};

export default Footer;