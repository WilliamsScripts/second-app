import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Second App",
  description: "Second application with shared authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
