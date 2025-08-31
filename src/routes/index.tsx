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
          This is the about page content. You can add any static or dynamic
          information here.
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
