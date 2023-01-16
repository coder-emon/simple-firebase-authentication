import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import app from "./Firebase/firebase.init";
const auth = getAuth(app);
function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [user, setUser] = useState({});
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  const handleGoogleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
      const user = result.user;
      console.log(user);
      setUser(user);
    });
  };
  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleGoogleSignOut}>Google Sign Out </button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In </button>
          <button onClick={handleGithubSignIn}>Github Sign In </button>
          <button onClick={handleFacebookSignIn}>Facebook Sign In </button>
        </>
      )}
      <h2>{user.displayName}</h2>
      <p>{user.email ? user.email : "not found E-mail"}</p>
      <img src={user.photoURL} alt={user.displayName} />
    </div>
  );
}

export default App;
