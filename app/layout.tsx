import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import SessionAuthProvider from "./context/SessionAuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo's Web App",
  description: "A simple toDo's web application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionAuthProvider>
        <body className={inter.className}>
          <header>
            <Navbar />
          </header>
          <main className="max-w-4xl mx-auto mt-4">{children}</main>
        </body>
      </SessionAuthProvider>
    </html>
  );
}
