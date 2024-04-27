"use client";

import "./button.scss";

export default function Button({
  children,
  onclick,
  className,
  type,
}: {
  children?: React.ReactNode;
  onclick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button type={type ?? "button"} className={className} onClick={onclick}>
      {children}
    </button>
  );
}
