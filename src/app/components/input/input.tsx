"use client";

import "./input.scss";

export default function Input({
  type,
  className,
  label,
  id,
  name,
  value,
  onchange,
}: {
  type?: string;
  className?: string;
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  onchange?: (value: string) => void;
}) {
  return (
    <div className="input-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={name}
        type={type ?? "text"}
        className={className}
        value={value}
        onChange={(evt) => onchange ? onchange(evt.target.value) : null}
      />
    </div>
  );
}
