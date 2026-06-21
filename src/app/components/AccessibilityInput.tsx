import { type ComponentProps } from "react";

interface AccessibilityInputProps extends Omit<ComponentProps<"input">, "value" | "onChange" | "type"> {
  id?: string;
  type?: ComponentProps<"input">["type"];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onEnter?: () => void;
  disabled?: boolean;
}

export function AccessibilityInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  onEnter,
  disabled = false,
  ...restProps
}: AccessibilityInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...restProps}
    />
  );
}
