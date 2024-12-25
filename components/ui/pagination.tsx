"use client";

import clsx from "clsx";
import type React from "react";
import { Button } from "./button";

export function Pagination({
  "aria-label": ariaLabel = "Page navigation",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label={ariaLabel}
      {...props}
      className={clsx(className, "flex gap-x-2")}
    />
  );
}

export function PaginationPrevious({
  href,
  currentPage = 1,
  searchParam = "page",
  className,
  children = "Previous",
}: React.PropsWithChildren<{
  href: string;
  currentPage?: number;
  searchParam?: string;
  className?: string;
}>) {
  const targetUrl = new URL(href, location.href);
  targetUrl.searchParams.set(searchParam, (currentPage - 1).toString());

  const targetHref = currentPage <= 1 ? null : targetUrl.toString();

  return (
    <span className={clsx(className, "grow basis-0")}>
      <Button
        {...(targetHref === null ? { disabled: true } : { href: targetHref })}
        plain
        aria-label="Previous page"
      >
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.75 8H13.25M2.75 8L5.25 5.5M2.75 8L5.25 10.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {children}
      </Button>
    </span>
  );
}

export function PaginationNext({
  href,
  currentPage = 1,
  totalPages = 1,
  searchParam = "page",
  className,
  children = "Next",
}: React.PropsWithChildren<{
  href: string;
  totalPages: number;
  currentPage?: number;
  searchParam?: string;
  className?: string;
}>) {
  const targetUrl = new URL(href, location.href);
  targetUrl.searchParams.set(searchParam, (currentPage + 1).toString());

  const targetHref = currentPage >= totalPages ? null : targetUrl.toString();
  return (
    <span className={clsx(className, "flex grow basis-0 justify-end")}>
      <Button
        {...(targetHref === null ? { disabled: true } : { href: targetHref })}
        plain
        aria-label="Next page"
      >
        {children}
        <svg
          className="stroke-current"
          data-slot="icon"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13.25 8L2.75 8M13.25 8L10.75 10.5M13.25 8L10.75 5.5"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </span>
  );
}

export function PaginationList({
  href,
  currentPage,
  totalPages,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  href: string;
  currentPage: number;
  totalPages: number;
}) {
  const start = Math.max(5, currentPage - 2);
  const end = Math.min(totalPages - 3, currentPage + 3);

  return (
    <span
      {...props}
      className={clsx(className, "hidden items-baseline gap-x-2 sm:flex")}
    >
      {Array.from(Array(4).keys()).map((page) => (
        <PaginationPage
          href={href}
          key={1 + page}
          page={1 + page}
          current={
            1 + page === currentPage || (currentPage === 0 && page === 0)
          }
        />
      ))}
      <PaginationGap />
      {currentPage > 3 && currentPage < totalPages - 2 && (
        <>
          {Array.from(Array(end - start).keys()).map((page) => (
            <PaginationPage
              href={href}
              key={page + start}
              page={page + start}
              current={start + page === currentPage}
            />
          ))}
          <PaginationGap />
        </>
      )}
      {Array.from(Array(4).keys()).map((page) => (
        <PaginationPage
          href={href}
          key={totalPages - 3 + page}
          page={totalPages - 3 + page}
          current={totalPages - 3 + page === currentPage}
        />
      ))}
    </span>
  );
}

export function PaginationPage({
  href,
  page,
  searchParam = "page",
  className,
  current = false,
  children,
}: React.PropsWithChildren<{
  href: string;
  page: number;
  searchParam?: string;
  className?: string;
  current?: boolean;
}>) {
  children ??= page;
  const targetUrl = new URL(href, location.href);
  targetUrl.searchParams.set(searchParam, page.toString());

  return (
    <Button
      href={targetUrl.toString()}
      plain
      aria-label={`Page ${children}`}
      aria-current={current ? "page" : undefined}
      className={clsx(
        className,
        "min-w-[2.25rem] before:absolute before:-inset-px before:rounded-lg",
        current && "before:bg-zinc-950/5 dark:before:bg-white/10",
      )}
    >
      <span className="-mx-0.5">{children}</span>
    </Button>
  );
}

export function PaginationGap({
  className,
  children = <>&hellip;</>,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={clsx(
        className,
        "w-[2.25rem] select-none text-center text-sm/6 font-semibold text-zinc-950 dark:text-white",
      )}
    >
      {children}
    </span>
  );
}
