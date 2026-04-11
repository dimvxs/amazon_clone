"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useFloating, offset, autoUpdate } from "@floating-ui/react";

export default function DropdownContainer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState<number>(0);

  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom",
    middleware: [offset(-21)],
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
  });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentGhostRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const buttonW = buttonRef.current?.offsetWidth ?? 0;
    const contentW = contentGhostRef.current?.offsetWidth ?? 0;

    setWidth(Math.max(buttonW, contentW));
  }, [children, label]);
  useEffect(() => {
    if (!panelRef.current) return;

    if (open) {
      setHeight(panelRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open, children]);

  return (
    <>
      <button
        ref={(node) => {
          refs.setReference(node);
          buttonRef.current = node;
        }}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: width ? `${width}px` : "auto",
        }}
        className="relative z-[10000] px-[12px] h-[34px] bg-gray-600 rounded-[16px] whitespace-nowrap flex justify-between items-center shrink-0"
      >
        {label}
      </button>

      <div
        ref={(node) => {
          refs.setFloating(node);
          panelRef.current = node;
        }}
        style={{
          ...floatingStyles,
          height,
          minWidth: width ? `${width}px` : undefined,
        }}
        className="z-[9999] bg-gray-600 rounded-lg overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div
          className="p-3 pt-[25px] flex flex-col gap-[20px] text-[14px]
    leading-[16px]"
        >
          {children}
        </div>
      </div>
      <div
        ref={contentGhostRef}
        className="absolute invisible p-3 pt-5 whitespace-nowrap "
      >
        {children}
      </div>
    </>
  );
}
