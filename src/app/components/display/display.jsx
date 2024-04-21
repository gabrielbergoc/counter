"use client";

import "./display.scss";

export default function Display({ content }) {
  return (
    <div className="display-container">
      <span>{content}</span>
    </div>
  );
}
