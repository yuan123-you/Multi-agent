import { Menu } from "lucide-react";
import { contest, nav } from "@/data/plan";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="#top" className="font-heading text-base tracking-wide">
          途见锦官
          <span className="ml-2 text-xs font-sans font-normal text-muted-foreground">
            赛道A策划
          </span>
        </a>
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contest.signup}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground"
          >
            官方报名
          </a>
        </nav>
        <input id="nav-toggle" type="checkbox" className="sr-only" />
        <label
          htmlFor="nav-toggle"
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md border border-border md:hidden"
          aria-label="打开菜单"
        >
          <Menu className="size-5" />
        </label>
      </div>
      <div className="mobile-nav border-t border-border bg-card px-4 py-4 shadow-md md:hidden">
        <div className="flex flex-col gap-1 text-sm">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-2.5 hover:bg-muted"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contest.signup}
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-2 py-2.5 text-primary"
          >
            官方报名
          </a>
        </div>
      </div>
    </header>
  );
}
