import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "MLCC Admin",
  description: "MLCC Administration Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="nav-container">
            <Link href="/" className="nav-logo">
              MLCC Admin
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/neighbors" className="nav-link">
                Neighbors
              </Link>
              <Link href="/members" className="nav-link">
                Members
              </Link>
              <Link href="/routes" className="nav-link">
                Routes
              </Link>
              <Link href="/businesses" className="nav-link">
                Businesses
              </Link>
            </div>
          </div>
        </nav>
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}

