import type { Metadata } from "next";
import { Sidebar } from "@/src/components/layout/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "MLCC Admin",
  description: "MLCC Administration Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-white h-full overflow-hidden antialiased">
        <div className="flex h-full w-full">
          <Sidebar />
          <main className="flex-1 p-4">
            <div className="bg-[#f3f4f6] rounded-[20px] h-full overflow-auto">
              <div className="p-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
