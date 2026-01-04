"use client";

import { Suspense } from "react";
import BookingClient from "./BookingClient";

export const dynamic = "force-dynamic";

export default function BookingsPage() {
  return (
    <Suspense fallback={<p style={{ padding: 20 }}>Loading booking form…</p>}>
      <BookingClient />
    </Suspense>
  );
}