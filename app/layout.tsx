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
  description: "Official engineering log and backend portfolio of navin. Systems architecture, high-concurrency Node.js/TypeScript APIs, PostgreSQL databases, Redis distributed caching, microservices, and defensive security.",
  keywords: [
    "navin",
    "navin backend engineer",
    "navin kambham",
    "Backend Engineer Portfolio",
    "Systems Architect",
    "Node.js API Development",
    "Fastify Sub-Millisecond Routing",
    "TypeScript",
    "PostgreSQL ACID Transactions",
    "Redis Distributed Lock SETNX",
    "BullMQ Background Queues",
    "SQLite WAL Engine",
    "Docker Containerization",
    "AWS ECS & S3 Infrastructure",
    "RBAC Security Matrix & JWT",
    "Apache JMeter Concurrency Testing",
    "Postman API Verification",
    "Burp Suite Defensive Security",
    "Antigravity AI Agent Orchestration"
  ],
  authors: [{ name: "navin", url: "https://github.com/navinO0" }],
  creator: "navin",
  publisher: "navin",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "navin // Backend Engineer Notebook & Portfolio",
    description: "Systems architecture, high-concurrency Node.js/TypeScript APIs, PostgreSQL database design, Redis caching, and defensive security.",
    url: "https://github.com/navinO0",
    siteName: "navin backend portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "navin backend engineer avatar icon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "navin // Backend Engineer Portfolio",
    description: "Backend-focused developer portfolio. Systems, APIs, database design, load testing, security, and production engineering.",
    images: ["/favicon.png"],
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
