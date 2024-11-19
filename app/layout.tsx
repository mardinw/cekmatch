import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SelectionProvider } from "@/lib/context/selection";


export const metadata: Metadata = {
  title: "Match Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
            <SelectionProvider>
        {children}
        <Toaster />
        </SelectionProvider>
      </body>
    </html>
  );
}
