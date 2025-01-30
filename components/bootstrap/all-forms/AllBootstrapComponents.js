// AllBootstrapComponents
"use client"
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const AllBootstrapComponents = () => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  return (
    <div className="container mt-5">

      {/* Alerts */}
      <h4 className="mb-4">Alerts</h4>
      <div className="alert alert-success" role="alert">
        This is a success alert!
      </div>
      <div className="alert alert-danger" role="alert">
        This is a danger alert!
      </div>
      <div className="alert alert-warning" role="alert">
        This is a warning alert!
      </div>

      {/* Badges */}
      <h4 className="mt-5 mb-4">Badges</h4>
      <span className="badge bg-primary me-2">Primary Badge</span>
      <span className="badge bg-secondary me-2">Secondary Badge</span>

      {/* Breadcrumbs */}
      <h4 className="mt-5 mb-4">Breadcrumbs</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item "><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Library</a></li>
          <li className="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
      </nav>

      {/* Buttons */}
      <h4 className="mt-5 mb-4">Buttons</h4>
      <button className="btn btn-primary mb-3 me-5">Primary Button</button>
      <button className="btn btn-secondary mb-3 me-5">Secondary Button</button>
      <div className="btn-group mb-3 " role="group" aria-label="Basic example">
        <button type="button" className="btn btn-secondary ">Left</button>
        <button type="button" className="btn btn-secondary  ">Middle</button>
        <button type="button" className="btn btn-secondary  ">Right</button>
      </div>

      {/* Button Dropdown */}
      <h4 className="mt-5 mb-4">Button Dropdown</h4>
      <div className="btn-group">
        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Dropdown Button
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Action</a></li>
          <li><a className="dropdown-item" href="#">Another action</a></li>
          <li><a className="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>

      {/* Cards */}
      <h4 className="mt-5 mb-4">Cards</h4>
      <div className="card mb-4" style={{ width: '18rem' }}>
        <img src="https://via.placeholder.com/150" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card Title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn btn-primary">Go somewhere</button>
        </div>
      </div>

      {/* Carousel */}
      <h4 className="mt-5 mb-4">Carousel</h4>
      <div id="carouselExampleCaptions" className="carousel slide mb-4 p-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://placehold.co/600x400" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://placehold.co/600x400" className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Collapse */}
      <h4 className="mt-5 mb-4">Collapse</h4>
      <button className="btn btn-info mb-4" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Toggle Collapse
      </button>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          Some hidden content that can be revealed by clicking the button.
        </div>
      </div>

      {/* Modal */}
      <h4 className="mt-5 mb-4">Modal</h4>
      <button className="btn btn-primary mb-4" onClick={() => setShowModal(true)}>Launch Modal</button>
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                This is the modal body.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <h4 className="mt-5 mb-4">Pagination</h4>
      <nav>
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
        </ul>
      </nav>

      {/* Progress Bars */}
      <h4 className="mt-5 mb-4">Progress Bars</h4>
      <div className="progress" style={{ height: '30px' }}>
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>

      {/* Spinners */}
      <h4 className="mt-5 mb-4">Spinners</h4>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      {/* Toasts */}
      <h4 className="mt-5 mb-4">Toasts</h4>
      <button className="btn btn-primary mb-4" onClick={() => setShowToast(true)}>Show Toast</button>
      {showToast && (
        <div className="toast show align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">
              This is a toast notification!
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)} data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      )}

      {/* Tooltips */}
      <h4 className="mt-5 mb-4">Tooltips</h4>
     
      <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip-top">Tooltip on top</Tooltip>}
    >
      <Button variant="secondary">Tooltip on top</Button>
    </OverlayTrigger>


      {/* Tables */}
      <h4 className="mt-5 mb-4">Tables</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>30</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Doe</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>

      {/* Accordion */}
      <h4 className="mt-5 mb-4">Accordion</h4>
      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>

      {/* Offcanvas */}
      <h4 className="mt-5 mb-4">Offcanvas</h4>
      <button className="btn btn-info mb-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        Toggle Offcanvas
      </button>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          This is an offcanvas menu or content.
        </div>
      </div>
    </div>
  );
};

export default AllBootstrapComponents;
