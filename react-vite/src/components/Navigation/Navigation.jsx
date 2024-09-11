import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar-main">

      <div className="home-logo">
        <NavLink to="/">Home</NavLink>
      </div>

      <div className="profile-btn">
        <ProfileButton />
      </div>

    </div>
  );
}

export default Navigation;
