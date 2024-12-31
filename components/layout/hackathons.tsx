import React from "react";
import { TextScramble } from "@/components/core/text-scramble";
import Link from "next/link";

export default function Hackathons() {
  const hackathons = [
    {
      title: "ethglobal hack-fevm",
      description:
        "developed soulmates, a soulbound token (sbt) issuance engine, built on fevm (filecoin v virtual machine). soulbound tokens with provably stored metadata, powered by fevm.",
      award: "grand prize for best use of filecoin",
      href: "https://ethglobal.com/showcase/soulmates-wveqg",
    },
    {
      title: "ethglobal san francisco",
      description:
        "developed destemr, a decentralized music streaming platform built on top of polygon.",
      award:
        "top 9 ipfs & filecoin prize, top 6 covalent best use of api prize",
      href: "https://ethglobal.com/showcase/destemr-y5mw7",
    },
  ];
  return (
    <div>
      <TextScramble className="font-semibold mb-6">hackathons</TextScramble>

      {hackathons.map((hackathon, index) => (
        <div key={index} className="flex flex-col mb-8 py-1 px-2 rounded-sm">
          <div className="flex justify-between items-center">
            <TextScramble className="underline">{hackathon.title}</TextScramble>
            <Link
              href={hackathon.href}
              className="hover:underline"
              rel="noopener"
              target="_blank"
              prefetch={false}
            >
              <TextScramble>view project</TextScramble>
            </Link>
          </div>
          <div className="max-w-3xl">
            <TextScramble>{hackathon.description}</TextScramble>
            <br />
            <TextScramble>{hackathon.award}</TextScramble>
          </div>
        </div>
      ))}
    </div>
  );
}
