// components/Modal.js
import Link from 'next/link';
import { useState } from 'react';

const SessionExpiredModal = ({ show, onClose }) => {
  return (
    <div
      className={`modal fade  ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content shadow-lg ">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              Authentication Required
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Your session has expired. Please log in again.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <Link href="/authentication/card/sign-in" className="btn btn-primary text-decoration-none">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
