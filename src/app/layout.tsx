import type { Metadata } from "next";
import "@/styles/globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Todolist App",
  description: "Organize your tasks using Todolist App.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </html>
    </ConvexClerkProvider>
  );
}
