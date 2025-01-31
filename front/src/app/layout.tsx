"use client"
import "./globals.css";
// import HeaderProfile from "../components/headerProfile";
import HeaderProfile from "../components/headerProfile";
import HomePage from "./home/page";
import Header from "../components/header";
import { AuthProvider } from "../components/contexts/AuthContext";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <html lang="pt-br">
      <body>
        <Header />
        {children} {/* Renderiza as páginas */}
      </body>
    </html>
    </AuthProvider>
  );
}