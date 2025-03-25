import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Menu, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { auth } from '../../service/firebaseConfig';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const userData = {
          sub: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          picture: firebaseUser.photoURL
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await authService.signInWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigationItems = [
    { name: 'Destinations', href: '/destinations' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Plan a Trip', href: '/create-trip' },
    { name: 'My Trips', href: '/my-trips' },
    { name: 'About Us', href: '/about' },
  ];

  const AuthButton = () => {
    if (loading) {
      return (
        <Button disabled className="bg-[#493628]">
          <Loader2 className="w-4 h-4 animate-spin" />
        </Button>
      );
    }

    if (!user) {
      return (
        <Button
          onClick={handleGoogleSignIn}
          className="bg-[#493628] hover:bg-[#AB886D] text-white"
        >
          Sign in with Google
        </Button>
      );
    }

    return (
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
    );
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
            <AuthButton />
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
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;