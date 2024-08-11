import { Fira_Code, Inter } from "next/font/google";
import "./globals.scss";


const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata = {
  title: "Arun Nura",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fira_code.className}>{children}</body>
    </html>
  );
}
