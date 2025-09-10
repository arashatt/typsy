import { createFileRoute, useLocation } from "@tanstack/react-router";
import Codemirror from "@/components/codemirror";
export const Route = createFileRoute("/editor")({
  component: Editor,
});
function Editor() {
  const location = useLocation();

  return (
    <>
      <div
        key={location.pathname}
        className="min-h-screen flex flex-col bg-gray-50 font-garamond text-custom gradient-background"
      >
        <Codemirror />
      </div>
      <p>hi</p>
    </>
  );
}
