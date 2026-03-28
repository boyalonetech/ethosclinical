import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Home/Header";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ethos Clinical Supervision | Professional Mental Health Support",
    template: "%s | Ethos Clinical",
  },
  description:
    "Ethos Clinical Supervision provides reflective, ethically grounded clinical supervision, faith-based psychosocial mental health support, and specialized therapeutic care for organizations and practitioners.",
  keywords: [
    "Clinical Supervision",
    "Mental Health Support",
    "Psychosocial Therapy",
    "Trauma Programs",
    "Therapeutic Specialist",
    "NDIS Services",
    "Aboriginal Community Controlled Organisations",
    "Ethos Clinical",
    "Stephen Onyekwere",
  ],
  authors: [
    {
      name: "Ethos Clinical Supervision",
      url: "https://ethosclinicalsupervision.com.au",
    },
  ],
  creator: "Ethos Clinical Supervision",
  publisher: "Ethos Clinical Supervision",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Ethos Clinical Supervision | Professional Mental Health Support",
    description:
      "Ethos Clinical Supervision provides reflective, ethically grounded clinical supervision and specialized therapeutic care for organizations and practitioners.",
    url: "https://ethosclinicalsupervision.com.au",
    siteName: "Ethos Clinical Supervision",
    images: [
      {
        url: "/what.jpg", // Default placeholder image shared on social media
        width: 1200,
        height: 630,
        alt: "Ethos Clinical Supervision Session",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethos Clinical Supervision | Professional Mental Health Support",
    description:
      "Ethos Clinical Supervision provides reflective, ethically grounded clinical supervision and specialized therapeutic care.",
    images: ["/what.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://ethosclinicalsupervision.com.au",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased text-black`}
    >
      <head>
        <link rel="icon" type="image/png" href="/icon.ico" />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
