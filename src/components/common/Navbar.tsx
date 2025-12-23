import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SESSION_KEYS, AuthState } from '../../libs/sessionKeys';
import { Toast } from './Toast';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const nav = useNavigate();

  const [auth, setAuth] = useLocalStorage<AuthState>(SESSION_KEYS.auth, {
    isAuthed: false,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('Logged in successfully!');
  const prevAuthedRef = useRef<boolean>(auth.isAuthed);

  useEffect(() => {
    const wasAuthed = prevAuthedRef.current;
    if (!wasAuthed && auth.isAuthed) {
      setToastMsg(
        auth.username
          ? `Welcome, ${auth.username}!`
          : 'Logged in successfully!',
      );
      setToastOpen(true);
    }
    prevAuthedRef.current = auth.isAuthed;
  }, [auth.isAuthed, auth.username]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pantry Tracker', href: '/pantry-tracker' },
    { name: 'Challenges', href: '/challenges' },
    { name: 'Community', href: '/community' },
  ];

  const getLinkClass = (path: string) => {
    const baseClass =
      'px-3 py-2 rounded-lg font-medium transition-colors duration-200';
    if (location.pathname === path) {
      return `${baseClass} text-green-600 bg-green-50`;
    }
    return `${baseClass} text-gray-600 hover:text-gray-900 hover:bg-gray-100`;
  };

  function logout() {
    setAuth({ isAuthed: false });
    setIsOpen(false);
    nav('/signin', { replace: true });
  }

  return (
    <>
      <Toast
        open={toastOpen}
        message={toastMsg}
        type="success"
        onClose={() => setToastOpen(false)}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-glow transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
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
                      'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Wise
                </span>
              </span>
            </Link>

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

            <div className="hidden md:flex items-center gap-3">
              {!auth.isAuthed ? (
                <>
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-green-50"
                    title="Sign In"
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--bg-emerald-light)' }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'var(--color-emerald)' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19a6 6 0 00-12 0m12 0a6 6 0 00-12 0m12 0h6m-6-10a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </span>
                    <span>Sign In</span>
                  </Link>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:shadow-glow transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    }}
                    title="Start Free"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
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
                    </span>
                    <span>Start Free</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-green-50"
                    title={auth.username ? `Hi, ${auth.username}` : 'Dashboard'}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--bg-green-light)' }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 3v18m8-10v10M3 13v8m4-12v12m8-6v6"
                        />
                      </svg>
                    </span>

                    <span className="flex items-center gap-2">
                      <span>Dashboard</span>
                      {auth.username ? (
                        <span className="text-xs font-semibold text-gray-500">
                          ({auth.username})
                        </span>
                      ) : null}
                    </span>
                  </Link>

                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:shadow-glow transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                    }}
                    title="Logout"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                        />
                      </svg>
                    </span>
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

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
                  {!auth.isAuthed ? (
                    <>
                      <Link
                        to="/signin"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-green-50 rounded-lg transition-all text-center"
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-2 text-sm font-semibold text-white rounded-lg hover:shadow-glow transition-all duration-300 text-center"
                        style={{
                          background:
                            'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                        }}
                      >
                        Start Free
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-green-50 rounded-lg transition-all text-center"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full py-2 text-sm font-semibold text-white rounded-lg hover:shadow-glow transition-all duration-300"
                        style={{
                          background:
                            'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
                        }}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
