// middleware.js file is for running middleware functions in Next.js apps
// Code that runs just after the request but before the response
// middleware always needs to return data in the response (usually in the form of JSON)

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

// export function middleware(request) {
//   return;
// }

// Will run above auth middleware function when the /account endpoint is access on client side - will check if the user is logged in
export const config = {
  matcher: ["/account"],
};
