"use client";

import React from "react";
import Link from "next/link";
import NavItems from "./NavItems";
import { Button } from "./ui/button";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="navbar flex justify-between items-center px-6 py-4 shadow-sm">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
        <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold">AI Tutor</span>
      </Link>

      {/* Nav Items + Auth */}
      <div className="flex items-center gap-8">
        <NavItems />

        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-700">Hi, {user?.firstName}</span>
            {/* Clerk's profile dropdown (profile + sign out) */}
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <SignInButton mode="modal">
            <Button className="cursor-pointer">Sign In</Button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
