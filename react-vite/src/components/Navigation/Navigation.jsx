import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar-main">

      <div className="home-logo">
      <Link to='/'>
          <img className='logo' src="../logo.png" alt="Logo" />
        </Link>
      <p>I.M.P.</p>
      </div>


      <div className="profile-btn">
        <ProfileButton />
      </div>

    </div>
  );
}

export default Navigation;
