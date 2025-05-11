import React from "react";
import { TextScramble } from "@/components/core/text-scramble";
import Link from "next/link";
import { Link2Icon } from "@radix-ui/react-icons";

export default function Hackathons() {
  const hackathons = [
    {
      title: "ethglobal hack-fevm",
      description:
        "developed soulmates, a soulbound token (sbt) issuance engine, built on fevm (filecoin v virtual machine). soulbound tokens with provably stored metadata, powered by fevm.",
      award: "🏆 grand prize for best use of filecoin",
      href: "https://ethglobal.com/showcase/soulmates-wveqg",
    },
    {
      title: "ethglobal san francisco",
      description:
        "developed destemr, a decentralized music streaming platform built on top of polygon.",
      award:
        "🏆 top 9 ipfs & filecoin prize, 🥈 top 6 covalent best use of api prize",
      href: "https://ethglobal.com/showcase/destemr-y5mw7",
    },
  ];
  return (
    <div className="w-full">
      <TextScramble className="font-semibold mb-4 sm:mb-6">
        &#x2022; hackathons
      </TextScramble>

      {hackathons.map((hackathon, index) => (
        <div
          key={index}
          className="flex flex-col mb-6 sm:mb-8 py-1 px-2 rounded-sm"
        >
          <TextScramble className="underline mb-2">
            {hackathon.title}
          </TextScramble>
          <div className="w-full sm:max-w-3xl">
            <TextScramble className="text-sm sm:text-base">
              {hackathon.description}
            </TextScramble>
            <br />
            <TextScramble className="text-sm sm:text-base mt-2">
              {hackathon.award}
            </TextScramble>
          </div>
          <Link
            href={hackathon.href}
            className="hover:underline text-sm sm:text-base mt-2 w-fit flex items-center gap-x-0.5"
            rel="noopener"
            target="_blank"
            prefetch={false}
          >
            <Link2Icon className="size-4" />
            <TextScramble>view project</TextScramble>
          </Link>
        </div>
      ))}
    </div>
  );
}
