import type { Metadata, Viewport } from "next";
import { Architects_Daughter, JetBrains_Mono, Inter } from "next/font/google";
import Script from "next/script";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "navin // Full-Stack Engineer Notebook & Portfolio",
  description: "Official engineering log and full-stack portfolio of navin. Full-stack TypeScript apps, Next.js App Router, React, Tailwind CSS, high-concurrency Node.js APIs, PostgreSQL, Redis, and cloud systems.",
  keywords: [
    "navin",
    "navin full-stack engineer",
    "navin backend engineer",
    "navin kambham",
    "Full-Stack Engineer Portfolio",
    "Next.js App Router",
    "React 19",
    "Tailwind CSS",
    "TypeScript Full-Stack",
    "T3 Stack",
    "Systems Architect",
    "Node.js API Development",
    "Fastify Sub-Millisecond Routing",
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "navin // Full-Stack Engineer Notebook & Portfolio",
    description: "Full-stack web applications, React, Next.js, TypeScript, Node.js APIs, PostgreSQL database design, Redis caching, and defensive security.",
    url: "https://github.com/navinO0",
    siteName: "navin full-stack portfolio",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "navin full-stack engineer avatar icon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "navin // Full-Stack Engineer Portfolio",
    description: "Full-stack developer portfolio. React, Next.js, Tailwind, Node.js, database design, load testing, security, and production engineering.",
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
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MMKP928D');`,
        }}
      />
      <body className="min-h-full flex flex-col font-sans bg-[#ffffff] text-[#0f172a] selection:bg-[#38bdf8] selection:text-[#0f172a] antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMKP928D"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
