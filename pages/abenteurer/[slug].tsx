import { Grid, Paper } from "@mui/material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { fireStore } from "../../lib/firebase";
import { HeroInfo } from "./HeroInfo";

export default function Abenteurer(props) {
  const router = useRouter();
  const { slug } = router.query;

  if (typeof slug === "string") {
    //getHeroBySlug(slug);
  }

  let paperStyle = {
    backgroundImage: 'url("/paperBackground.jpg")',
    height: "100vh",
    width: "100%",
    padding: "2rem",
  };

  return (
    <div className="main">
      <Paper style={paperStyle}>
        <h1>Abenteurer {slug}</h1>
        <HeroInfo />
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TalentsSection />
          </Grid>
          <Grid item xs={6}>
            <OtherTraitsSection />
          </Grid>
        </Grid>
      </Paper>
      <style jsx>{`
        .main {
          background-color: black;
          padding-top: 5%;
          padding-right: 15%;
          padding-left: 15%;
        }
      `}</style>
    </div>
  );
}

function TalentsSection() {
  return (
    <div>
      <span className="category-title">Talente</span>
      <style jsx>{`
        .category-title {
          padding: 0px;
          font-weight: bold;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

function OtherTraitsSection() {
  return (
    <div>
      <span className="category-title">Vorteile</span>
      <style jsx>{`
        .category-title {
          padding: 0px;
          font-weight: bold;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

async function getHeroBySlug(slug: string) {
  const adventurersRef = collection(fireStore, "adventurers");
  const heroDoc = doc(
    fireStore,
    "adventurers/" + slug + "/definition/talente/koerpertalente/kraftakt"
  );

  let res = await getDoc(heroDoc);

  console.log("res");
  console.log(res.data());
}

async function getHeroByOwnerID() {
  const adventurersRef = collection(fireStore, "adventurers");
  const q = query(
    adventurersRef,
    where("ownerID", "==", "nCGOzbNEJMPF8dbhEW1oaCWLbeq1"),
    limit(1)
  );
  const res = (await getDocs(q)).docs[0];
  console.log("res");
  console.log(res.data());
}

async function getAdventurerWithName(username) {
  const usersRef = collection(fireStore, "users");

  // Create a query against the collection.
  const q = query(usersRef, where("username", "==", username), limit(1));
  const res = (await getDocs(q)).docs[0];

  return res;
}

async function collll(slug) {
  let userDoc = await getAdventurerWithName(slug);
  const userDocPostsRef = collection(userDoc.ref, "posts");

  const postsQuery = query(
    userDocPostsRef,
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  let e;
  let posts = (await getDocs(postsQuery)).docs.map(e);

  console.log(posts);
  console.log(e);
}
