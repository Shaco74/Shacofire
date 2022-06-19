import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNSnQrsbJmNXKmkN5k7-9KcgnZAz1J8mA",
  authDomain: "shacofire-16276.firebaseapp.com",
  projectId: "shacofire-16276",
  storageBucket: "shacofire-16276.appspot.com",
  messagingSenderId: "1017770420557",
  appId: "1:1017770420557:web:a8335feee0175c4d8cef04",
  measurementId: "G-XZ9V0ZNQT4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const googleAuthProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  // Check for user status
});

export { auth, db, storage, googleAuthProvider };

/* export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage(); */
