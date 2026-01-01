"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { CSSProperties } from "react";

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tourId");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tourId,
        name,
        phone,
        travelDate,
      }),
    });

    if (res.ok) {
      const whatsappText = encodeURIComponent(
        `New Tour Booking\n\nName: ${name}\nPhone: ${phone}\nTour ID: ${tourId}\nTravel Date: ${travelDate}`
      );

      window.location.href = `https://wa.me/919622681962?text=${whatsappText}`;
    } else {
      setMessage("❌ Booking failed. Try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.heading}>❄️ Book Your Kashmir Tour</h1>

          <form onSubmit={handleSubmit}>
            <input
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="WhatsApp Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              required
            />

            <button style={styles.button}>Confirm Booking</button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "16px",
    width: "360px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};