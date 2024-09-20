// Can add local not-found.js files to load 404 page for individual routes.
// Can localise component to render content for just specific route and will only render below component if a 404 route is detected under the cabins route
import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back to cabins
      </Link>
    </main>
  );
}

export default NotFound;
