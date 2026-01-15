"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [formStatus, setFormStatus] = useState<"IDLE" | "SENDING" | "SENT">(
    "IDLE"
  );

  // Dữ liệu Social (Các kênh liên lạc)
  const socialChannels = [
    {
      label: "GITHUB_REPO",
      value: "github.com/kailearndev",
      link: "https://github.com/kailearndev",
    },
    {
      label: "LINKEDIN_FREQ",
      value: "linkedin.com/in/kaidevhere",
      link: "https://linkedin.com/in/kaidevhere",
    },
    {
      label: "DIRECT_UPLINK",
      value: "kaidev.contact@gmail.com",
      link: "mailto:kailearndev.contact@gmail.com",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Hiệu ứng mở TV
      tl.fromTo(
        container.current,
        { scaleX: 0, scaleY: 0.005, background: "#fff", autoAlpha: 1 },
        { scaleX: 1, duration: 0.3, ease: "power2.out" }
      ).to(container.current, {
        scaleY: 1,
        background: "#050505",
        duration: 0.3,
        ease: "power2.out",
      });

      // 2. Hiện nội dung chính
      tl.from(".terminal-content", { opacity: 0, duration: 0.2 });

      // 3. Text tiêu đề chạy
      tl.to(".header-text", {
        duration: 1,
        text: "ESTABLISH COMMUNICATION... \nREADY TO TRANSMIT.",
        ease: "none",
      });

      // 4. Các dòng input trượt vào
      tl.from(".input-group", {
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 5. Social panel bên phải
      tl.from(
        ".social-panel",
        {
          x: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: container }
  );

  // Xử lý gửi form (Giả lập)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("SENDING");

    // Giả lập delay mạng 2 giây
    setTimeout(() => {
      setFormStatus("SENT");

      // Animation khi gửi thành công
      gsap.fromTo(
        ".success-message",
        { scale: 0, rotation: -10 },
        { scale: 1, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }
      );
    }, 2000);
  };

  const handleBack = () => {
    const tl = gsap.timeline({ onComplete: () => router.push("/") });
    tl.to(container.current, { scaleY: 0.005, duration: 0.2 });
    tl.to(container.current, { scaleX: 0, duration: 0.2 });
  };

  return (
    <div
      ref={container}
      className="min-h-screen w-full bg-[#050505] overflow-hidden relative invisible font-pixel text-amber-500 selection:bg-amber-500 selection:text-black"
    >
      {/* Background Grid & Scanlines (Đổi màu lưới sang cam nhạt) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,165,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 pointer-events-none z-50 bg-scanlines opacity-10" />

      {/* Nút Back */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 z-50 text-red-500 text-xs hover:bg-red-900/30 px-3 py-1 border border-red-500 transition-colors"
      >
        [ ESC ] ABORT
      </button>

      <div className="terminal-content container mx-auto h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-12 relative z-10">
        {/* --- CỘT TRÁI: FORM --- */}
        <div className="w-full md:w-1/2 max-w-lg">
          <div className="mb-8 min-h-[60px]">
            {/* Đổi border màu cam */}
            <h1 className="header-text text-xl md:text-2xl whitespace-pre-line leading-relaxed border-l-4 border-amber-500 pl-4"></h1>
          </div>

          {formStatus === "SENT" ? (
            /* SUCCESS STATE */
            <div className="success-message bg-amber-900/20 border-2 border-amber-500 p-8 text-center">
              <div className="text-4xl mb-4">📡</div>
              <h2 className="text-xl mb-2 text-amber-400">
                TRANSMISSION COMPLETE
              </h2>
              <p className="text-xs text-amber-200 mb-6">
                DATA UPLOADED TO HQ. WE WILL RESPOND SHORTLY.
              </p>
              <button
                onClick={() => setFormStatus("IDLE")}
                className="text-xs bg-amber-600 text-black px-4 py-2 hover:bg-amber-500 font-bold"
              >
                SEND ANOTHER?
              </button>
            </div>
          ) : (
            /* FORM STATE */
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="input-group">
                <label className="block text-xs mb-1 opacity-70 text-amber-300">
                  {" "}
                  {">"} CODENAME (NAME)
                </label>
                <input
                  required
                  type="text"
                  className="w-full bg-transparent border-b-2 border-amber-800 text-amber-400 py-2 focus:outline-none focus:border-amber-400 focus:bg-amber-900/10 transition-colors font-mono placeholder-amber-900"
                  placeholder="Enter ID..."
                />
              </div>

              <div className="input-group">
                <label className="block text-xs mb-1 opacity-70 text-amber-300">
                  {" "}
                  {">"} RETURN FREQUENCY (EMAIL)
                </label>
                <input
                  required
                  type="email"
                  className="w-full bg-transparent border-b-2 border-amber-800 text-amber-400 py-2 focus:outline-none focus:border-amber-400 focus:bg-amber-900/10 transition-colors font-mono placeholder-amber-900"
                  placeholder="name@domain.com"
                />
              </div>

              <div className="input-group">
                <label className="block text-xs mb-1 opacity-70 text-amber-300">
                  {" "}
                  {">"} ENCRYPTED DATA (MESSAGE)
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-amber-800 text-amber-400 py-2 focus:outline-none focus:border-amber-400 focus:bg-amber-900/10 transition-colors font-mono resize-none placeholder-amber-900"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <div className="input-group pt-4">
                <button
                  type="submit"
                  disabled={formStatus === "SENDING"}
                  className="w-full bg-amber-900/20 border-2 border-amber-600 text-amber-400 py-4 hover:bg-amber-500 hover:text-black transition-all uppercase tracking-widest relative overflow-hidden group font-bold"
                >
                  {formStatus === "SENDING" ? (
                    <span className="animate-pulse">UPLOADING...</span>
                  ) : (
                    <>
                      <span className="relative z-10">TRANSMIT DATA</span>
                      {/* Hiệu ứng hover chạy qua */}
                      <div className="absolute inset-0 bg-amber-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-0"></div>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* --- CỘT PHẢI: INFO PANEL --- */}
        <div className="social-panel w-full md:w-1/3 flex flex-col gap-6">
          <div className="border border-amber-800 bg-black/50 p-6 relative">
            {/* Góc trang trí */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-500"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-500"></div>

            <h3 className="text-sm mb-6 border-b border-amber-900 pb-2 text-amber-400">
              SECURE CHANNELS
            </h3>

            <div className="space-y-4">
              {socialChannels.map((channel, i) => (
                <a
                  key={i}
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col group cursor-pointer"
                >
                  <span className="text-[10px] text-amber-700 group-hover:text-amber-500 transition-colors">
                    [{channel.label}]
                  </span>
                  <span className="text-sm md:text-base font-mono group-hover:translate-x-2 transition-transform duration-300 text-amber-200">
                    {channel.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-amber-800 text-center font-mono">
            SYSTEM STATUS: ONLINE <br />
            ENCRYPTION: AES-256
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
        .font-pixel {
          font-family: "Press Start 2P", cursive;
        }

        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.2)
          );
          background-size: 100% 4px;
        }
      `}</style>
    </div>
  );
}
