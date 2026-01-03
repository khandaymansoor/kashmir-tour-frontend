"use client";
import { useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tourName, setTourName] = useState("");
  const [persons, setPersons] = useState(1);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("Submitting...");

    const res = await fetch(
      "https://kashmir-tour-backend.onrender.com/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          tour_name: tourName,
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
      setTourName("");
      setPersons(1);
      setMessage("");
    } else {
      setStatus("❌ Booking failed. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Book Your Tour</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Tour Name"
          value={tourName}
          onChange={(e) => setTourName(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          placeholder="Persons"
          value={persons}
          onChange={(e) => setPersons(Number(e.target.value))}
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Confirm Booking</button>
      </form>

      <p>{status}</p>
    </div>
  );
}