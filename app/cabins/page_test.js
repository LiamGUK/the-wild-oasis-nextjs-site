// New routes defined in Next.js inside a new folder within the main app folder and inside needs a JS file called page.js
// Folder name holding page.js file will be the endpoint name of route - this case /cabins

// import Counter from "../_components/Counter";

// Next.js supports import alias out of the box so can add imports using @ to point to root and chain down folders
import Counter from "@/app/_components/Counter";

// Need to export a React component to render content to endpoint - function can be given any name but convention is to call it Page
// All components defined in page.js will be server side rendered by default
export default async function Page() {
  // As all components in Next.js are server components can run data fetching directly inside component
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // Logged data in RSC will output to the terminal and NOT browser
  // console.log(data);

  return (
    <>
      <h1>Cabins Page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* Can pass fetched data as a prop to client components and be read inside component itself */}
      <Counter users={data} />
    </>
  );
}
