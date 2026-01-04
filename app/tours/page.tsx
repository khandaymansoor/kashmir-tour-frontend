"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  price: number;
};

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTours() {
      try {
        const res = await fetch(
          "https://kashmir-tour-backend.onrender.com/tours"
        );

        if (!res.ok) {
          throw new Error("Failed to load tours");
        }

        const data = await res.json();
        setTours(data);
      } catch (err) {
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    }

    loadTours();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading tours…</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Kashmir Tour Packages</h1>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {tours.map((tour) => (
          <div
            key={tour.id}
            style={{
              border: "1px solid #ddd",
              padding: 20,
              width: 250,
              borderRadius: 10,
            }}
          >
            <h3>{tour.title}</h3>
            <p>₹ {tour.price}</p>

            {/* ✅ THIS BUTTON IS CORRECT */}
            <Link href={`/tours/${tour.id}`}>
              <button
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#0f766e",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}