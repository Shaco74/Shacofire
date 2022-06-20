import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  where,
  query,
} from "firebase/firestore";
import router from "next/router";

export async function getServerSideProps(pQuerry) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { username } = pQuerry.query;

  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();

    const userDocPostsRef = collection(userDoc.ref, "posts");

    const postsQuery = query(
      userDocPostsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
}
