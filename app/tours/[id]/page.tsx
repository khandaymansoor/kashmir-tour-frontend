"use client";

import { useEffect, useState,CSSProperties } from "react";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export default function TourDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTour() {
      try {
        const res = await fetch(
          "https://kashmir-tour-backend.onrender.com/tours"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tours");
        }

        const data: Tour[] = await res.json();

        // ✅ SAFE ID MATCH
        const found = data.find(
          (t) => String(t.id) === String(params.id)
        );

        if (!found) {
          setError("Tour not found");
        } else {
          setTour(found);
        }
      } catch (err) {
        setError("Error loading tour");
      } finally {
        setLoading(false);
      }
    }

    loadTour();
  }, [params.id]);

  // ===============================
  // UI STATES
  // ===============================
  if (loading) {
    return <p style={{ padding: 20 }}>Loading tour details…</p>;
  }

  if (error) {
    return <p style={{ padding: 20 }}>{error}</p>;
  }

  if (!tour) {
    return <p style={{ padding: 20 }}>Tour not available</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
      <h3>Price: ₹ {tour.price}</h3>

      <br />

      <Link
        href={`/bookings?tour=${encodeURIComponent(tour.title)}`}
      >
        <button
          style={{
            padding: "12px 20px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Book This Tour
        </button>
      </Link>
    </div>
  );
}

/* ---------- STYLES (TYPED) ---------- */
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(10, 30, 50, 0.65)",
    padding: "40px",
    color: "white",
  },
  heading: {
    fontSize: "36px",
    marginBottom: "30px",
  },
  grid: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    color: "#1f2933",
    padding: "20px",
    borderRadius: "14px",
    width: "260px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    marginTop: "12px",
    padding: "10px 16px",
    backgroundColor: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};