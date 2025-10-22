//@ts-nocheck
export default function SelectInput({
  label = "",
  value = "",
  onChange = (e: any) => {},
  id = "",
  className = "",
  disabled = false,
  error = "",
  required = false,
  options = [],
  placeholder = "Select...",
  ...rest
}) {
  const inputId = id || `select-${Math.random().toString(36).substring(2, 8)}`;
    
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 text-sm opacity-50 font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 mx-1">*</span>}
        </label>
      )}

      <select
        {...rest}
        id={inputId}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`px-3 py-2 rounded-md text-sm border focus:outline-none
          ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"}
          ${error ? "border-red-400" : "border-gray-300"}
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt, i) =>
          typeof opt === "object" ? (
            <option key={opt.value || i} value={opt.value}>
              {opt.label}
            </option>
          ) : (
            <option key={i} value={opt}>
              {opt}
            </option>
          )
        )}
      </select>

      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
}
