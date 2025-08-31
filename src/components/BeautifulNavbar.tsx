// src/components/AnimatedGlassyNavbar.tsx
import { Link, useMatches } from "@tanstack/react-router";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

export default function AnimatedGlassyNavbar() {
  const matches = useMatches();
  const activePath = matches[matches.length - 1]?.pathname || "/";

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-white/20">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo with breathing effect */}
        <div className="inline-block" style={{ display: "inline-block" }}>
          <span className="text-gray-900 font-semibold text-xl tracking-wide">
            <Link to="/">Typeset</Link>
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {navLinks.map((link) => {
            const isActive = activePath === link.to;
            return (
              <li
                key={link.name}
                className="relative text-gray-800 font-medium cursor-pointer"
              >
                <Link to={link.to} className="px-2 py-1">
                  {link.name}
                </Link>
                {isActive && (
                  <div className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gray-900 rounded" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
