"use client"; // Add this directive at the top
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Correct JS file to ensure Bootstrap works

import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import SessionExpiredModal from '@/components/modal/login-required/SessionExpiredModal';
import { useEffect, useState } from 'react';
import { setModalTrigger as setModalTriggerInRestClient } from '@/utils/restClient';
import { getCookie } from "cookies-next"; // You can use cookies-next or any other method to check the token

// Dynamically import Bootstrap JS with SSR disabled
// const Bootstrap = dynamic(() => import('bootstrap/dist/js/bootstrap.bundle.min.js'), { ssr: false });

export default function RootLayout({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState(null); // State to manage token
  const pathname = usePathname();


  // Function to check if the session is expired based on the token
  const checkSessionExpiration = () => {
    const token = getCookie("token"); // Check for token in cookies (or localStorage)
    if (!token) {
      setModalVisible(true); // If no token, show modal
    }
    setToken(token); // Set token state (can be used to check validity)
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
    window.modalShown = false; // Reset to allow showing modal on next 401 error
  };


  // Set the modal trigger in restClient (no need to reassign)
  useEffect(() => {
    // checkSessionExpiration(); // Check session expiry on layout load
    // Pass the setModalVisible function to restClient
    setModalTriggerInRestClient(setModalVisible);
  }, []);


  const showNavbar = !['/authentication/card/sign-in', '/authentication/card/change-password'].includes(pathname);

  return (
    <html lang="en">
      <body className='bg-light'>
        {/* Render the NavBar only if showNavbar is true */}
        {showNavbar && <NavBar />}
        <SessionExpiredModal show={modalVisible} onClose={closeModal} />
        {children}
      </body>
    </html>
  );
}
