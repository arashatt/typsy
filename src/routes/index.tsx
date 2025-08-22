import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useIsPresent, AnimatePresence, motion } from "framer-motion";
import CommentForm from "@/components/CommentForm";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

type GoogleUser = {
  name: string;
  email: string;
  picture: string;
};

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const isPresent = useIsPresent();
  const location = useLocation();
  const [user, setUser] = useState<GoogleUser | null>(null);
  // Uncomment and use if you want to block navigation with a confirmation dialog
  /*
  const { proceed, reset, status, next } = useBlocker({
    shouldBlockFn: () => isPresent,
    withResolver: true,
  })
  */
  useEffect(() => {
    console.log("isPresent changed:", isPresent);
    // For example, you can react to isPresent change here
    // if (isPresent && status === 'blocked') proceed()
  }, [isPresent]);

  return (
    <>
      <div>
        {!user ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded: any = jwtDecode(credentialResponse.credential);
                setUser({
                  name: decoded.name,
                  email: decoded.email,
                  picture: decoded.picture,
                });
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        ) : (
          <div>
            <h2>Welcome {user.name}</h2>
            <p>Email: {user.email}</p>
            <img src={user.picture} alt="profile" />
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <h1 className="text-red-600">About Page</h1>
          {isPresent ? "Present" : "Leaving..."}
          <p className="mt-4 text-gray-700">
            This is the about page content. You can add any static or dynamic
            information here.
          </p>
          <CommentForm />
        </motion.div>
      </AnimatePresence>

      {/* Uncomment this block if using navigation blocking */}
      {/* 
      {status === 'blocked' && (
        <div>
          <p>You are navigating to {next.pathname}</p>
          <p>Are you sure you want to leave?</p>
          <button onClick={proceed}>Yes</button>
          <button onClick={reset}>No</button>
        </div>
      )}
      */}
    </>
  );
}
