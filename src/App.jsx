import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Animation from "./pages/Animation";
import AppLayout from "./layouts/AppLayout";
import Todos from "./components/Todos";
import { useState, useEffect } from "react";
import Products from "./components/Products";
import Carts from "./components/Carts";
import { fetchProducts } from "./data/products";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState("x");
  const [role, setRole] = useState("");
  const [menu, setMenu] = useState();
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);

  useEffect(() => console.log(products), [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <BrowserRouter basename="/csi205">
        <Routes>
          <Route
            element={
              <AppLayout
                products={products}
                carts={carts}
                menu={menu}
                setMenu={setMenu}
                setToken={setToken}
                role={role}
              />
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="components" element={<Components />} />
            <Route path="todos" element={<Todos />} />
            <Route
              path="products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<Navigate to="home" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
