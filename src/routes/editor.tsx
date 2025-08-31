import { createFileRoute, useLocation } from "@tanstack/react-router";
import Codemirror from "@/components/codemirror";
export const Route = createFileRoute("/editor")({
  component: Editor,
});
function Editor() {
  const location = useLocation();

  return (
    <>
      <div key={location.pathname}>
        <h1 className="text-green-600">About Page</h1>
        <p className="mt-4 text-gray-700">
          This is the about page content. You can add any static or dynamic
          information here.
        </p>
        <Codemirror />
      </div>
    </>
  );
}
