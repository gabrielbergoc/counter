import type { Metadata } from "next";
import { inter } from "./ui/fonts";
import "./ui/globals.scss";

export const metadata: Metadata = {
  title: "Counter",
  description: "Count anything!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
