import React from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Plan a Trip', href: '/plan' },
    { name: 'About Us', href: '/about' },
  ];

  return (
    <header className="relative border-b border-gray-200">
      <div className="w-screen mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Text Section */}
          <div className="flex items-center space-x-4">
            <img src="/logo1.png" alt="Logo" className="h-12 w-12" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#493628]">WanderWise</span>
              <span className="text-sm text-[#AB886D]">Explore India, Your Way</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#493628] hover:text-[#AB886D] transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <Button variant="outline" className="border-[#493628] text-[#493628] hover:bg-[#AB886D] hover:text-white">
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-[#493628] hover:text-[#AB886D] transition-colors duration-300 md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="px-4 py-2 space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-[#493628] hover:text-[#AB886D] transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
              <Button variant="outline" className="w-full border-[#493628] text-[#493628] hover:bg-[#AB886D] hover:text-white mr-10">
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