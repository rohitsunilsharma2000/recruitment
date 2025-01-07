"use client"; // Add this directive at the top
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Correct JS file to ensure Bootstrap works

import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';


// Dynamically import Bootstrap JS with SSR disabled
// const Bootstrap = dynamic(() => import('bootstrap/dist/js/bootstrap.bundle.min.js'), { ssr: false });

export default function RootLayout({ children }) {

  // Bootstrap(); // Ensure dynamic import is invoked

  const pathname = usePathname();

  const showNavbar = !['/authentication/card/sign-in', '/authentication/card/change-password'].includes(pathname);

  return (
    <html lang="en">
      <body className='bg-light'>
        {/* Render the NavBar only if showNavbar is true */}
        {showNavbar && <NavBar />} {/* Correct casing */}
        {children}
      </body>
      {/* <script src='https://getbootstrap.com/docs/5.0/examples/sidebars/sidebars.js'></script> */}
    </html>
  );
}