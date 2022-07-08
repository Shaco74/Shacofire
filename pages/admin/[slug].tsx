import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import { fireStore, auth, timestamp } from "../../lib/firebase";

import { useRef, useState } from "react";
import { useRouter } from "next/router";

import {
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import ImageUploader from "../../components/ImageUploader";
import { Button } from "@mui/material";

export default function AdminPostEdit() {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const postRef = doc(
    fireStore,
    "users/" + auth.currentUser.uid + "/posts/" + slug
  );

  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm
              postRef={postRef}
              defaultValues={post}
              preview={preview}
            />
          </section>

          <aside>
            <h3>Tools</h3>
            <Button
              variant="contained"
              style={{ marginBottom: "5px" }}
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Edit" : "Preview"}
            </Button>
            <Link href={`/${post.username}/${post.slug}`}>
              <Button variant="contained" className="btn-blue">
                Live view
              </Button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty, errors } = formState;

  const contentHook: { onChange; name; ref } = register("content", {
    maxLength: { value: 20000, message: "content is too long" },
    minLength: { value: 10, message: "content is too short" },
    required: { value: true, message: "content is required" },
  });
  const publishedHook: { onChange; name; ref } = register("published");

  const updatePost = async ({ content, published }) => {
    await updateDoc(postRef, {
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });
    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />

        <textarea {...contentHook}></textarea>
        <fieldset>
          <input
            className={styles.checkbox}
            type="checkbox"
            {...publishedHook}
          />
          <label>Published</label>
        </fieldset>
        {errors.content && (
          <p className="text-danger">{errors.content.message.toString()}</p>
        )}

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
