import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { auth, fireStore } from "../lib/firebase";
import PostFeed from "./PostFeed";

export default async function PostList() {
  const userDocPostsRef = collection(
    fireStore,
    "users/" + "nCGOzbNEJMPF8dbhEW1oaCWLbeq1" + "/posts"
  );

  const postsQuery = query(userDocPostsRef, orderBy("createdAt", "desc"));

  const posts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}
