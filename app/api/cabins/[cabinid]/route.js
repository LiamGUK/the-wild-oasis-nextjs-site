// Create nested API endpoint routes by creating nested directories and can use dynamic route name on directory [] to create a new route based on a param value

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// CRUD functions get access to the request object (details on request itself) and an object containing any parameters that may be included in endpoint URL
export async function GET(request, { params }) {
  const { cabinid } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinid),
      getBookedDatesByCabinId(cabinid),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    return Response.json({ message: "Cabin not found" });
  }
}
