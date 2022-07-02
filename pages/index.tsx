import PostFeed from "../components/PostFeed";
import Loader from "../components/Loader";
import { fireStore, fromMillis, postToJSON } from "../lib/firebase";

import { useState } from "react";
import {
  collectionGroup,
  where,
  orderBy,
  query,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import Metatags from "../components/Metatags";
import { Button } from "@mui/material";
// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(fireStore, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const postsQuery = query(
      collectionGroup(fireStore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );
    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title="Home" />
      <PostFeed posts={posts} admin={props.admin} />

      {!loading && !postsEnd && (
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ margin: "1rem 0rem 1rem 0rem" }}
          onClick={getMorePosts}
        >
          Load more
        </Button>
      )}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </main>
  );
}
