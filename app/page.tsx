"use client";

import { useEffect, useState, CSSProperties } from "react";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  price: number;
};

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/tours")
      .then((res) => res.json())
      .then((data) => setTours(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>🌿 Kashmir Tour Packages</h1>

        {tours.length === 0 && <p>No tours found</p>}

        <div style={styles.grid}>
          {tours.map((tour) => (
            <div key={tour.id} style={styles.card}>
              <h3>{tour.title}</h3>
              <p style={styles.price}>₹ {tour.price}</p>

              <Link href={`/tours/${tour.id}`} style={styles.link}>
                View Details →
              </Link>
            </div>
          ))}
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
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')", // 🌄 nature background
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "50px",
    color: "white",
  },
  heading: {
    fontSize: "40px",
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
    boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  link: {
    color: "#0f766e",
    fontWeight: "bold",
    textDecoration: "none",
  },
};