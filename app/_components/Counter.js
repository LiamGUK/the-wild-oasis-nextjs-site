// Define a client component using "use client" string to run component on the client side
"use client";

// Can now use React hooks as has been labelled a client component
import { useState } from "react";

function Counter({ users }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((curCount) => curCount + 1)}>
        {count}
      </button>
      <p>There are {users.length} users</p>
    </>
  );
}

export default Counter;
