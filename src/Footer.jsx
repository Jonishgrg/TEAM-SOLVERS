import React from 'react';

const Footer = ({ setCurrentPage }) => {
  const handleNavigation = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const socialLinks = {
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    instagram: 'https://www.instagram.com',
    whatsapp: 'https://whatsapp.com/channel/0029Vb8FmoYB4hdPJln80t09'
  };

  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Team Solver</h3>
            <p className="text-gray-300">Simple, transparent, and accessible agricultural trading platform connecting farmers directly with buyers.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('market')} className="text-gray-300 hover:text-white text-left transition">Market Prices</button></li>
              <li><button onClick={() => handleNavigation('techniques')} className="text-gray-300 hover:text-white text-left transition">Seasonal Farming</button></li>
              <li><button onClick={() => handleNavigation('ask')} className="text-gray-300 hover:text-white text-left transition">Ask Experts</button></li>
              <li><button onClick={() => handleNavigation('weather')} className="text-gray-300 hover:text-white text-left transition">Weather</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect With Us</h4>
            <ul className="space-y-2">
              <li><a href={socialLinks.whatsapp} target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white transition">Join WhatsApp Channel</a></li>
              <li><a href={socialLinks.facebook} target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white transition">Facebook</a></li>
              <li><a href={socialLinks.twitter} target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white transition">Twitter</a></li>
              <li><a href={socialLinks.instagram} target='_blank' rel='noopener noreferrer' className="text-gray-300 hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>support@sajilokrishi.com</li>
              <li>+977 980-123-4567</li>
              <li>Kathmandu, Nepal</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 Team Solver. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;