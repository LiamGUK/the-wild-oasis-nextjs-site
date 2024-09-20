// Global Error boundary file - placed in the root app directory as will auto handle all errors that could occur and be detected in app
// Error boundary will work for detecting errors relating to rendering, won't detect any errors that happen in callback functions
// Error boundary file will also not catch any errors that happen in the root layout.js file
// error.js file needs to be a client component - so need to include use client directive in file as needs to include a button to reset the error boundary (Needs to include interactive state)
"use client";

// Global error.js file will auto get access to error and reset props which can be destructured in component
// error prop will include error message to render error to page
// reset prop is a state reset function that can be executed by attached to an onClick event on JSX element
export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Try again
      </button>
    </main>
  );
}
