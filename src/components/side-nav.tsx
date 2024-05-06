"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import Icon from "./icon";

const SideNav = ({ items }: { items: any[] }) => {
  const currentPath = usePathname();

  return (
    <nav className="fixed top-14 hidden h-[calc(100dvh-7rem)] w-64 gap-4 overflow-y-auto border-r bg-background p-4 md:flex md:flex-col">
      {items.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.path}
            className="flex h-[40px] items-center justify-center gap-3 px-2 rounded-md text-sm font-medium text-primary hover:bg-muted hover:font-bold md:justify-start"
          >
            <Icon name={link.icon}></Icon>
            <p
              className={clsx("hidden md:block", {
                "font-extrabold text-cyan-400": currentPath === link.path,
              })}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </nav>
  );
};

export default SideNav;
