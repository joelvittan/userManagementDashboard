import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: "400"
});

export const metadata = {
  title: "User Management Dashboard",
  description: "User Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Toaster
            position="bottom-left"
            reverseOrder={true}
            toastOptions={{
              success: {
                style: {
                  backgroundColor: "var(--primary-darker)",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  backgroundColor: "var(--primary-light)",
                  color: "#fff",
                },
              },
            }}
          />
          {children}
      </body>
    </html>
  );
}

