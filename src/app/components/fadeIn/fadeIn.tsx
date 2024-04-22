"use client";

import "./fadeIn.scss";

export default function FadeIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fade-in">
      {children}
    </div>
  );
}
