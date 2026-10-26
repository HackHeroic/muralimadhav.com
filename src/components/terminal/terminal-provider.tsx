"use client";

import { X } from "lucide-react";
import React from "react";
import { SoundTerminal } from "./sound-terminal";

type TerminalContextValue = { open: () => void; close: () => void; isOpen: boolean };

const TerminalContext = React.createContext<TerminalContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export const useTerminal = () => React.useContext(TerminalContext);

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const opener = React.useRef<HTMLElement | null>(null);

  const open = React.useCallback(() => {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setCompact(window.matchMedia("(max-width: 639px)").matches);
    setIsOpen(true);
  }, []);

  const close = React.useCallback(() => {
    setIsOpen(false);
    opener.current?.focus({ preventScroll: true });
  }, []);

  const isOpenRef = React.useRef(false);
  isOpenRef.current = isOpen;

  // `muralimadhav.com/#terminal` opens it directly; backtick toggles it anywhere.
  React.useEffect(() => {
    if (window.location.hash === "#terminal") open();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpenRef.current) {
        close();
        return;
      }
      if (e.key === "`" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault();
        if (isOpenRef.current) close();
        else open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const value = React.useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <TerminalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Terminal">
          <div className="absolute inset-0 bg-[rgba(8,9,10,0.55)] backdrop-blur-[3px]" onClick={close} aria-hidden />
          {compact ? (
            <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col gap-1.5 rounded-t-[18px] border-t border-[#30363d] bg-[#0d1117] px-3 pb-4 pt-2">
              <div className="flex justify-center pt-0.5">
                <span aria-hidden className="h-1 w-10 rounded-full bg-[#30363d]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="pl-1 font-mono text-xs text-[#8b949e]">madhav&apos;s terminal</span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close the terminal"
                  className="flex size-11 items-center justify-center text-[#e6edf3]"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <SoundTerminal compact />
            </div>
          ) : (
            <div className="relative mx-auto mt-[8vh] flex w-full max-w-[820px] flex-col gap-2.5 px-6">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close the terminal"
                  className="flex min-h-11 items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-3.5 font-mono text-[13px] text-[#e6edf3]"
                >
                  <span>close</span>
                  <X className="size-3.5" aria-hidden />
                </button>
              </div>
              <SoundTerminal />
            </div>
          )}
        </div>
      ) : null}
    </TerminalContext.Provider>
  );
}

export function TerminalButton({ className }: { className?: string }) {
  const { open } = useTerminal();
  return (
    <button type="button" onClick={open} className={className}>
      {/* the same >_ glyph as the dock icon */}
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
        <path d="M4 17l6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
      <span>terminal</span>
    </button>
  );
}
