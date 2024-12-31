import Bio from "@/components/layout/bio";
import Hackathons from "@/components/layout/hackathons";
import Projects from "@/components/layout/projects";
import Socials from "@/components/layout/socials";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <Bio />
        <div className="mt-4 sm:mt-0">
          <Socials />
        </div>
      </div>
      <hr className="border-t-1 border-primary" />
      <Projects />
      <hr className="border-t-1 border-primary" />
      <Hackathons />
    </>
  );
}
