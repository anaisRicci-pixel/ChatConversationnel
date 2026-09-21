import type { Metadata } from "next";
import { Inter, Onest } from "next/font/google";
import "@/styles/globals.css";
import { StoreProvider } from "@/lib/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SecuredChatGPT – Projets",
  description: "Gérez vos projets et sources dans SecuredChatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${onest.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
