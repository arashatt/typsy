// src/components/AnimatedGlassyNavbar.tsx
import { Link, useMatches } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.nav
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-white/20"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo with breathing effect */}
        <motion.div
          className="inline-block"
          style={{ display: "inline-block" }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-gray-900 font-semibold text-xl tracking-wide">
            <Link to="/">Typeset</Link>
          </span>
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
