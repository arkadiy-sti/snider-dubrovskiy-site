import type { Metadata } from "next";
import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snider & Dubrovskiy | Elite Figure Skating Coaching, San Jose",
  description:
    "Elite figure skating coaching at Sharks Ice, San Jose. Private lessons, competitive training and individual development programs for skaters of all levels.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ice-black text-ice-white font-sans selection:bg-crystal/30 selection:text-ice-white">
        {children}
      </body>
    </html>
  );
}
