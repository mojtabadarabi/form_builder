import React from "react";

/**
 * Radio component
 * Props:
 * - label: string | ReactNode (optional)
 * - name: string (required — all radios in a group must share the same name)
 * - value: string | number
 * - checked: boolean
 * - onChange: (value: string | number) => void
 * - id: string (optional)
 * - disabled: boolean (optional)
 * - className: string (optional extra Tailwind classes)
 */
export default function Radio({
  label,
  name,
  value,
  checked = false,
  onChange,
  id,
  disabled = false,
  className = "",
}) {
  const inputId = id || `radio-${Math.random().toString(36).substring(2, 8)}`;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <input
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
        className="h-4 w-4 accent-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
