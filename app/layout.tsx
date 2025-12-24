import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TeamModalProvider } from "@/context/TeamModalContext";
import TeamModal from "@/components/TeamModal";
import { AuthProvider } from "@/lib/authContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xelan Sports Content",
  description: "The definitive social media ranking platform for global sports teams.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, "min-h-screen antialiased")}>
        <AuthProvider>
          <TeamModalProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
            <TeamModal />
            <Toaster
              position="top-right"
              richColors
              theme="dark"
              toastOptions={{
                style: {
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                },
              }}
            />
          </TeamModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
