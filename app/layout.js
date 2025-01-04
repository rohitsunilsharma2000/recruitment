"use client"; // Add this directive at the top
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';



export default function RootLayout({ children }) {

  const pathname = usePathname();

  const showNavbar = !['/authentication/card/sign-in', '/authentication/card/sign-up'].includes(pathname);

  return (
    <html lang="en">
      <body >
        {/* Render the NavBar only if showNavbar is true */}
        {showNavbar && <NavBar />} {/* Correct casing */}
        {children}
      </body>
    </html>
  );
}
