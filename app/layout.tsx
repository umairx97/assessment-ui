import classNames from "classnames";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Assessment Dashboard",
  description: "Lessons and formative quizzes dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyClasses = classNames(plusJakartaSans.variable, "antialiased");

  return (
    <html lang="en">
      <body className={bodyClasses}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
