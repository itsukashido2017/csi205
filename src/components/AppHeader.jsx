import React from "react";
import { Container } from "react-bootstrap";

const leftLetters = ["C", "S", "I", "2", "0", "5"];
const rightLetters = ["F", "R", "O", "N", "T", "E", "N", "D"];

const AppHeader = () => {
  return (
    <header className="app-header shadow-sm mb-4">
      <Container className="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {leftLetters.map((letter) => (
            <span className="header-pill header-pill--violet" key={letter}>
              {letter}
            </span>
          ))}
          {rightLetters.map((letter, idx) => (
            <span className="header-pill header-pill--cyan" key={`${letter}-${idx}`}>
              {letter}
            </span>
          ))}
        </div>
        <div className="text-center text-lg-end text-white">
          <p className="header-title mb-1">CSI205 Frontend Playground</p>
          <small className="text-white-50">
            React • Routing • Bootstrap experiments
          </small>
        </div>
      </Container>
    </header>
  );
};

export default AppHeader;
