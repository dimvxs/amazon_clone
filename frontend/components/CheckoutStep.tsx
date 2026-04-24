"use client";

import StepHeader from "@/components/StepHeader";

type CheckoutStepMode = "form" | "card" | "open";

interface CheckoutStepProps {
  step: number;
  title: string;
  mode: CheckoutStepMode;
  onOpen: () => void;
  changeLabel?: string;
  children: React.ReactNode;
}
export default function CheckoutStep({
  step,
  title,
  mode,
  changeLabel,
  onOpen,
  children,
}: CheckoutStepProps) {
  return (
    <div className="flex flex-col gap-[15px]">
      <StepHeader
        step={step}
        title={title}
        onChange={onOpen}
        changeLabel={changeLabel}
      />
      {children}
    </div>
  );
}
