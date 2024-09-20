// middleware.js file is for running middleware functions in Next.js apps
// Code that runs just after the request but before the response
// middleware always needs to return data in the response (usually in the form of JSON)

import { NextResponse } from "next/server";

// File placed in the main root directory of project (outside of app folder)
export function middleware(request) {
  // middleware function will auto get access to request object - gives all details of request made on a route
  // console.log(request);

  // redirecting to a new URL - use NextResponse function and use redirect method to pass in a new URL value and also pass in url value wanting to redirect
  return NextResponse.redirect(new URL("/about", request.url));
}

// export a config object with a key called matcher - add an array of URL values where this middleware file needs to match with in order for above middleware function to run
export const config = {
  // With array including a value of '/account' = above middleware function will only run if the URL endpoint value is /account
  matcher: ["/account"],
};
