// loading.js file in app root folder will act as a global loading component to run in Next.js and apply to all page.js files that are loaded within the route endpoints
// Behind the scenes loading.js file activates streaming - streamed from server to client automatically
import Spinner from "@/app/_components/Spinner";

// Next.js uses renderToReadableStream to convert HTML tp string when sending to client - JS needs to be enabled in browser for it to work
function Loading() {
  return <Spinner />;
}

export default Loading;
