import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Settings as SettingsIcon,
  List as ListIcon,
  Menu as MenuIcon,
  X as XIcon,
  Moon as MoonIcon,
  Sun as SunIcon
} from 'lucide-react';

const NavigationMenu = ({ darkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const menuItems = [
    { name: 'Home', icon: <HomeIcon size={20} />, path: '/' },
    { name: 'Tasks', icon: <ListIcon size={20} />, path: '/tasks' },
    { name: 'Settings', icon: <SettingsIcon size={20} />, path: '/settings' },
  ];

  return (
    <nav className="bg-gradient-to-r from-white to-surface-50 dark:from-surface-800 dark:to-surface-900 border-b border-surface-200 dark:border-surface-700 py-3 px-4 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and brand */}
          <div className="flex items-center space-x-2">
            <ListIcon className="text-primary" size={24} />
            <span className="font-heading font-bold text-xl">Todoo's</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg nav-item-gradient"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full nav-item-gradient"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleDarkMode} className="p-2 mr-2 rounded-full nav-item-gradient">
              {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            <button onClick={toggleMobileMenu} className="p-2 rounded-full nav-item-gradient">
              {isMobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;