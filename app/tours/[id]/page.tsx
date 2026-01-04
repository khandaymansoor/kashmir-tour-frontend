"use client";

import { useEffect, useState ,CSSProperties} from "react";
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

