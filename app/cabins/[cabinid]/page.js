// For routes that are dynamically defined e.g. using a URL param to load a specific page can create a dynamic route by create a new folder inside parent route and giving a name between []
// page.js file will load specifically for a value based on dynamic route
import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

// To dynamically set metadata values for page using data not immediately available can export a function called generateMetadata which will also get access to params prop
// Can then use params to create title value for page by returning an object
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinid);
  return { title: `Cabin ${name}` };
}

// If using params to generate specific content and know beforehand what the param values are going to be (won't change or update in future) can export a function called generateStaticParams to tell Next.js what params will be on server side.
export async function generateStaticParams() {
  const cabins = await getCabins();

  // Object key in map function needs to have same name as param route name (cabinid)
  const ids = cabins.map((cabin) => ({ cabinid: String(cabin.id) }));

  return ids;
  // After running function and grabbing all id values that are used for the route params, Next.js will build page as SSG (pre-rendered as static HTML) so won't dynamically render page each time it loads, will be served from server as pre-built HTML = better for performance
}

// For dynamic routes that include params in URLs components in page.js files listed under dynamic route will auto get access to params prop that can be destructed from component
async function Page({ params }) {
  // can now get access to param value from URL specific to page route and will be listed under name applied to dynamic route folder between []
  // console.log(params);
  const cabin = await getCabin(params.cabinid);

  // Problem with multiple fetched data endpoints in same component = request waterfall effect - Each request will have to wait until the previous async operation has completed first = can result in waiting for data to load in an extended time
  // Best solution is to keep data fetching local to a component and then stream data in whilst its fetching to component.
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinid);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        {/* DATA STREAMING TO CHILD COMPONENTS */}
        {/* To add data streaming to child component pass down main source of data needed to fetch from as a prop. Can then do Promise.all on data fetching in child component based on data passed as a prop */}
        <Suspense fallback={<Spinner />}>
          {/* Wrap child component in a Suspense component so that data fetching will be completed in component here first and while streaming to child loading spinner will render to mask loading of child components */}
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
