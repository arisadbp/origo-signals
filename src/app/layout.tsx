import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const ibmPlexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORIGO - Trade Decision System",
  description: "ระบบตัดสินใจการค้าระหว่างประเทศ ด้วย Market Intelligence และ Data-Driven Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`dark ${ibmPlexThai.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
