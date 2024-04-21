"use client";

import "./button.scss";

export default function Button({
  text,
  onclick,
  className,
}: {
  text: string;
  onclick: () => void;
  className?: string;
}) {
  return <button className={className} onClick={onclick}>{text}</button>;
}
