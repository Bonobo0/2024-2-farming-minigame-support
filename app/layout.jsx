import { Suspense } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { LoadingProvider } from "@/components/LoadingProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Farming Game Tools",
    default: "Farming Game Tools",
  },
  description: "Tools for farming game development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme="light">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <LoadingProvider>
          <Header />
          <div className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          </div>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
