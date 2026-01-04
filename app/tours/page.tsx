"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
};

export default function TourDetailsPage() {
  const params = useParams(); // ✅ CORRECT WAY
  const id = params?.id;

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchTour() {
      try {
        console.log("URL id:", id);

        const res = await fetch(
          "https://kashmir-tour-backend.onrender.com/tours",
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tours");
        }

        const tours: Tour[] = await res.json();
        console.log("Tours:", tours);

        const found = tours.find(
          (t) => t.id === Number(id)
        );

        if (!found) {
          setError("Tour not found");
        } else {
          setTour(found);
        }
      } catch (err) {
        console.error(err);
        setError("Error loading tour");
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [id]);

  // ================= UI =================

  if (loading) {
    return <p style={{ padding: 30 }}>Loading tour details...</p>;
  }

  if (error) {
    return <p style={{ padding: 30, color: "red" }}>{error}</p>;
  }

  if (!tour) {
    return <p style={{ padding: 30 }}>No tour data</p>;
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
      <h3>Price: ₹ {tour.price}</h3>

      <br />

      <Link href={`/bookings?tour=${encodeURIComponent(tour.title)}`}>
        <button
          style={{
            padding: "12px 20px",
            backgroundColor: "#0f766e",
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