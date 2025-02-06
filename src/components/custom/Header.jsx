import React from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
  // State to handle mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items for reusability and consistency
  const navigationItems = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Plan a Trip', href: '/plan' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <header className="w-screen bg-gradient-to-r from-[#E4E0E1] to-[#D6C0B3] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-16 w-auto transform transition-transform duration-300 hover:scale-105"
              src="/logo1.png"
              alt="WanderWise Logo"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#493628] hover:text-[#AB886D] px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              className="bg-[#493628] text-[#E4E0E1] hover:bg-[#AB886D] transition-colors duration-300 px-6 py-2 rounded-lg shadow-md hover:shadow-lg"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-[#493628] hover:text-[#AB886D] transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#E4E0E1] rounded-lg mt-2 shadow-lg">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-[#493628] hover:text-[#AB886D] px-3 py-2 text-base font-medium transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <Button 
                className="w-full mt-2 bg-[#493628] text-[#E4E0E1] hover:bg-[#AB886D] transition-colors duration-300"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;