import React from 'react';

const StatusMessage = ({ status, errorMessage }) => {
  return (
    <div>
      {status}+1
      {/* Loading Spinner */}
      {status === 'loading' && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
            zIndex: 9999, // Ensure it's above all other content
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Success Message */}
      {status === 'success' && (
        <div className="alert alert-success" role="alert">
          Job opening created successfully!
        </div>
      )}

      {/* Error Message */}
      {status === 'error' && (
        <div className="alert alert-danger mt-3">
          <strong>Error!</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default StatusMessage;
