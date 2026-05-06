import Link from "next/link";
import { source } from "../../lib/source";
import { aiStudioIcons } from "../icons/ai-studio-icons";
import { Links } from "./links";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { MobileSearch } from "./mobile-search";
import { Search } from "./search";
import { NavbarThemeSwitcher } from "./theme-switcher";

const componentsCount = source
  .getPages()
  .filter(({ slugs }) => slugs[0] === "components").length;

const blocksCount = source
  .getPages()
  .filter(({ slugs }) => slugs[0] === "blocks").length;

const patternsCount = source
  .getPages()
  .filter(({ slugs }) => slugs[0] === "patterns").length;

const iconsCount = Object.keys(aiStudioIcons).length;

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b bg-fd-background/80 px-4 py-3 backdrop-blur-sm transition-colors">
      <div className="flex items-center gap-3">
        <Link
          className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
          href="/"
        >
          <Logo />
        </Link>
        <Links
          blocksCount={blocksCount}
          className="hidden gap-1 md:flex"
          componentsCount={componentsCount}
          iconsCount={iconsCount}
          patternsCount={patternsCount}
        />
      </div>
      <div className="hidden items-center gap-3 md:flex">
        <Search />
        <NavbarThemeSwitcher />
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <MobileSearch />
        <MobileMenu />
      </div>
    </div>
  );
}
