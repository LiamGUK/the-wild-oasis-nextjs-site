// Main route page of Next.js app - placed directly inside app folder and next to layout.js file
// Will render React component under the root endpoint '/' (Homepage)
import Image from "next/image";
import bgImg from "@/public/bg.png";
// Link component from Next.js allows to create non page loading hyperlinks to app
import Link from "next/link";

function Page() {
  return (
    <div className="mt-24">
      <Image
        src={bgImg}
        // use fill prop to set the image to fill entire area - combine with object-fit set to cover to maintain image aspect ratio
        fill
        // Add priority prop to image as is LCP on page
        priority
        className="object-cover object-top"
        // placeholder adds a image filter when page is loading - will blur to mask image loading in browser
        placeholder="blur"
        quality={80}
        alt="Mountains and forests with two cabins"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        {/* HTML link elements allow to move to other routes but will result in full page loading when click through link - use Next Link components instead to implement SPA effect */}
        {/* <a href="/cabins">Explore luxury cabins</a> */}
        {/* Link component from Next uses href prop to add route link to move to (rather than to prop in React router) */}
        {/* Link component will pre-fetch component before its loaded on server and then serve to page in chunks when being rendered to page */}
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}

export default Page;
