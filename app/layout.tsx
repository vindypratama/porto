import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio — Fullstack Developer & System Analyst",
  description:
    "Personal portfolio of a Fullstack Developer & System Analyst specializing in enterprise-scale applications, B2B e-commerce systems, and Industrial IoT (IIoT) integrations.",
  keywords: [
    "fullstack developer",
    "system analyst",
    "golang",
    "nodejs",
    "nextjs",
    "iiot",
    "microservices",
    "b2b ecommerce",
  ],
  authors: [{ name: "Vindy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Portfolio — Fullstack Developer & System Analyst",
    description:
      "Building enterprise-scale applications, B2B e-commerce systems, and Industrial IoT integrations.",
    siteName: "Developer Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0a0a0f] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
