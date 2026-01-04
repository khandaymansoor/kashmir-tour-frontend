"use client";

import { useEffect, useState,CSSProperties } from "react";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
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
    async function fetchTour() {
      try {
        const res = await fetch(
          "https://kashmir-tour-backend.onrender.com/tours",
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tours");
        }

        const tours: Tour[] = await res.json();

        const foundTour = tours.find(
          (t) => String(t.id) === String(params.id)
        );

        if (!foundTour) {
          setError("Tour not found");
        } else {
          setTour(foundTour);
        }
      } catch (err) {
        setError("Error loading tour details");
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [params.id]);

  // ===============================
  // UI STATES
  // ===============================
  if (loading) {
    return <p style={{ padding: 20 }}>Loading tour details...</p>;
  }

  if (error) {
    return <p style={{ padding: 20, color: "red" }}>{error}</p>;
  }

  if (!tour) {
    return <p style={{ padding: 20 }}>Tour not available</p>;
  }

  // ===============================
  // MAIN UI
  // ===============================
  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>{tour.title}</h1>

      {tour.image && (
        <img
          src={tour.image}
          alt={tour.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        />
      )}

      <p>{tour.description}</p>

      <h3 style={{ marginTop: "15px" }}>₹ {tour.price}</h3>

      <br />

      <Link href={`/bookings?tour=${encodeURIComponent(tour.title)}`}>
        <button
          style={{
            padding: "12px 22px",
            backgroundColor: "#0f766e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
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