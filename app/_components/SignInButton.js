import { signInAction } from "@/app/_lib/actions";

function SignInButton() {
  return (
    // To keep component a server component need to wrap JSX button element in a form and use server action to add interactivity to component to avoid converting to a client component
    // under action prop on form pass in server action needed for interaction - will execute signIn function from auth.js file
    <form action={signInAction}>
      <button className="relative flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          className="object-cover"
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
