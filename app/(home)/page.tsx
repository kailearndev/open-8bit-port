import type { Metadata } from "next";
import Home from "./_component/home";

// Cấu hình Base URL cho toàn bộ metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://hello.kaidev.space"), // <--- THÊM DÒNG NÀY
  title: "Kai PORTFOLIO",
  description: "hi, I'm Kai Dev. Welcome to my retro 8-bit style portfolio!",
  openGraph: {
    title: "Kai PORTFOLIO",
    description: "hi, I'm Kai Dev. Welcome to my retro 8-bit style portfolio!",
    url: "https://hello.kaidev.space",
    siteName: "Kai PORTFOLIO",
    images: [
      {
        url: "/bg.png", // Giờ chỉ cần viết ngắn gọn thế này, Next.js tự nối với metadataBase
        width: 1200,
        height: 630,
        alt: "Kai PORTFOLIO",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function HomePage() {
  return <Home />;
}
