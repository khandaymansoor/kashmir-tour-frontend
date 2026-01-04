"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BookingClient() {
  const searchParams = useSearchParams();
  const tour = searchParams.get("tour") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div style={{ padding: 30 }}>
      <h1>Book Tour</h1>

      <p><b>Selected Tour:</b> {tour}</p>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <button>Submit</button>
    </div>
  );
}