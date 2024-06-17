import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MealsProvider } from "@/context/MealsContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Waitr",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MealsProvider>{children}</MealsProvider>
      </body>
    </html>
  );
}
