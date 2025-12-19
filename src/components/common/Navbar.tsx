import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pantry Tracker", href: "/pantry-tracker" },
    { name: "Challenges", href: "/challenges" },
    { name: "Community", href: "/community" },
  ];

  const getLinkClass = (path: string) => {
    const baseClass = "px-3 py-2 rounded-lg font-medium transition-colors duration-200";
    if (location.pathname === path) {
      return `${baseClass} text-green-600 bg-green-50`; // Active: Màu xanh, nền xanh nhạt
    }
    return `${baseClass} text-gray-600 hover:text-gray-900 hover:bg-gray-100`; // Normal
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-glow transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
              }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Plate
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Wise
              </span>
            </span>
          </Link>

          {/* Cho desktop Nav*/}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={getLinkClass(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </button>
            <button
              className="px-6 py-2 text-sm font-semibold text-white rounded-lg hover:shadow-glow transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
              }}
            >
              Start Free
            </button>
          </div>

          {/* Menu button cho phone */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-up">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-green-50 rounded-lg font-medium transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-4 pt-3 border-t border-gray-200">
                <button className="w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-green-50 rounded-lg transition-all">
                  Sign In
                </button>
                <button
                  className="w-full py-2 text-sm font-semibold text-white rounded-lg hover:shadow-glow transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
                  }}
                >
                  Start Free
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
