import type { Metadata } from "next";
import { Architects_Daughter, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const architectsDaughter = Architects_Daughter({
  weight: "400",
  variable: "--font-architects",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "navin // Backend Engineer Notebook & Portfolio",
  description: "Backend-focused full-stack developer portfolio. Systems, APIs, database design, load testing, security, and real production engineering.",
  keywords: ["Backend Engineer", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "SQLite", "Redis", "Security", "RBAC", "JMeter", "Postman", "Burp Suite"],
  authors: [{ name: "navin" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${jetbrainsMono.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f6f4ee] text-[#1e1d1b] selection:bg-[#ffe866] selection:text-[#1e1d1b] antialiased">
        {children}
      </body>
    </html>
  );
}
