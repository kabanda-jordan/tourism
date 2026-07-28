import { Check, Clock, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  label: string;
  description?: string;
  date?: string;
  status: "completed" | "current" | "upcoming";
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          {/* Icon column */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
                step.status === "completed" && "bg-success text-white",
                step.status === "current" && "bg-primary text-white",
                step.status === "upcoming" && "bg-gray-200 text-muted"
              )}
            >
              {step.status === "completed" && <Check className="w-4 h-4" />}
              {step.status === "current" && <Clock className="w-4 h-4" />}
              {step.status === "upcoming" && <Circle className="w-4 h-4" />}
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-0.5 flex-1 min-h-[40px]",
                  step.status === "completed" ? "bg-success" : "bg-gray-200"
                )}
              />
            )}
          </div>

          {/* Content */}
          <div className="pb-6 pt-1">
            <h4
              className={cn(
                "text-sm font-medium",
                step.status === "upcoming" ? "text-muted" : "text-heading"
              )}
            >
              {step.label}
            </h4>
            {step.description && (
              <p className="text-xs text-muted mt-0.5">{step.description}</p>
            )}
            {step.date && (
              <p className="text-xs text-muted mt-1">{step.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
