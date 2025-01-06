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
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link fs-0-point-7 fw-700 active" aria-current="page" href="/dashboard">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-0-point-7 fw-700" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-0-point-7 fw-700" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-0-point-7 fw-700" href="#">About</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link fs-0-point-7 fw-700 active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-0-point-7 fw-700" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-0-point-7 fw-700" href="/setup">
                    <i className="bi bi-gear"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/authentication/card/sign-in"
                    className="nav-link fs-0-point-7 fw-700"
                    onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>




            </form>
          </div>
        </div>
      </nav>
      {/* <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fs-0-point-7 fw-700 active" aria-current="page" href="/authentication/card/sign-in">Sign In</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-0-point-7 fw-700" href="/dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-0-point-7 fw-700" href="/interviews">Interviews</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link fs-0-point-7 fw-700" href="/job-openings">Job Openings</a>
              </li>
              <li className="nav-item">
                <Link href="/authentication/card/sign-in" onClick={handleLogout} className="nav-link fs-0-point-7 fw-700">
                  Logout
                </Link>
              </li >
            </ul>
          </div>
        </div>
      </nav> */}


    </>
  );
}
