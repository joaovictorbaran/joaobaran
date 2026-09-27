"use client";

import { useEffect, useRef, useState } from "react";

type CopyEmailProps = {
  email?: string;
};

function copyWithLegacyApi(value: string) {
  const textarea = document.createElement("textarea");
  const previouslyFocused = document.activeElement;

  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);

  try {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    if (!document.execCommand("copy")) {
      throw new Error("The browser could not copy the email address.");
    }
  } finally {
    textarea.remove();

    if (previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus();
    }
  }
}

async function copyEmailToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall back to the older browser API when clipboard permissions are denied.
    }
  }

  copyWithLegacyApi(value);
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="6.5"
        y="6.5"
        width="10"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M13.5 4.5V4A1.5 1.5 0 0 0 12 2.5H5A1.5 1.5 0 0 0 3.5 4v7A1.5 1.5 0 0 0 5 12.5h.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="m5 10.5 3.5 3.5L15 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CopyEmail({ email = "contato@joaobaran.com" }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    },
    [],
  );

  async function handleCopy() {
    try {
      await copyEmailToClipboard(email);
    } catch {
      setCopied(false);
      return;
    }

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    setCopied(true);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <span className="copy-email">
      <button
        className="copy-email__button"
        type="button"
        aria-label="Copiar e-mail"
        data-copied={copied}
        onClick={() => void handleCopy()}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <span
        className="copy-email__feedback"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        data-copied={copied}
      >
        {copied ? "Copiado" : ""}
      </span>
    </span>
  );
}
