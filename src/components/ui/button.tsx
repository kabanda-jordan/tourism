"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-dark shadow-sm active:scale-[0.98]",
      secondary:
        "bg-secondary text-white hover:bg-secondary-dark shadow-sm active:scale-[0.98]",
      outline:
        "border-2 border-primary text-primary hover:bg-primary/5 active:scale-[0.98]",
      ghost: "text-body hover:bg-gray-100 hover:text-heading active:scale-[0.98]",
      danger: "bg-error text-white hover:bg-red-700 shadow-sm active:scale-[0.98]",
      accent:
        "bg-accent text-white hover:bg-accent-dark shadow-sm active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-[10px] gap-1.5",
      md: "h-11 px-6 text-sm rounded-[12px] gap-2",
      lg: "h-13 px-8 text-base rounded-[16px] gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
