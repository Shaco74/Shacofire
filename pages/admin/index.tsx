import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import { UserContext } from "../../lib/context";
import { fireStore, auth, timestamp } from "../../lib/firebase";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import {
  collection,
  collectionGroup,
  doc,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import PostList from "../../components/PostsList";
import { Button } from "@mui/material";

export default function AdminPostsPage(props) {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      let liste = await PostList();
      console.log(liste);
      console.log("liste");
      setPosts(liste);
      // ...
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  return (
    <main>
      <AuthCheck>
        {posts}
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
}

export function getUserWithUsername() {
  const usersRef = collection(fireStore, "users");

  // Create a query against the collection.
}

function displayPosts() {
  const postList = PostList();
  const result = [];
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const collectionRef = collection(fireStore, "users");
    const documentRef = doc(collectionRef, uid + "/posts/" + slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "# hello world!",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await setDoc(documentRef, data);

    toast.success("Post created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid}
        className="btn-green"
      >
        Create New Post
      </Button>
    </form>
  );
}
