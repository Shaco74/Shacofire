import Link from "next/link";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <main>
      <Link
        prefetch={false}
        href={{ pathname: "/[username]", query: { username: "shankz" } }}
      >
        <a>Shankz Profil</a>
      </Link>
      <h1>hi</h1>
      <button onClick={() => toast.success("hello toast!")}>
        Toaste mich!
      </button>
    </main>
  );
}
