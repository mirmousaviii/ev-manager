import type { Metadata } from "next";
import "./styles/globals.css";
import React from "react";


export const metadata: Metadata = {
  title: "EV Charging",
  description: "A simple EV charging simulation",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
          <body className="bg-background text-foreground font-sans">
              <header className="p-4 bg-primary text-secondary shadow-md">
                <h1 className="text-2xl font-bold">EV Manager</h1>
              </header>
              <main className="p-4">{children}</main>
          </body>
      </html>
  );
}
