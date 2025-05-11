import React from "react";
import { TextScramble } from "@/components/core/text-scramble";
import { GitHubLogoIcon, StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function School() {
  const projects = [
    {
      title: "D3.js data visualization",
      description: "d3.js data visualization for sharktank data",
      href: "/projects/d3js",
    },
  ];

  return (
    <div>
      <TextScramble className="font-semibold mb-6">
        &#x2022; school projects
      </TextScramble>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex flex-col justify-between py-1 px-2 rounded-sm h-full"
          >
            <div>
              <TextScramble className="underline">{project.title}</TextScramble>
              <TextScramble>{project.description}</TextScramble>
            </div>
            <div className="flex justify-between items-center mt-3">
              <Link
                href={project.href}
                className="hover:underline flex items-center gap-x-0.5"
                rel="noopener"
                target="_blank"
                prefetch={false}
              >
                <GitHubLogoIcon className="size-4" />
                <TextScramble className="mt-0.5">view project</TextScramble>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
