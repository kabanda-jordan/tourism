"use client";

import { cn } from "@/lib/utils";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

function Dropdown({ trigger, children, align = "right", className }: DropdownProps) {
  return (
    <div className="relative inline-block">
      {trigger}
      <div
        className={cn(
          "absolute top-full mt-2 z-50 min-w-[200px] bg-card rounded-[16px] border border-gray-100 shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
          align === "right" ? "right-0" : "left-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function DropdownItem({
  children,
  onClick,
  className,
  danger = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2",
        danger
          ? "text-error hover:bg-error/5"
          : "text-body hover:bg-gray-50 hover:text-heading",
        className
      )}
    >
      {children}
    </button>
  );
}

export { Dropdown, DropdownItem };
