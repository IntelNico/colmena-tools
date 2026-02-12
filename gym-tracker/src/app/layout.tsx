import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gym Tracker",
  description: "Seguimiento de entrenos de gimnasio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="mx-auto max-w-lg px-4 py-6 sm:py-10">
          {children}
        </div>
      </body>
    </html>
  );
}
