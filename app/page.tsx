import Bio from "@/components/layout/bio";
import Hackathons from "@/components/layout/hackathons";
import Projects from "@/components/layout/projects";
import React from "react";

export default function Home() {
  return (
    <>
      <Bio />
      <hr className="border-t-1 border-black" />
      <Projects />
      <hr className="border-t-1 border-black" />
      <Hackathons />
    </>
  );
}
