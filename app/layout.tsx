import type { Metadata } from "next";
import { Inter, Dela_Gothic_One } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dela-gothic-one",
});


export const metadata: Metadata = {
  title: "AquaTrek POS",
  description: "AquaTrek POS is a point-of-sale system designed to replace the VE POS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${delaGothicOne.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
