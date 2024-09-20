"use client";

// Experimental React hook for providing feedback on form submissions
import { useFormStatus } from "react-dom";

// To use useFormStatus hook on a form needs to be used inside a child component contained inside a form element
// As component is created inside a client component file and used in a client component don't need to specify use client directive
function SubmitButton({ children, pendingText }) {
  // useFormStatus hook allows to check if form is currently pending in sending data - can be used to conditionally render JSX in component
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingText : children}
    </button>
  );
}

export default SubmitButton;
