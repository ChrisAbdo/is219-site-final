import React from "react";
import { TextScramble } from "@/components/core/text-scramble";

export default async function Projects() {
  const projects = [
    {
      title: "variant vault",
      description: "framer motion text animation variants",
      href: "https://github.com/ChrisAbdo/MotionVariants",
    },
  ];

  const projectsWithStars = await Promise.all(
    projects.map(async (project) => {
      const res = await fetch(
        `https://api.github.com/repos${new URL(project.href).pathname}`
      );
      const json = await res.json();
      return { ...project, stars: json.stargazers_count };
    })
  );

  return (
    <div>
      <TextScramble>Projects</TextScramble>
      {projectsWithStars.map((project, index) => (
        <div key={index}>
          <TextScramble>{project.title}</TextScramble>
          <TextScramble>{project.description}</TextScramble>
          <TextScramble>{`Stars: ${project.stars}`}</TextScramble>
        </div>
      ))}
    </div>
  );
}
