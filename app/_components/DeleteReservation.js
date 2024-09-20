"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  // useTransition hook used to manage state transitions in React - allows to mark updates as non-urgent or low-priority to keep UI responsive i.e. updating a large list of items React can handle it in background without blocking urgent updates.
  // Destructure isPending flag = will be true while state is pending
  // Destructure startTransition function - wraps around heavy state update in component
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?")) {
      // Wrap deleteReservation function in the startTransition function to tell React that it can be executed with low priority
      startTransition(() => onDelete(bookingId));
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {/* Check if transition is currently in operation in the background - if transition is currently handling UI operation have Next.js render the loading spinner */}
      {!isPending ? (
        <>
          {" "}
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="max-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
