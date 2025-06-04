'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  const hideNav = pathname === '/' || pathname === '/career-guide';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          {mounted && !hideNav && <Navigation />}
          <main className="min-h-screen bg-gray-50 dark:bg-gray-800">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
