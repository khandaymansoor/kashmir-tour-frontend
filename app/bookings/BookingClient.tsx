"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingClient() {
  const searchParams = useSearchParams();
  const tour = searchParams.get("tour") || "Unknown Tour";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(
      "https://kashmir-tour-backend.onrender.com/bookings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          tour_name: tour,
          travelDate,
        }),
      }
    );

    if (res.ok) {
      const whatsappText = encodeURIComponent(
        `New Booking\n\nTour: ${tour}\nName: ${name}\nPhone: ${phone}\nDate: ${travelDate}`
      );

      window.location.href = `https://wa.me/919622681962?text=${whatsappText}`;
    } else {
      setMessage("❌ Booking failed");
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Book Tour</h1>
      <p><b>Tour:</b> {tour}</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Confirm Booking</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}