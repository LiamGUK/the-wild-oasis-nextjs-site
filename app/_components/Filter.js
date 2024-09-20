"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Filter() {
  // Use useSearchParams hook to grab search params from URL into client component here
  const searchParams = useSearchParams();

  // useRouter hook allows to do programmatic navigation between routes in Next.js
  const router = useRouter();

  // Use usePathname hook to grab the current path of rendered component - will grab /cabins if used in cabins page
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    // URLSearchParams = Web API to update search parameters in URL in Browser
    // Pass in current search params value into API call - can then replace current value with a new value defined by filter prop
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    // Use replace method to create a new URL value for rendered component - add optional scroll object and set to false to prevent page from scrolling to top
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1 &mdash; 3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4 &mdash; 7 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8 &mdash; 12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
