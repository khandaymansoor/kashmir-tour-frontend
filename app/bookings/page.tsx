"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const tour = searchParams.get("tour") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [persons, setPersons] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch(
        "https://kashmir-tour-backend.onrender.com/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            email,
            tour_name: tour,
            persons,
            message,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Booking successful!");
        setName("");
        setPhone("");
        setEmail("");
        setPersons(1);
        setMessage("");
      } else {
        setStatus("❌ Booking failed");
      }
    } catch (err) {
      setStatus("❌ Server error");
    }
  }

  return (
    <div style={{ padding: 30, maxWidth: 500 }}>
      <h1>Book Tour</h1>
      <p><strong>Tour:</strong> {tour}</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />

        <input
          type="number"
          min={1}
          value={persons}
          onChange={(e) => setPersons(Number(e.target.value))}
        /><br /><br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        /><br /><br />

        <button type="submit">Submit Booking</button>
      </form>

      <p>{status}</p>
    </div>
  );
}