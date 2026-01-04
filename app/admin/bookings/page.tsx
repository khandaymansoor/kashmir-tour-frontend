"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  email: string;
  tour_name: string;
  persons: number;
  message: string;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetch(
          "https://kashmir-tour-backend.onrender.com/admin/bookings"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError("Error loading bookings");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading bookings…</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Admin – Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Tour</th>
              <th>Persons</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.email}</td>
                <td>{b.tour_name}</td>
                <td>{b.persons}</td>
                <td>{b.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}