// src/routes/__root.tsx
import {
  createRootRoute,
  getRouterContext,
  Link,
  Outlet,
  useMatch,
  useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { cloneDeep } from "lodash";
import { useContext, useRef } from "react";

// AnimatedOutlet component
const AnimatedOutlet = () => {
  const RouterContext = getRouterContext();
  const routerContext = useContext(RouterContext);
  const renderedContext = useRef(routerContext);
  const isPresent = useIsPresent();

  if (isPresent) {
    renderedContext.current = cloneDeep(routerContext);
  }

  return (
    <RouterContext.Provider value={renderedContext.current}>
      <Outlet />
    </RouterContext.Provider>
  );
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
    <motion.nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 
                 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-white/20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo with smooth breathing */}
        <motion.div
          className="inline-block"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            to="/"
            className="text-gray-900 font-semibold text-xl tracking-wide cursor-pointer"
          >
            Typeset
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {navLinks.map((link) => {
            const isActive = activePath === link.to;
            return (
              <motion.li
                key={link.name}
                className="relative text-gray-800 font-medium cursor-pointer"
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  textShadow: "0px 0px 8px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to={link.to} className="px-2 py-1">
                  {link.name}
                </Link>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gray-900 rounded"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      exit={{ width: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
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
        <AnimatePresence mode="popLayout">
          <div className="pt-20">
            <AnimatedOutlet key={nextMatch?.id ?? "root"} />
          </div>
        </AnimatePresence>

        <TanStackRouterDevtools />
      </>
    );
  },
});
