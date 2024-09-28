import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout, thunkLogin } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";


function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [email] = useState("demo@aa.io");
  const [password] = useState("password");
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  // const credentials = {
  //   credential,
  //   password
  // }

  const demoLogin = () => {
    return dispatch(thunkLogin({ email, password }))
  }

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.artistName}</li>
              <li>
                <NavLink to={'/profiles/:userId'} onClick={() => closeMenu()}>yr profile</NavLink>
                </li>
              <li>
                <NavLink to={'/albums/new'} onClick={() => closeMenu()}> create an album </NavLink>
                </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <button onClick={demoLogin}>Log in as demo user</button>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
