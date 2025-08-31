import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Link } from "react-router-dom";
import { MessageSquare, User, LogIn , Settings, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold hidden sm:block">ChitChat</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn btn-sm gap-2">
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>

          <Link to="/settings" className="btn btn-sm gap-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="btn btn-sm gap-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
              <button
                className="btn btn-sm gap-2"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-base-200"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300 shadow-lg">
          <div className="flex flex-col p-3 space-y-2">
            <Link
              to="/login"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200">
              <LogIn className="w-4 h-4" /> Login
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
              onClick={() => setIsOpen(false)}>
              <Settings className="w-4 h-4" /> Settings
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
