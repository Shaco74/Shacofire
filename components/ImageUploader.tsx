import { ChangeEventHandler, useState } from "react";
import { auth, storage } from "../lib/firebase";
import Loader from "./Loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("0");
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e: any) => {
    // Get the file
    const target = e.target as HTMLInputElement;
    const file = Array.from(target.files)[0];
    const extension = file.type.split("/")[1];

    // Makes reference to the storage bucket location
    const storageRef = ref(
      storage,
      `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = uploadBytesResumable(storageRef, await file.arrayBuffer());
    task
      .then(() => {
        console.log("finished propmise");
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
        setUploading(false);
      });

    // Listen to updates to upload task
    task.on("state_changed", (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      task
        .then((d) => getDownloadURL(storageRef))
        .then((url) => {
          setDownloadURL(url);
          setUploading(false);
        });
    });
  };

  return (
    <div className="box">
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn">
            📸 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
}
