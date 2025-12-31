import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Kashmir Tour & Travels",
  description: "Best tour and travel services in Kashmir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* NAVBAR */}
        <nav style={styles.nav}>
          <h2 style={styles.logo}>Kashmir Tour & Travels</h2>

          <div style={styles.navLinks}>
            <Link href="/" style={styles.link}>Home</Link>
            <Link href="/tours" style={styles.link}>Tours</Link>

            {/* 🔥 PROFESSIONAL CONTACT BUTTON */}
            <a
              href="https://wa.me/919622681962"
              target="_blank"
              style={styles.contactButton}
            >
              📞 Contact
            </a>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main style={styles.main}>{children}</main>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>© 2025 Kashmir Tour & Travels</p>

          <a
            href="https://wa.me/919622681962"
            target="_blank"
            style={styles.whatsapp}
          >
            📞 WhatsApp: +91 9622681962
          </a>
        </footer>
      </body>
    </html>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  nav: {
    padding: "16px 40px",
    background: "linear-gradient(90deg, #020617, #0f172a)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },

  /* 🌿 CONTACT BUTTON */
  contactButton: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    borderRadius: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
    transition: "all 0.3s ease",
  },

  main: {
    minHeight: "80vh",
    padding: "20px",
  },
  footer: {
    padding: "15px",
    background: "#020617",
    color: "white",
    textAlign: "center" as const,
  },
  whatsapp: {
    color: "#25D366",
    textDecoration: "none",
    display: "block",
    marginTop: "8px",
    fontWeight: "bold",
  },
};