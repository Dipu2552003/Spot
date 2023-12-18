import React, { useEffect } from "react";
import "./css/Sidebar.css";
import {
  FaTwitter,
  FaHome,
  FaHashtag,
  FaRegBell,
  FaRegEnvelope,
  FaRegBookmark,
  FaClipboardList,
  FaUserAlt,
  FaMehBlank,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="sidebar">
      <ul>
        <li>{/* <FaTwitter className="icons logo" /> */}</li>
        <li>
          <Link to="/">
            <FaHome
              className={`icons ${location.pathname === "/" ? "logo" : ""}`}
            />
            Home
          </Link>
        </li>
        <li>
          <Link to="/tag/academic">
            <FaClipboardList
              className={`icons ${
                location.pathname === "/tag/academic" ? "logo" : ""
              }`}
            />{" "}
            Academic
          </Link>
        </li>
        <li>
          <Link to="/tag/extracurricular">
            <FaUserAlt
              className={`icons ${
                location.pathname === "/tag/extracurricular" ? "logo" : ""
              }`}
            />
            ExtraCurricular
          </Link>
        </li>
        <li>
          <Link to="/tag/scholarship">
            <FaMehBlank
              className={`icons ${
                location.pathname === "/tag/scholarship" ? "logo" : ""
              }`}
            />
            Scholarship
          </Link>
        </li>
      
        <hr />
        {!localStorage.getItem("token") ? (
          <>
            <li>
              <Link to="/login">
                <FaRegBookmark className="icons" /> Login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaRegBookmark className="icons" /> Signup
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/" onClick={handleLogout}>
              <FaRegBookmark className="icons" /> Logout
            </Link>
          </li>
        )}
        <hr />
        
        <Link to="/about">
           About
        </Link>

        <Link to="/contactUs">
           ContactUs
        </Link>

        <Link to="/profile">
          <div className="sidebar__Btn">Profile</div>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
