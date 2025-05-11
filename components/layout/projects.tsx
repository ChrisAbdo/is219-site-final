import React from "react";
import { TextScramble } from "@/components/core/text-scramble";
import { GitHubLogoIcon, StarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function Projects() {
  const projects = [
    {
      title: "variant vault",
      description: "framer motion text animation variants",
      href: "https://github.com/ChrisAbdo/MotionVariants",
    },
    {
      title: "ai rag internal knowledge base",
      description:
        "generate a knowledge base of any website. scrape a url and generate a chattable knowledge base.",
      href: "https://github.com/ChrisAbdo/IKB",
    },
    {
      title: "self hosted cms + rest api",
      description:
        "fully self hosted cms using docker, drupal, traefik, watchtower, letsencrypt",
      href: "https://github.com/ChrisAbdo/drupal-traefik",
    },

    {
      title: "'iforget' ai cli tool",
      description:
        "ai powered cli tool to help you with commands you forgot. gpt-4 + bun $hell",
      href: "https://github.com/ChrisAbdo/AI-CLI/tree/main/iforget-cli",
    },
    {
      title: "gpt4 pdf summarizer",
      description: "summarize any pdf with gpt-4",
      href: "https://github.com/ChrisAbdo/GPT4-PDF-Summarizer",
    },
    {
      title: "url to markdown converter",
      description: "convert any url to markdown at high speeds",
      href: "https://github.com/ChrisAbdo/md",
    },
  ];

  const projectsWithStars = await Promise.all(
    projects.map(async (project) => {
      const { stargazers_count: stars } = await fetch(
        `https://api.github.com/repos${new URL(project.href).pathname}`,
        {
          ...(process.env.GITHUB_OAUTH_TOKEN && {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
              "Content-Type": "application/json",
            },
          }),
          next: { revalidate: 86400 },
        }
      )
        .then((res) => res.json())
        .catch((e) => {
          console.error(`Error fetching stars for ${project.title}:`, e);
          return { stargazers_count: null };
        });

      return { ...project, stars };
    })
  );

  return (
    <div>
      <TextScramble className="font-semibold mb-6">
        &#x2022; personal projects
      </TextScramble>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsWithStars.map((project, index) => (
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
                <TextScramble className="mt-0.5">view github</TextScramble>
              </Link>
              <span className="flex items-center gap-x-0.5">
                <StarIcon className="size-4" />
                <TextScramble className="mt-0.5">
                  {project.stars ? `${project.stars}` : "n/a"}
                </TextScramble>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
