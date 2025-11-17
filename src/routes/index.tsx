import { createFileRoute, useLocation } from "@tanstack/react-router";

// NOTE: You will need to create and import these components:
// import Header from "@/components/Header";
// import FeatureList from "@/components/FeatureList";
// import Footer from "@/components/Footer";

// Placeholder for CommentForm, if you still want it on the landing page
import CommentForm from "@/components/CommentForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const location = useLocation();
  // Navigation blocking logic is kept commented out for clarity
  /* ... useBlocker hook ... */

  // --- Start of New Landing Page Structure ---
  return (
    // The key ensures the component re-renders on route change, useful for transitions
    <div className="min-h-screen bg-gray-50 font-sans" key={location.pathname}>
      {/* 1. Placeholder for the Header Component (if not global/root) */}
      {/* <Header /> */}

      <main>
        {/* 2. Hero Section */}
        <section className="pt-24 pb-24 bg-white shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Typesetting Reimagined. Write Better with Typst.{" "}
              <span className="text-green-600">Live.</span>
            </h1>

            <p className="mt-3 text-xl text-gray-600 max-w-3xl mx-auto">
              The powerful, modern markup language, accessible online. Instant
              compilation, real-time preview, zero setup.
            </p>

            <div className="mt-10 flex justify-center">
              {/* Change: Replaced button with <a> and added href */}
              <a
                href="/editor"
                className="px-8 py-4 text-xl font-bold bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Start Typesetting Now
              </a>
            </div>

            {/* Change: Removed Visual Placeholder: Split Editor Mockup block */}
          </div>
        </section>

        {/* 3. Feature List Section */}
        <section className="py-20 bg-gray-50" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Change: Updated grid to md:grid-cols-2 after removing one feature */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Change: Feature 1 (Instant Preview) was removed */}

              {/* Feature 2 (Now the first feature) */}
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Zero Setup
                </h3>
                <p className="text-gray-600">
                  Start writing in seconds. Everything runs in your browser—no
                  downloads needed.
                </p>
              </div>

              {/* Feature 3 (Now the second feature) */}
              <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Modern Markup
                </h3>
                <p className="text-gray-600">
                  Leverage the power of Typst for superior math, cleaner syntax,
                  and reliable output.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Optional Comment Form (kept for compatibility) */}
        <section className="py-12 max-w-4xl mx-auto">
          <CommentForm />
        </section>
      </main>

      {/* 5. Placeholder for the Footer Component */}
      {/* <Footer /> */}

      {/* Uncomment this block if using navigation blocking */}
      {/* ... navigation blocking JSX ... */}
    </div>
  );
}
