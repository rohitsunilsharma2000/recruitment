'use client'; // Make sure to use 'use client' for client-side components

import { logout } from '../utils/restClient'; // Adjust path accordingly
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function ProfilesList() {

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/authentication/card/sign-in'); // Redirect to the login page or home
  };

  return (
    <>
      <p></p>
    </>
  );
}
