// actions.js file used to create server actions for server components to allow certain interactivity to them i.e. submitting data on a form element
// best practice to create server actions in a separate file and import to relevant server component
// Need to add "use server"; directive for server actions - needed to define server actions to act as a bridge between components
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

// All server action functions need to be async functions
export async function signInAction() {
  // Use signIn function exported in auth.js file and pass in provider of Authorisation service - this case google (can check under route api/auth/providers)
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  // For signOut function just need to pass in object of options with redirectTo key to redirect to root page (homepage) after user has signed out
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // function will auto get access to form input data when form is submitted (function added to form action attribute) and can be read here
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // As browser cache is auto set to only cache after 30 seconds on dynamic pages to manually have Next.js purge the cache after this update completes to ensure changes are updated in real time
  // use revalidatePath method and pass in endpoint wanting to purge cache on to disable auto browser cache
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // For testing
  // await new Promise((res) => setTimeout(res, 3000));

  // Guard Clause to ensure that you can only delete a reservation if bookingId passed to function matches the ID of the current logged in user - curl terminal hack passing in another user id assigned to another booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  // Purge the cache after server action completes to re-fetch the data on the server straight away so component will update in real time
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingid"));
  console.log(bookingId);

  // Guard Clause to ensure that you can only update a reservation if bookingId passed to function matches the ID of the current logged in user - curl terminal hack passing in another user id assigned to another booking
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    // Use get method on formData object to bind property values to function its called on
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), // slice observation string to only store a maximum of 1000 characters to each row of DB
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) throw new Error("Guest could not be updated");

  // Need to purge cache before applying a redirect to Next.js app
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // redirects back to reservations page after update process has finished
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  // formData needs to be second parameter in function as function also receives binded data object
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
