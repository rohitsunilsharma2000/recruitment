"use client";

import { usePathname } from 'next/navigation';
import NavBar from '@/components/NavBar';

export default function NavBarWrapper({ children }) {
  const pathname = usePathname();
  const showNavbar = !['/authentication/card/sign-in', '/authentication/card/sign-up'].includes(pathname);

  return (
    <>
      {showNavbar && <NavBar />}
      {children}
    </>
  );
}
