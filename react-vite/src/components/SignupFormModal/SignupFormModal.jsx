import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      closeModal();
    }
  };

  return (
    <div>
      {errors.server && <p>{errors.server}</p>}
      <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="gradient-top">Sign up for I.M.P.</div>
        <div>
        <label>
          Email
          <input
            type="email"
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
				<textarea
              rows={8}
              cols={30}
				type='textarea'
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
        <button className="form-btn" type="submit"
        disabled={!email || !password || !username || !artistName || confirmPassword !== password}
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
