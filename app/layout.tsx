import GameMenu from "@/components/game-menu";
import { ThemeProvider } from "@/components/ui/theme-provinder";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Kai Dev - 8-bit Portfolio",
  description: "hi, I'm Kai Dev. Welcome to my retro 8-bit style portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pressStart2P.className} antialiased   `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GameMenu />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
