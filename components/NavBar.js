'use client'; // Make sure to use 'use client' for client-side components

import { logout } from '../utils/restClient'; // Adjust path accordingly
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function NavBar() {

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/authentication/card/sign-in'); // Redirect to the login page or home
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/authentication/card/sign-in">Sign In</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/interviews">Interviews</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/job-openings">Job Openings</a>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link " onClick={handleLogout}>Logout</a> */}
              <Link href="/authentication/card/sign-in" onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
