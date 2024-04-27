"use client";

import { useKeyEffect } from "@/app/lib/effects";
import Button from "../button/button";
import "./dialog.scss";

export default function Dialog({
  children,
  show,
  onConfirm,
  onCancel,
}: {
  children?: React.ReactNode;
  show?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}) {
  useKeyEffect("Escape", "keypress", onCancel);
  
  return show ? (
    <div className="dialog-overlay" onClick={onCancel}>
      <div className="dialog" onClick={evt => evt.stopPropagation()}>
        {children}

        <div className="dialog-buttons">
          <Button onclick={onConfirm}>Ok</Button>
          <Button onclick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  ) : null;
}
