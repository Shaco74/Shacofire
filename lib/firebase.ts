import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import {
  collection,
  DocumentSnapshot,
  getDocs,
  limit,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

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
const fireStore = getFirestore(app);
const storage = getStorage(app);

const googleAuthProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  // Check for user status
});

export { auth, fireStore, storage, googleAuthProvider };
export const fromMillis = Timestamp.fromMillis;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(fireStore, "users");

  // Create a query against the collection.
  const q = query(usersRef, where("username", "==", username), limit(1));
  const res = (await getDocs(q)).docs[0];

  return res;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
