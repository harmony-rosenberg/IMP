import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        artistName,
        bio,
        profilePicture
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="form-container">
    <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
				<label>Artist Name</label>
				<input
				type='text'
				value={artistName}
				onChange={(e) => setArtistName(e.target.value)}
				/>
			</div>
      <div>
				<label>Biography</label>
				<input
				type='text'
				value={bio}
				onChange={(e) => setBio(e.target.value)}
				/>
			</div>
      <div>
				<label>Profile Picture</label>
				<input
				type='text'
				value={profilePicture}
				onChange={(e) => setProfilePicture(e.target.value)}
				/>
			</div>
        <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
