import { createFileRoute, useLocation } from "@tanstack/react-router";
import CommentForm from "@/components/CommentForm";

export const Route = createFileRoute("/")({
  component: Index,
});
function Index() {
  const location = useLocation();
  // Uncomment and use if you want to block navigation with a confirmation dialog
  /*
  const { proceed, reset, status, next } = useBlocker({
    shouldBlockFn: () => isPresent,
    withResolver: true,
  })
  */
  return (
    <>
      <div key={location.pathname}>
        <h1 className="text-red-600">About Page</h1>
        <p className="mt-4 text-gray-700">
          <div className="intro-container">
            <h1>Welcome to Typst Editor</h1>
            <p>
              A modern, fast, and intuitive environment for creating beautifully
              typeset documents. Designed with simplicity and power in mind, it
              brings real-time rendering, smart syntax highlighting, and instant
              previews to your writing workflow. Whether you're crafting
              research papers, reports, or presentations, our editor helps you
              focus on your content while Typst takes care of the design.
            </p>
          </div>
        </p>
        <CommentForm />
      </div>

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
