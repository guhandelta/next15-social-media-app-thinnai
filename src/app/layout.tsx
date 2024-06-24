import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "திண்ணை",
  description: "A Social Media Platform Developed using Next 15 and React 19",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full bg-white px-4 md:px-6 lg:px-12 xl:px-28 2xl:px-58">
            <NavBar />
          </div>
          <div className="bg-slate-100 px-4 md:px-6 lg:px-12 xl:px-28 2xl:px-58">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
