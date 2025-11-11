import React from "react";
import { Container } from "react-bootstrap";

const AppFooter = () => {
  return (
    <footer className="app-footer mt-auto">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="text-center text-md-start">
          <p className="mb-1 fw-semibold text-white text-uppercase small">
            Sripatum University · Information Technology · CSI
          </p>
          <small className="text-white-50">
            สร้างและเรียนรู้ด้วย React + Vite + Bootstrap
          </small>
        </div>
        <div className="text-center text-md-end">
          <a
            href="mailto:poramate.lel@spumail.net"
            className="footer-link d-inline-flex align-items-center gap-1"
          >
            <i className="bi bi-envelope"></i>
            poramate.lel@spumail.net
          </a>
          <div className="footer-social mt-2 d-flex justify-content-center justify-content-md-end gap-2">
            <a
              href="https://github.com/itsukashido2017"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default AppFooter;
