import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/prodivers";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gree Software Academy",
  description:
    "Master web development with structured courses and flexible payment options",
  applicationName: "Gree Software Academy",
  authors: [
    {
      name: "Masood Acheampong",
      url: "https://github.com/Masood-zone",
    },
  ],
  keywords: [
    "Gree Software Academy",
    "Gree Software",
    "Software Development",
    "Programming",
    "Coding",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Cybersecurity",
    "UI/UX Design",
    "Project Management",
    "Agile Methodologies",
    "Tech Industry",
    "Career in Tech",
  ],
  openGraph: {
    title: "Gree Software Academy",
    description: "",
    url: "https://gree-software-company-bio.vercel.app",
    siteName: "Gree Software Academy",
    images: [
      {
        url: "https://gree-software-company-bio.vercel.app/_next/image?url=%2Fgree-logo-black.jpg&w=1920&q=75",
        width: 1200,
        height: 630,
        alt: "Gree Software Academy",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
