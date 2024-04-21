"use client";

import "./display.scss";
import clsx from "clsx";

export default function Display({
  content,
  className,
}: {
  content: string | number;
  className?: string;
}) {
  return (
    <div className="display-container">
      <span className={clsx(className, "display-span")}>{content}</span>
    </div>
  );
}
