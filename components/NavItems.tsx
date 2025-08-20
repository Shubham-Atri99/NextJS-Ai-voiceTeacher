import React from "react";
import Link from "next/link";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Companions",
    href: "/companions",
  },
  {
    name: "My Journey",
    href: "/myJourney",
  },
];

const NavItems = () => {
  return (
    <div className="flex items-center gap-4">
      {navItems.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className="text-gray-700 hover:text-black font-medium transition-colors"
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
