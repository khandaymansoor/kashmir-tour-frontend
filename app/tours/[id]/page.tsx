"use client";

import { useEffect, useState, CSSProperties } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Tour = {
  id: number;
  title: string;
  price: number;
};

export default function TourDetailPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<Tour | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!tour) return <p style={{ padding: "40px" }}>Loading tour...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.heading}>{tour.title}</h1>

          <p style={styles.price}>Starting Price: ₹ {tour.price}</p>

          <p style={styles.text}>
            Experience the beauty of Kashmir – snow-covered mountains,
            peaceful valleys, and unforgettable memories.
            We provide pocket-friendly packages, transport, and local support.
          </p>

          <ul style={styles.list}>
            <li>Gulmarg – Snow & Gondola</li>
            <li>Sonamarg – Glaciers & Valleys</li>
            <li>Pahalgam – Rivers & Forests</li>
            <li>Drung Waterfall – Scenic Beauty</li>
          </ul>

          {/* ✅ BOOK NOW */}
          <Link href={`/checkout?tourId=${id}`}>
  <button style={styles.button}>Book Your Winter Tour</button>
</Link>
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
      "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b')", // ❄️ Kashmir winter
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.96)",
    padding: "35px",
    borderRadius: "18px",
    maxWidth: "700px",
    color: "#1f2933",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
    color: "#0f766e",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  text: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  list: {
    marginLeft: "20px",
    marginBottom: "20px",
  },
  button: {
    padding: "14px 24px",
    backgroundColor: "#0f766e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};