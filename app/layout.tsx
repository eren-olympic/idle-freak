import type { Metadata } from "next";
import { Montserrat, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "idle-freak | (G)I-DLE 小卡交換平台",
  description: "專為 NEVERLAND 打造的 (G)I-DLE 小卡交換平台。安全交換，收集你最愛的 Miyeon、Minnie、Soyeon、Yuqi、Shuhua 小卡！",
  keywords: "G-IDLE, GIDLE, 小卡, 交換, NEVERLAND, 收集, Miyeon, Minnie, Soyeon, Yuqi, Shuhua",
  authors: [{ name: "NEVERLAND Community" }],
  creator: "idle-freak team",
  publisher: "idle-freak",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://idle-freak.com",
    title: "idle-freak | (G)I-DLE 小卡交換平台",
    description: "專為 NEVERLAND 打造的小卡交換社群",
    siteName: "idle-freak",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body
        className={`${montserrat.variable} ${notoSansKR.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="mt-16 py-8 border-t border-border/20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="/terms" className="hover:text-accent transition-colors">使用條款</a>
                <a href="/privacy" className="hover:text-accent transition-colors">隱私政策</a>
                <a href="/contact" className="hover:text-accent transition-colors">聯絡我們</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="https://twitter.com/g_i_dle" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-accent transition-colors">Twitter</a>
                <a href="https://www.instagram.com/gidle_official/" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-accent transition-colors">Instagram</a>
                <a href="https://www.youtube.com/channel/UCritGVo7pLJLUS8wEu32vow" target="_blank" rel="noopener noreferrer" 
                   className="text-muted-foreground hover:text-accent transition-colors">YouTube</a>
              </div>
              <p className="text-sm text-muted-foreground">
                Made with <span className="text-red-500">❤️</span> by <span className="neon-text-pink">NEVERLAND</span>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
