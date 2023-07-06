import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function SideNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className=" sticky top-0 px-2 py-4 ">
      {" "}
      SideNav
      <ul className="flex flex-col items-start gap-2 whitespace-nowrap ">
        <li>
          <Link href={"/"} className="">
            HOME
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`} className="">
              PROFILE
            </Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()} className="">
              LOG IN
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()} className="">
              LOG OUT
            </button>
          </li>
        )}

        <li>
          <Link href={"/"} className="">
            HOME
          </Link>
        </li>
        <li>
          <Link href={"/"} className="">
            HOME
          </Link>
        </li>
      </ul>
    </nav>
  );
}
