"use client";

import { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/admin/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>📋 Booking Requests</h1>

      {bookings.map((b) => (
        <div key={b.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "15px" }}>
          <p><b>Name:</b> {b.name}</p>
          <p><b>Phone:</b> {b.phone}</p>
          <p><b>Email:</b> {b.email}</p>
          <p><b>Tour ID:</b> {b.tour_id}</p>
          <p><b>Date:</b> {b.travel_date}</p>
        </div>
      ))}
    </div>
  );
}