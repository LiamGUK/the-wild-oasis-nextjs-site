// As parent folder includes _ at start of name (_components) Next.js would mark it as a private route and would not expose any file labeled page.js or route.js to the client - it would a return a 404 error page instead

function page() {
  return <div>SECRET</div>;
}

export default page;
