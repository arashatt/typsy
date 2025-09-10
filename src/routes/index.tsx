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
        <div className="min-h-screen flex flex-col bg-gray-50 font-garamond text-custom gradient-background">
          {/* Header */}

          {/* Main Content */}
          <main className="flex-1 p-6 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold mb-4">
              Your Typst documents, live 😊
            </h2>
            <p className="text-center mb-6 max-w-xl">
              Type, preview, and collaborate on Typst documents directly from
              your browser. Explore templates, export to PDF, and streamline
              your workflow.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Try it Now
            </button>
          </main>
          <CommentForm />

          {/* Footer */}
          <footer className="bg-gray-200 text-gray-700 p-4 text-center">
            © 2025 Typeset.live. All rights reserved.
          </footer>
        </div>{" "}
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
