import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

// Best practice for data fetching in Next.js apps is keep data fetching as close to components itself that needs the data in order to render content.
async function CabinList({ filter }) {
  // - OPTING OUT OF CACHING - COMPONENT LEVEL
  // To opt out of data caching from inside a component use the noStore function (imported from next) and call it inside a component
  // noStore(); // will instruct Next.js to set parent page of component to be dynamic and not use data cache

  // Can directly await async function to fetch cabin data from supabase DB as is a server component by default - can directly mark component as async function
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
