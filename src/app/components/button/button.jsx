"use client";

import "./button.scss";

export default function Button({ text, onclick }) {
  return (
    <button onClick={onclick}>{text}</button>
  )
}