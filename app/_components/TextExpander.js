// As component is being used on server component instance need to mark this component to be rendered on the client as includes state - will ensure Next.js app renders this component on the client after parent component has been mounted on server
"use client";

import { useState } from "react";
// import Logo from "./Logo";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // If state variable is changed to expanded after button click will render the entire text content passed to component as a child otherwise will only render the first 40 characters
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
      {/* As component is being imported into a client component will change to become a client component instance */}
      {/* <Logo /> */}
    </span>
  );
}

export default TextExpander;
