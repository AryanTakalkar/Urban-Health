import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Map,
  AlertCircle,
  MessageSquare,
  User,
  LogOut,
  LucideActivity,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Map', icon: <Map className='w-4 h-4 mr-2' />, path: '/map' },
    // {
    //   label: 'SOS',
    //   icon: <AlertCircle className='w-4 h-4 mr-2' />,
    //   path: '/sos',
    // },
    {
      label: 'Support',
      icon: <MessageSquare className='w-4 h-4 mr-2' />,
      path: '/chatbot',
    },
    {
      label: (
        <span className='flex items-center'>
          Disease Prediction
          <span className='ml-2 text-xs text-blue-500 font-semibold'>Beta</span>
        </span>
      ),
      icon: <LucideActivity className='w-4 h-4 mr-2' />,
      path: '/disease-prediction',
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link
            to='/'
            className='flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80'
          >
            <span className='font-bold text-xl text-primary'>Urban Health</span>
            <span className='animate-fade-in text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded'>
              Mumbai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-1'>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className='flex items-center'>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='relative rounded-full h-8 w-8 p-0 overflow-hidden'
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <div className='flex items-center justify-center h-full w-full bg-primary text-primary-foreground rounded-full'>
                        <span className='text-sm font-medium'>
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align='end'
                  className='w-56 animate-scale'
                >
                  <DropdownMenuLabel>
                    <div className='flex flex-col space-y-1'>
                      <p className='text-sm font-medium'>{user?.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to='/profile'
                      className='cursor-pointer w-full flex items-center'
                    >
                      <User className='mr-2 h-4 w-4' />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className='text-red-500 focus:text-red-500 cursor-pointer'
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex items-center space-x-2'>
                <Link to='/login'>
                  <Button
                    variant='ghost'
                    size='sm'
                  >
                    Log in
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button size='sm'>Sign up</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className='flex md:hidden ml-2'>
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className='sr-only'>Open main menu</span>
                {isMobileMenuOpen ? (
                  <X
                    className='block h-6 w-6'
                    aria-hidden='true'
                  />
                ) : (
                  <Menu
                    className='block h-6 w-6'
                    aria-hidden='true'
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        } animate-slide-down`}
      >
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md'>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={logout}
              className='w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center'
            >
              <LogOut className='w-4 h-4 mr-2' />
              Log out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
