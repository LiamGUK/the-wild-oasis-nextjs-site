"use client"; // Component rendered on the client side - needs to use React hook

// useOptimistic a new experimental React hook (added in 18.2)
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/app/_lib/actions";

function ReservationList({ bookings }) {
  // useOptimistic hook provides simple way to handle updates to UI immediately in response to a action.
  // Provides immediate feedback instead of waiting from response from server - if server responds with error = UI can be rolled back by previous state passed to hook
  const [optimisticState, optimisticDelete] = useOptimistic(
    bookings,
    (currState, bookingid) => {
      // Use filter to return a new array to only include bookings that don't match the current booking id passed to optimisticDelete function to remove a booking (simulates deleting a booking)
      return currState.filter((booking) => booking.id !== bookingid);
    }
  );

  async function handleDelete(bookingid) {
    // use optimisticDelete function from useOptimistic hook to update ReservationCard component below before async operation completes - will immediately remove from UI on completion and will re-render it if an error occurs
    optimisticDelete(bookingid);
    await deleteReservation(bookingid);
  }

  return (
    <ul className="space-y-6">
      {optimisticState.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
