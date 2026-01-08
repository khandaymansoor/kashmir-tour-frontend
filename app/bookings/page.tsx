import { Suspense } from "react";
import BookingClient from "./BookingClient";

export const dynamic = "force-dynamic"; // Prevents static export errors

export default function BookingsPage() {
  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <BookingClient />
    </Suspense>
  );
}