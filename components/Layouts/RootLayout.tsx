import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Faunus - Board Management System",
//   description: "TLM's Board Management System",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-zinc-900 lg:bg-zinc-950">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-zinc-900 lg:bg-zinc-950`}
      >
        <ToastContainer />

        {children}
      </body>
    </html>
  );
}
