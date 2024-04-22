"use client";

import "./input.scss";

export default function Input({
  type,
  className,
  label,
  id,
  value,
  onchange,
}: {
  type?: string;
  className?: string;
  label?: string;
  id?: string;
  value?: string;
  onchange?: (value: string) => void;
}) {
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type ?? "text"}
        className={className}
        value={value}
        onChange={(evt) => onchange ? onchange(evt.target.value) : null}
      />
    </div>
  );
}
