"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { CSSProperties } from "react";

export default function CheckoutClient() {
  const searchParams = useSearchParams();

  // ✅ MUST MATCH WHAT YOU SEND FROM TOUR PAGE
  const tourName = searchParams.get("tour") || "Unknown Tour";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
            email: "",            // backend requires this
            tour_name: tourName,  // backend column
            persons: 1,           // backend requires this
            message: `Travel date: ${travelDate}`,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Booking failed");
      }

      // ✅ WhatsApp redirect
      const whatsappText = encodeURIComponent(
        `New Tour Booking\n\nName: ${name}\nPhone: ${phone}\nTour: ${tourName}\nTravel Date: ${travelDate}`
      );

      window.location.href = `https://wa.me/919622681962?text=${whatsappText}`;
    } catch (err) {
      setStatus("❌ Booking failed. Try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.heading}>❄️ Book Your Tour</h1>
          <p><b>Tour:</b> {tourName}</p>

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

          {status && <p style={styles.message}>{status}</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
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