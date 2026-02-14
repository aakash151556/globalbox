import React from 'react'

const Footer = () => {
  return (
    <>
      <div className="sections">
          <div className="container">
            <footer className="d-flex flex-wrap justify-content-center align-items-center">
              <div className="col-md-12 text-center">
                <a
                  href="/"
                  className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                  aria-label="Bootstrap"
                >
                  <svg
                    className="bi"
                    width="30"
                    height="24"
                    aria-hidden="true"
                  ></svg>
                </a>
                <span className="mb-3 mb-md-0 text-body-secondary white">
                 Global Box — Secure. Simple. Borderless Crypto Payments.
                </span>
              </div>
            </footer>
          </div>
        </div>
        </>
  )
}

export default Footer