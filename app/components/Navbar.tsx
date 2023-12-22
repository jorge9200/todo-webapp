"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Jorge's App
          </Link>
        </div>
        <div className="flex-none">
          {status !== "loading" && (
            <ul className="menu menu-horizontal px-1">
              {session?.user ? (
                <>
                  <li className="mx-2">
                    <Link href="/todo" className="btn btn-primary btn-sm">
                      ToDo
                    </Link>
                  </li>
                  <li className="mx-2">
                    <button
                      onClick={() => signOut()}
                      className="btn btn-danger btn-sm"
                    >
                      Signout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mx-2">
                    <Link href="/login" className="btn btn-primary btn-sm">
                      Login
                    </Link>
                  </li>
                  <li className="mx-2">
                    <Link href="/register" className="btn btn-primary btn-sm">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
