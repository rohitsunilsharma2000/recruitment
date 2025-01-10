"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const SessionExpiryHandler = ({ delay = 5000 }) => {
  const router = useRouter();

  useEffect(() => {
    // Set a timeout to clear localStorage and cookies
    const timeout = setTimeout(() => {
      localStorage.clear();
      setCookie("token", "", { maxAge: -1, path: "/" }); // Clear the cookie
      console.log("localStorage and cookie cleared after session expiration");

      alert("Session Expired! Please sign in again.");
      router.push("/authentication/card/sign-in"); // Redirect to sign-in page
    }, delay);

    // Clean up timeout if the component is unmounted before the delay
    return () => clearTimeout(timeout);
  }, [delay, router]);

  return null; // This component doesn't render anything visually
};

export default SessionExpiryHandler;
