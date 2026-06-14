import Link from "next/link";
import { showcaseItemsByKind } from "../../lib/showcase-items";
import { aiStudioIcons } from "../icons/ai-studio-icons";
import { Links } from "./links";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { MobileSearch } from "./mobile-search";
import { Search } from "./search";
import { NavbarThemeSwitcher } from "./theme-switcher";

const componentsCount = showcaseItemsByKind.component.length;
const blocksCount = showcaseItemsByKind.block.length;
const patternsCount = showcaseItemsByKind.pattern.length;

const iconsCount = Object.keys(aiStudioIcons).length;

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 flex min-h-[var(--nav-height)] items-center justify-between border-b bg-[#fbfbfa]/95 px-4 py-3 backdrop-blur-sm transition-colors dark:bg-fd-background/90">
      <div className="flex items-center gap-3">
        <Link
          className="rounded-full border bg-background px-3 py-1.5 shadow-xs hover:bg-accent hover:text-accent-foreground"
          href="/"
        >
          <Logo />
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 justify-center md:flex">
        <div className="pointer-events-auto">
          <Search />
        </div>
      </div>
      <div className="hidden items-center gap-2 md:flex">
        <Links
          blocksCount={blocksCount}
          className="hidden gap-1 xl:flex"
          componentsCount={componentsCount}
          iconsCount={iconsCount}
          patternsCount={patternsCount}
        />
        <NavbarThemeSwitcher />
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <MobileSearch />
        <MobileMenu />
      </div>
    </div>
  );
}
