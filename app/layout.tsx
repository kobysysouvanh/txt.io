import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "./components/avatar/ActiveStatus";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "txt.io",
  description: "Messaging app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus/>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
