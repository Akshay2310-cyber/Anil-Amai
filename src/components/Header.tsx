import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const Header = () => {
  const { state } = useCart();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="brand-logo-enhanced text-2xl">
            AnilAmai
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/anil" 
            className="text-sm font-medium transition-colors hover:text-anil-primary modern-text"
          >
            Anil Store
          </Link>
          <Link 
            to="/amai" 
            className="text-sm font-medium transition-colors hover:text-amai-primary modern-text"
          >
            Amai Store
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="relative h-9 w-9"
          >
            <ShoppingCart className="h-4 w-4" />
            {state.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amai-primary text-xs font-bold text-white flex items-center justify-center">
                {state.itemCount > 9 ? '9+' : state.itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};