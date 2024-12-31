import Bio from "@/components/layout/bio";
import Hackathons from "@/components/layout/hackathons";
import Nav from "@/components/layout/nav";
import Projects from "@/components/layout/projects";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Nav />

      <Bio />
      <hr className="border-t-1 border-black" />
      <Projects />
      <hr className="border-t-1 border-black" />
      <Hackathons />
    </div>
  );
}
