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
    <body className="antialiased">
        {children}
    </body>
    </html>
  );
}
