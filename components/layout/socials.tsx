import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import React from "react";
import Link from "next/link";
import { TextScramble } from "../core/text-scramble";

export default function Socials() {
  const links = [
    {
      icon: TwitterLogoIcon,
      label: "twitter",
      href: "https://x.com/chrisjabdo",
    },
    {
      icon: GitHubLogoIcon,
      label: "github",
      href: "https://github.com/ChrisAbdo",
    },
  ];

  return (
    <div className="flex flex-col">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex items-center hover:underline"
        >
          <link.icon className="mr-2 h-4 w-4" />
          <TextScramble>{link.label}</TextScramble>
        </Link>
      ))}
    </div>
  );
}
