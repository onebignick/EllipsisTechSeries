import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { AlertPollingProvider } from "@/providers/AlertPollingProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Officer Patrol C2",
  description: "Command and Control Software - Ellipsis TechSeries Hackathon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AlertPollingProvider>
        <body className={`${inter.className} flex min-h-[100vh] bg-[#1c2439]`}>
          <div className="w-60">
            <Sidebar />
          </div>
          <div className="flex-grow">
            {children}
          </div>
        </body>
      </AlertPollingProvider>
    </html>
  );
}
