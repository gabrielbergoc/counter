"use client";

import "./display.scss";
import clsx from "clsx";

export default function Display({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="display-container">
      <span className={clsx(className, "display-span")}>{children}</span>
    </div>
  );
}
