
/**
 * Checkbox component
 * Props:
 * - label: string | ReactNode (optional)
 * - checked: boolean
 * - onChange: (checked: boolean) => void
 * - id: string (optional, for accessibility)
 * - disabled: boolean (optional)
 * - className: string (optional extra Tailwind classes)
 */
export default function Checkbox({
    label,
    checked = false,
    onChange,
    id,
    disabled = false,
    className = "",
}) {
    const inputId = id || `checkbox-${Math.random().toString(36).substring(2, 8)}`;

    return (
        <label
            htmlFor={inputId}
            className={`inline-flex items-center gap-2 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${className}`}
        >
            <input
                id={inputId}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange?.(e.target.checked)}
                className="h-4 w-4 accent-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            {label && <span className="text-sm text-gray-700">{label}</span>}
        </label>
    );
}
