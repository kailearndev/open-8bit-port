import type { Metadata } from "next";
import Home from "./_component/home";

export const metadata: Metadata = {
  title: "Kai Dev - PORTFOLIO",
  description: "hi, I'm Kai Dev. Welcome to my retro 8-bit style portfolio!",
  openGraph: {
    title: "Kai Dev - PORTFOLIO",
    description: "hi, I'm Kai Dev. Welcome to my retro 8-bit style portfolio!",
    url: "https://port-pixel.vercel.app",
    siteName: "Kai Dev - PORTFOLIO",
    images: [
      {
        url: "https://hello.kaidev.space/bg.png",
        width: 1200,
        height: 630,
        alt: "Kai Dev - PORTFOLIO",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function HomePage() {
  return <Home />;
}
