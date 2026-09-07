"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { contest, nav } from "@/data/plan";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
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
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
