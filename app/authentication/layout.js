export default function AuthLayout({ children }) {
  return (
    <div className="conatiner-fluid container-background custom-font ">
      <div className="contaier d-flex justify-content-center align-items-center vh-100">

        <div className="row p-4 g-0  shadow rounded ">


          {/* Left Side */}
          <div className="col-md-4 p-4 bg-body-tertiary rounded-3">
            <h5 className="mb-4 mt-3 fw-700 text-nowrap fs-6" >Recruiter </h5>
            <p className="mb-4">
              Give yourself some hassle-free development process with the
              uniqueness of Phoenix!
            </p>
            <ul className="list-group">
              <li className="list-group-item border border-0 bg-body-tertiary lh-sm">
                <span className="me-2">
                  <i className="bi bi-check-circle text-success "></i>
                </span>
                Fast
              </li>
              <li className="list-group-item border border-0 bg-body-tertiary lh-sm">
                <span className="me-2">
                  <i className="bi bi-check-circle text-success "></i>
                </span>
                Simple
              </li>
              <li className="list-group-item border border-0 bg-body-tertiary lh-sm">
                <span className="me-2">
                  <i className="bi bi-check-circle text-success "></i>
                </span>
                Responsive
              </li>
            </ul>

          </div>



          <div className="col-md-5 p-4 d-flex flex-column justify-content-center mx-auto">
            {children} {/* Dynamic content for signup or sign */}
          </div>

        </div>
      </div>
    </div>
  );
}
