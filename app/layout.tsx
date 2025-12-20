import type { Metadata } from "next";
import { Sidebar } from "@/src/components/layout/Sidebar";
import { getSession } from "@/src/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "MLCC Admin",
  description: "MLCC Administration Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const isAuthenticated = !!session;

  return (
    <html lang="en" className="h-full">
      <body className="bg-white h-full overflow-hidden antialiased">
        {isAuthenticated ? (
          <div className="flex h-full w-full">
            <Sidebar />
            <main className="flex-1 p-2 sm:p-4 h-full overflow-auto pb-16 md:pb-0">
              <div className="bg-[#f3f4f6] rounded-[20px] min-h-full">
                <div className="p-4 sm:p-6 lg:p-8">
                  {children}
                </div>
              </div>
            </main>
          </div>
        ) : (
          <div className="h-full w-full">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
