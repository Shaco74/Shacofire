import styles from "../../styles/Post.module.css";
import { fireStore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import PostContent from "../../components/PostContent";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  console.log("slug");
  console.log(slug);
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    /* const postRef1 = userDoc.ref.collection("posts").doc(slug); */
    const postRef = collection(userDoc.ref, "posts");
    const q = query(postRef, where("slug", "==", slug), limit(1));
    post = postToJSON((await getDocs(q)).docs[0]);
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await getDocs(collectionGroup(fireStore, "posts"));

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    console.log("slug");
    console.log(slug);
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = doc(fireStore, props.path + "/" + props.post.slug);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
      </aside>
    </main>
  );
}
