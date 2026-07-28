"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 rounded-md border-2 border-gray-300 transition-all peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20">
            <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 absolute top-0.5 left-0.5" />
          </div>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm text-body cursor-pointer select-none pt-0.5"
          >
            {label}
          </label>
        )}
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
