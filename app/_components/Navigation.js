import Link from "next/link";
import { auth } from "@/app/_lib/auth";

// Store shared components in a components folder inside App folder - will become a valid route in app but as long as there is no page.js file inside will return a 404 route
// Can add _ to folder name to make private in app - any component called page.js would still render a 404 route when trying to access on client
export default async function Navigation() {
  // Import auth function from auth.js file and await function call to grab info on current logged in user
  const session = await auth();
  // Using auth function in Navigation component will auto make every route in Next.js dynamic as Navigation component added to root layout (renders in every page.js file) - would result in cache being re-fetched on each component mount

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link href="/account">
              <span>Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
