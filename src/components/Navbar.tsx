import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signout } from "../Apicalls/Auth";
export default function Navbar() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [menu, setMenu] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="brand">
          <div className="heading-1">Tanay</div>
          <div className="heading-2">Van</div>
        </div>
      </Link>
      <div className="menu-collection">
        <div className="nav-links">
          <Link to="">Summer Collection</Link>
        </div>
        <div className="nav-links">
          <Link to="">Winter Collection</Link>
        </div>
        <div className="nav-links">
          {userData !== null && userData?.user?.role === 1 && (
            <Link to="/admin">Admin Page</Link>
          )}
        </div>
      </div>
      <div className="user-login">
        <div className="nav-links">
          {userData == null ? (
            <Link to="/login">Login/Signup</Link>
          ) : (
            <button
              className="btn"
              onClick={() => {
                signout(() => {
                  setUserData(null);
                });
              }}
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
      <div
        className="hamburger"
        id="hamburger"
        onClick={() => {
          setMenu(!menu);
        }}
      >
        <div className={menu ? "line line-1-active" : "line"} id="line-1"></div>
        <div className={menu ? "line line-2-active" : "line"} id="line-2"></div>
        <div className={menu ? "line line-3-active" : "line"} id="line-3"></div>
      </div>
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
    </nav>
  );
}
