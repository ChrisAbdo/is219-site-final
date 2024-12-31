import { TextScramble } from "@/components/core/text-scramble";
import { TargetIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ModeToggle } from "../core/mode-toggle";

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
        <ul className="flex items-center flex-wrap gap-2 sm:gap-4">
          <Link href="/guestbook" className="hover:underline">
            <TextScramble className="text-sm sm:text-base">
              guestbook
            </TextScramble>
          </Link>
          <ModeToggle />
        </ul>
      </nav>
    </div>
  );
}
