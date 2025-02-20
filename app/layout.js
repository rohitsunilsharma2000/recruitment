"use client"; // Add this directive at the top
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Correct JS file to ensure Bootstrap works

import NavBar from '@/components/NavBar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setModalTrigger as setModalTriggerInRestClient } from '@/utils/restClient';
import { getCookie } from "cookies-next";
import SessionExpiredModal from '@/components/modal/login-required/SessionExpiredModal';

export default function RootLayout({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();

  // Function to check if the session is expired based on the token
  const checkSessionExpiration = () => {
    const token = getCookie("token");
    if (!token) {
      setModalVisible(true); // Show modal if no token
    }
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
    window.modalShown = false; // Reset modal shown status
  };

  // Set the modal trigger in restClient
  useEffect(() => {
    setModalTriggerInRestClient(setModalVisible);
  }, []);

  // Define paths where the modal and NavBar should not be shown
  const isAuthPage = ['/authentication/card/sign-in', '/authentication/card/change-password'].includes(pathname);

  return (
    <html lang="en">
      <body className='bg-light'>
        {/* Show NavBar only if not on authentication pages */}
        {!isAuthPage && <NavBar />}

        {/* Show SessionExpiredModal only if not on the sign-in page */}
        {!isAuthPage && <SessionExpiredModal show={modalVisible} onClose={closeModal} />}

        {children}
      </body>
    </html>
  );
}
