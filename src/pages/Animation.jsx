import { useCallback, useEffect, useRef, useState } from "react";
import "./Animation.css";
import courtTexture from "../assets/w04/360_F_128230389_4ULCCemX8TcW3xC1KJno7GDX2whH7cx1.jpg";
import basketballImg from "../assets/w04/basketball.png";
import footballImg from "../assets/w04/football.png";
import volleyballImg from "../assets/w04/volleyball.png";
import humanImg from "../assets/w04/human.png";
import cartoonImg from "../assets/w04/cartoon.png";
import logoImg from "../assets/w04/logo.png";

const fieldWidth = 800;
const fieldHeight = 400;
const ballDiameter = 150;
const velocity = 5;

const objectTextures = {
  1: basketballImg,
  2: footballImg,
  3: volleyballImg,
  4: humanImg,
  5: cartoonImg,
  6: logoImg,
};

const selectorButtons = [
  { type: 0, label: "NONE" },
  { type: 1, label: "BASKETBALL" },
  { type: 2, label: "FOOTBALL" },
  { type: 3, label: "VOLLEYBALL" },
  { type: 4, label: "HUMAN" },
  { type: 5, label: "CARTOON" },
  { type: 6, label: "LOGO" },
];

function Animation() {
  const [running, setRunning] = useState(false);
  const [activeType, setActiveType] = useState(1);
  const ballRef = useRef(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    goRight: true,
    goDown: true,
    angle: 0,
  });
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  const moveBall = useCallback(() => {
    const maxX = fieldWidth - ballDiameter;
    const maxY = fieldHeight - ballDiameter;
    let { x, y, goRight, goDown, angle } = stateRef.current;

    x = goRight ? x + velocity : x - velocity;
    y = goDown ? y + velocity : y - velocity;

    if (x >= maxX) {
      x = maxX;
      goRight = false;
    } else if (x <= 0) {
      x = 0;
      goRight = true;
    }

    if (y >= maxY) {
      y = maxY;
      goDown = false;
    } else if (y <= 0) {
      y = 0;
      goDown = true;
    }

    angle = (angle + 5) % 360;

    stateRef.current = { x, y, goRight, goDown, angle };
  }, []);

  const renderBall = useCallback(() => {
    const { x, y, angle } = stateRef.current;
    const ball = ballRef.current;
    if (ball) {
      ball.style.left = `${x}px`;
      ball.style.top = `${y}px`;
      ball.style.transform = `rotate(${angle}deg)`;
    }
  }, []);

  const tick = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    moveBall();
    renderBall();
  }, [moveBall, renderBall]);

  useEffect(() => {
    const intervalId = window.setInterval(tick, 25);
    return () => window.clearInterval(intervalId);
  }, [tick]);

  useEffect(() => {
    renderBall();
  }, [renderBall]);

  const toggleRunning = useCallback(() => {
    setRunning((prev) => !prev);
  }, []);

  const applyTexture = useCallback((type) => {
    setActiveType(type);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggleRunning();
      } else if (/^[0-6]$/.test(event.key)) {
        event.preventDefault();
        applyTexture(Number(event.key));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [applyTexture, toggleRunning]);

  const runIcon = running ? "bi bi-pause" : "bi bi-play";
  const runText = running ? "PAUSE" : "RUN";
  const runButtonClass = running ? "btn btn-warning" : "btn btn-success";

  const buttonClass = (type) => {
    const isActive = activeType === type;
    if (type === 0) {
      return isActive ? "btn btn-secondary text-white" : "btn btn-outline-secondary";
    }
    return isActive ? "btn btn-primary text-white" : "btn btn-outline-primary";
  };

  const currentTexture = objectTextures[activeType] ?? null;
  const ballStyle = {
    width: `${ballDiameter}px`,
    height: `${ballDiameter}px`,
    backgroundImage: currentTexture ? `url(${currentTexture})` : "none",
    backgroundColor: currentTexture ? "transparent" : "#ffffff",
  };

  return (
    <div className="anima-wrapper">
      <div
        id="field"
        className="anima-field"
        style={{
          width: `${fieldWidth}px`,
          height: `${fieldHeight}px`,
          backgroundImage: `url(${courtTexture})`,
        }}
      >
        <div ref={ballRef} className="anima-ball" style={ballStyle}></div>
      </div>

      <div className="anima-controls">
        <button
          type="button"
          id="run"
          className={`${runButtonClass} anima-run`}
          onClick={toggleRunning}
        >
          <i className={runIcon}></i>
          <span className="ms-1">{runText}</span>
        </button>

        <div className="anima-buttons">
          {selectorButtons.map((button) => (
            <button
              key={button.type}
              type="button"
              className={buttonClass(button.type)}
              onClick={() => applyTexture(button.type)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Animation;
