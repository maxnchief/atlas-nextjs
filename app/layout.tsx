import "@/app/global.css";
import { inter } from "@/app/fonts";
import { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Full Stack Next.js | Atlas School",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased text-secondary`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
