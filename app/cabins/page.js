// New routes defined in Next.js inside a new folder within the main app folder and inside needs a JS file called page.js
// Folder name holding page.js file will be the endpoint name of route - this case /cabins
import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// - OPTING OUT OF CACHE - PAGE LEVEL
// To opt out of data caching for page export a revalidate const and set to 0
// page component will not not use stored cache memory when rendering page on refreshes
// Test with build and start scripts to simulate production build
// Set to 3600 to refresh cache every hour
export const revalidate = 3600;
// export const revalidate = 15; // 15 seconds

// Can add a metadata object for each individual page and will override the metadata object being generated in the layout.js file
export const metadata = {
  title: "Cabins", // Will set the page title as Cabins
};

// Need to export a React component to render content to endpoint - function can be given any name but convention is to call it Page
// All components defined in page.js will be server side rendered by default
export default function Page({ searchParams }) {
  // Page components will get access to search params from page URL through props - can destructure and read value inside component
  // Using searchParams prop on a child component will auto make this component dynamic (will refresh cache on each component mount) - above revalidate variable will now not work or have an effect on this component
  // console.log(searchParams);
  // checks if a capacity param is attached to URL as search param otherwise set value to be 'all'
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Use React Suspense component to indicate to parent that child component needs to fetch data to load content - prevents parent component from not fully rendering until child has finished mounting (Will ensure content above is still rendered and will render a fallback component to render until child component has finished its async operation) */}
      {/* Pass key prop to Suspense so it treats child component and rendered JSX as unique for each component mount - will ensure loading spinner fallback renders when JSX remounts in child CabinList  */}
      <Suspense fallback={<Spinner />} key={filter}>
        {/* Suspense component needs to be moved outside of component awaiting completion of async operation - why needs to be set in parent and wrapped on child */}
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
