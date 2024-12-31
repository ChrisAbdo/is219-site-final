import Bio from "@/components/layout/bio";
import Nav from "@/components/layout/nav";
import Projects from "@/components/layout/projects";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Nav />

      <Bio />
      <hr className="border-t-1 border-black" />
      <Projects />
      <hr className="border-t-1 border-black" />
      <h1>Hello, world!</h1>
    </div>
  );
}
