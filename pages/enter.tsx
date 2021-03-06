import { auth, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "../lib/context";
import { fireStore } from "../lib/firebase";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { Button } from "@mui/material";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <Button
      variant="contained"
      size="large"
      color="secondary"
      onClick={signInWithGoogle}
      className="btn-google"
      style={{ gap: "0.5rem" }}
    >
      <Image
        height={30}
        width={30}
        src="/google.png"
        alt="Sign in with Google Logo"
      />{" "}
      Sign in with Google
    </Button>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <Button variant="contained" size="large" onClick={() => auth.signOut()}>
      Sign Out
    </Button>
  );
}

// Username form
function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(fireStore, `users/${user.uid}`);
    const usernameDoc = doc(fireStore, `usernames/${formValue}`);

    // Commit both docs together as a batch write.
    await writeBatch(fireStore)
      .set(userDoc, {
        username: formValue,
        photoURL: user.photoURL,
        displayName: user.displayName,
      })
      .set(usernameDoc, { uid: user.uid })
      .commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const usernameDoc = doc(fireStore, `usernames/${username}`);
        const ref = getDoc(usernameDoc);
        const exists = (await ref).exists();

        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="myname"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button
            style={{ margin: "1rem 0rem 1rem 0rem" }}
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            disabled={!isValid}
          >
            Choose
          </Button>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
