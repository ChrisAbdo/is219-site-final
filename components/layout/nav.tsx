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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <span className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-x-0.5">
          <TargetIcon className="inline-block size-4 sm:size-5" />
          <Link href="/" className="hover:underline">
            <TextScramble className="text-lg sm:text-xl md:text-2xl">
              christopher abdo
            </TextScramble>
          </Link>
        </span>
      </div>
      <nav className="mt-2 sm:mt-0">
        <ul className="flex flex-wrap gap-2 sm:gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:underline">
                <TextScramble className="text-sm sm:text-base">
                  {link.label}
                </TextScramble>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
