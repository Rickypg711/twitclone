import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";

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
            <IconHoverEffect>
              <span className="item-center flex gap-4">
                <VscHome className="h-8 w-8" />
                <span className="hidden text-lg md:inline"> HOME </span>
              </span>
            </IconHoverEffect>
          </Link>
        </li>
        {user && (
          <li>
            <Link href={`/profiles/${user.id}`} className="">
              <IconHoverEffect>
                <span className="item-center flex gap-4">
                  <VscAccount className="h-8 w-8" />
                  <span className="hidden text-lg md:inline"> PROFILE</span>
                </span>
              </IconHoverEffect>
            </Link>
          </li>
        )}
        {user == null ? (
          <li>
            <button onClick={() => void signIn()} className="">
              <IconHoverEffect>
                <span className="item-center flex gap-4">
                  <VscSignIn className="h-8 w-8 fill-green-700" />
                  <span className="hidden text-lg text-green-700 md:inline">
                    {" "}
                    Log In
                  </span>
                </span>
              </IconHoverEffect>
            </button>
          </li>
        ) : (
          <li>
            <button onClick={() => void signOut()} className="">
              <IconHoverEffect>
                <span className="item-center flex gap-4">
                  <VscSignOut className="h-8 w-8 fill-red-700" />
                  <span className="hidden text-lg text-red-700 md:inline">
                    {" "}
                    Log Out
                  </span>
                </span>
              </IconHoverEffect>
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
