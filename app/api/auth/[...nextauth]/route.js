// [...nextauth] = catch all endpoint route - whatever is attached at end of route endpoint will be caught and read in this route.js file - api/auth/whatever
// Used for when endpoint routes have been set up in third party libraries etc and can use in custom routes defined in this project

// Import and then export trick - Imports the two CRUD operation functions from auth.js file and then exports them from this file (required for API endpoint functions in Next.js)
export { GET, POST } from "@/app/_lib/auth";
