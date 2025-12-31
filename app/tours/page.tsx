"use client";

import { useEffect, useState, CSSProperties } from "react";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  price: number;
};

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/tours")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tours");
        return res.json();
      })
      .then((data) => setTours(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>❄️ Kashmir Winter Tour Packages</h1>

        <div style={styles.grid}>
          {tours.map((tour) => (
            <div key={tour.id} style={styles.card}>
              <h3>{tour.title}</h3>
              <p style={styles.price}>₹ {tour.price}</p>

              <Link href={`/tours/${tour.id}`}>
                <button style={styles.button}>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
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