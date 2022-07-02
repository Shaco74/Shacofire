import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { Button } from "@mui/material";

export default function Navbar() {
  const { user, username } = useContext(UserContext);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <Button className="btn-logo">FEED</Button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem " }}
                >
                  Write Posts
                </Button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoURL ? user.photoURL : "/noProfilePicture.jpg"}
                  width={50}
                  height={50}
                  alt="User Profilepicture"
                ></Image>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <Button variant="contained" size="large" className="btn-blue">
                Log in
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
