"use client";

import "./button.scss";

export default function Button({
  children,
  onclick,
  className,
}: {
  children: React.ReactNode;
  onclick: () => void;
  className?: string;
}) {
  return <button className={className} onClick={onclick}>{children}</button>;
}
