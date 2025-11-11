import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppNavbar = ({ menu, setMenu, products, carts, setToken }) => {
  const homeRef = useRef();
  const todosRef = useRef();
  const calculatorRef = useRef();
  const animationRef = useRef();
  const componentsRef = useRef();
  const productsRef = useRef();
  const cartsRef = useRef();

  useEffect(() => {
    switch (menu) {
      case "Home":
        homeRef.current.click();
        break;
      case "Calculator":
        calculatorRef.current.click();
        break;
      case "Animation":
        animationRef.current.click();
        break;
      case "Components":
        componentsRef.current.click();
        break;
      case "Todos":
        todosRef.current.click();
        break;
      case "Products":
        productsRef.current.click();
        break;
      case "Carts":
        cartsRef.current.click();
        break;
    }
  }, [menu]);

  return (
    <div className="d-flex justify-content-center gap-2">
      <Link to={"home"}>
        <Button
          variant={menu === "Home" ? "primary" : "outline-primary"}
          ref={homeRef}
          onClick={() => setMenu("Home")}
        >
          Home
        </Button>
      </Link>
      <Link to={"calculator"}>
        <Button
          variant={menu === "Calculator" ? "primary" : "outline-primary"}
          ref={calculatorRef}
          onClick={() => setMenu("Calculator")}
        >
          Calculator
        </Button>
      </Link>
      <Link to={"animation"}>
        <Button
          variant={menu === "Animation" ? "primary" : "outline-primary"}
          ref={animationRef}
          onClick={() => setMenu("Animation")}
        >
          Animation
        </Button>
      </Link>
      <Link to={"components"}>
        <Button
          variant={menu === "Components" ? "primary" : "outline-primary"}
          ref={componentsRef}
          onClick={() => setMenu("Components")}
        >
          Components
        </Button>
      </Link>
      <Link to={"todos"}>
        <Button
          variant={menu === "Todos" ? "primary" : "outline-primary"}
          ref={todosRef}
          onClick={() => setMenu("Todos")}
        >
          Todos
        </Button>
      </Link>
      <Link to={"products"}>
        <Button
          variant={menu === "Products" ? "primary" : "outline-primary"}
          ref={productsRef}
          onClick={() => setMenu("Products")}
        >
          Products ({products.length})
        </Button>
      </Link>
      <Link to={"carts"}>
        <Button
          variant={menu === "Carts" ? "primary" : "outline-primary"}
          ref={cartsRef}
          onClick={() => setMenu("Carts")}
          className="position-relative"
        >
          Carts
          {carts.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {carts.length < 10 ? carts.length : "9+"}
              <span className="visually-hidden">unread messages</span>
            </span>
          )}
        </Button>
      </Link>
      <button
        className="btn btn-outline-danger"
        style={{ marginLeft: "1rem" }}
        onClick={() => {
          setToken("");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AppNavbar;
