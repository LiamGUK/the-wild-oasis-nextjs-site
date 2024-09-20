// route.js files are added to create route API endpoints in Next.js apps
// Create a new folder inside app directory to create a new route and inside folder add just a route.js file - Can't add a page.js file as will conflict with route (can't return both HTML and JSON at the same time)
// Can create CRUD operation functions for API endpoints by exporting functions fot HTTP verbs - Functions need to have these names set otherwise won't work
// exports a function to run GET requests on API endpoint
export async function GET() {
  // Use web API Response method to return JSON date when viewing API endpoint in browser
  return Response.json({ test: "test" });
}

// exports a function to run POST requests on API endpoint
export async function POST() {}
