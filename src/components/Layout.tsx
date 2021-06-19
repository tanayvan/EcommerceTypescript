import React, { useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollLock from "react-scrolllock";

interface Props {
  children: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
  const [menu, setMenu] = useState(false);

  const { cart } = useSelector((state: RootStateOrAny) => state.cart);

  return (
    <>
      <div className="product-wrapper">
        <div className="navbar">
          <div className="brand">
            <Link to="/" style={{ color: "black", fontSize: "2.5rem" }}>
              TV
            </Link>
          </div>
          <div className="menu-links-container">
            <Link to="/" className="menu-links">
              Winter Collection
            </Link>
            <Link to="/" className="menu-links">
              Summer Collection
            </Link>
          </div>
          <div className="icon-container">
            <Link className="cart" to="/cart">
              Cart(
              <span style={{ color: "red" }}>
                {cart.products.length ? cart.products.length : 0}
              </span>
              )
            </Link>

            <div
              className="hamburger"
              id="hamburger"
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <div
                className={menu ? "line line-1-active" : "line"}
                id="line-1"
              ></div>
              <div
                className={menu ? "line line-2-active" : "line"}
                id="line-2"
              ></div>
              <div
                className={menu ? "line line-3-active" : "line"}
                id="line-3"
              ></div>
            </div>
          </div>
        </div>
        {children}
      </div>
      {menu && (
        <ScrollLock>
          <div
            className={
              menu
                ? "mobile-menu-container mobile-menu-container-active"
                : "mobile-menu-container"
            }
          >
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
        </ScrollLock>
      )}
    </>
  );
};

export default Layout;
