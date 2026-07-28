import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "accent" | "outline";
  size?: "sm" | "md";
}

function Badge({
  className,
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-body",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary-dark",
    success: "bg-success/10 text-success",
    danger: "bg-error/10 text-error",
    warning: "bg-warning/10 text-secondary-dark",
    accent: "bg-accent/10 text-accent-dark",
    outline: "border border-gray-200 text-body",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export { Badge, type BadgeProps };
