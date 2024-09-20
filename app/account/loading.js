// To ensure data streaming works for child route pages need to add a loading.js file with the page.js file in route folder
// Behind the scenes loading.js file activates streaming - streamed from server to client automatically
import Spinner from "@/app/_components/Spinner";

// Next.js uses renderToReadableStream to convert HTML tp string when sending to client - JS needs to be enabled in browser for it to work
function Loading() {
  return <Spinner />;
}

export default Loading;
