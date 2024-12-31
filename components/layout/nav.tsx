import { TextScramble } from "@/components/core/text-scramble";

export default function Nav() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    {
      label: "About",
      href: "/about",
    },
  ];
  return (
    <div className="flex justify-between items-start">
      <div>
        <span className="text-2xl">
          <TextScramble>Christopher Abdo</TextScramble>
        </span>

        <TextScramble>Software Engineer</TextScramble>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>
                <TextScramble>{link.label}</TextScramble>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
