import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const navigationItems = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Plan a Trip', href: '/create-trip' },
    { name: 'About Us', href: '/about' },
  ];

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded);
      localStorage.setItem('user', JSON.stringify(decoded));
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Text Section */}
          <Link to="/" className="flex items-center space-x-4">
            <img src="/logo1.png" alt="Logo" className="h-12 w-12" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#493628]">WanderWise</span>
              <span className="text-sm text-[#AB886D]">Explore India, Your Way</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-[#493628] hover:text-[#AB886D] transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Button Section */}
          <div className="hidden md:block">
            {!user ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
                auto_select
                context="signin"
                theme="outline"
                size="large"
                locale="en"
                width="250"
              />
            ) : (
              <div className="flex items-center gap-4">
                <img 
                  src={user.picture} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full"
                />
                <Button 
                  variant="outline" 
                  className="border-[#493628] text-[#493628] hover:bg-[#AB886D] hover:text-white"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#493628]" />
            ) : (
              <Menu className="h-6 w-6 text-[#493628]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50">
            <div className="px-4 py-2 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-[#493628] hover:text-[#AB886D] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="py-2">
                {!user ? (
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    useOneTap
                    auto_select
                    context="signin"
                    theme="outline"
                    size="large"
                    width="100%"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                    <Button 
                      variant="outline" 
                      className="border-[#493628] text-[#493628] hover:bg-[#AB886D] hover:text-white"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;