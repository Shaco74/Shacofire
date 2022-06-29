import { fireStore, auth, firestoreIncrement } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, writeBatch } from "firebase/firestore";

// Allows user to heart or like a post
export default function Heart({ postRef }) {
  // Listen to heart document for currently logged in user
  //const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);
  const heartColl = collection(postRef, "hearts");
  const heartRef = doc(heartColl, auth.currentUser.uid);

  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    console.log(heartDoc.exists());
    console.log(heartDoc.data());
    console.log(heartDoc.id);
    console.log(heartRef.path);

    const uid = auth.currentUser.uid;
    await writeBatch(fireStore)
      .update(postRef, { heartCount: firestoreIncrement(1) })
      .set(heartRef, { uid })
      .commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    await writeBatch(fireStore)
      .update(postRef, { heartCount: firestoreIncrement(-1) })
      .delete(heartRef)
      .commit();
  };

  const toggleHeartButton = () => {
    if (heartDoc?.exists()) {
      return <button onClick={removeHeart}>💔 Unheart</button>;
    } else {
      return <button onClick={addHeart}>💗 Heart</button>;
    }
  };

  return toggleHeartButton();
}
