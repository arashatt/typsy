// src/routes/__root.tsx
import {
  createRootRoute,
  Link,
  Outlet,
  useMatch,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// AnimatedOutlet component
const AnimatedOutlet = () => {
  return <Outlet />;
};

// Floating glassy navbar component
const navLinks = [
  { name: "Home", to: "/" },
  { name: "Editor", to: "/editor" },
];

function GlassyNavbar() {
  const matches = useMatches();
  const activePath = matches[matches.length - 1]?.pathname || "/";

  return (
    <nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
                 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-white/20"
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo with smooth breathing */}
        <div className="inline-block">
          <Link
            to="/"
            className="text-gray-900 font-semibold text-xl tracking-wide cursor-pointer"
          >
            Typeset
          </Link>
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

// Root route
export const Route = createRootRoute({
  component: () => {
    const matches = useMatches();
    const match = useMatch({ strict: false });
    const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
    const nextMatch = matches[nextMatchIndex];

    return (
      <>
        {/* Floating glassy navbar */}
        <GlassyNavbar />

        {/* Reserve space for navbar to prevent content from hiding behind it */}
        <div className="pt-20">
          <AnimatedOutlet key={nextMatch?.id ?? "root"} />
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
