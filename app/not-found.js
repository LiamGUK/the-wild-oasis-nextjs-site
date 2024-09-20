// Global 404 page file - defined in global app root directory as not-found.js
// When trying to load a route that doesn't exist in app will render below component
// Can use notFound() function in individual js files to call and use this component instead of the global error boundary component defined in error.js
import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
