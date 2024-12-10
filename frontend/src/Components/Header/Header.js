import React from "react";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="d-flex align-items-center me-5">
          <i className="bi bi-shop-window text-warning  fs-3 me-3 ms-5"></i>
          <a className="navbar-brand text-light" href="/">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Centered Search Form */}
        <div className="ms-5 flex-grow-1 d-flex justify-content-center">
          <form className="form-inline w-100 d-flex my-2 my-lg-0 ">
            <input
              className="form-control me-1"
              type="search"
              placeholder="Search. . ."
              aria-label="Search"
            />
            <button className="btn btn-success">
              <i className="bi bi-search "></i>
            </button>
          </form>
        </div>

        {/* Collapsible Menu Links */}
        <div
          className=" ms-5 collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="bi bi-basket text-warning fs-5"></i>
                <span className="ms-1 bg-danger px-1 rounded">3</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold ms-2" href="/">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
