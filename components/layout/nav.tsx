import { TextScramble } from "@/components/core/text-scramble";
import { TargetIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const links = [
  { label: "guestbook", href: "/guestbook" },
  { label: "twitter", href: "https://x.com/chrisjabdo" },
  {
    label: "github",
    href: "https://github.com/ChrisAbdo",
  },
];
export default function Nav() {
  return (
    <div className="flex justify-between items-start">
      <div>
        <span className="text-2xl font-semibold flex items-center gap-x-0.5">
          <TargetIcon className="inline-block size-5" />
          <Link href="/" className="hover:underline">
            <TextScramble>christopher abdo</TextScramble>
          </Link>
        </span>
      </div>
      <nav>
        <ul className="flex space-x-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                <TextScramble>{link.label}</TextScramble>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
