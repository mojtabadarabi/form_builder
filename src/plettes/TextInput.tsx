//@ts-nocheck
export default function TextInput({
    label = "",
    value = "",
    onChange = (e:any) => { },
    id = "",
    placeholder = "",
    type = "text",
    disabled = false,
    className = "",
    error = "",
    required = false,
    ...rest
}) {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 8)}`;

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
            <input
                {...rest}
                id={inputId}
                type={type}
                value={value}
                {...(value!==null?{value}:{})}
                {...(type == 'checkbox' ? { checked: value } : {})}
                placeholder={placeholder}
                disabled={disabled}
                //@ts-ignore
                onChange={(e) => onChange?.(type == 'checkbox' ? e?.target?.checked : e.target.value)}
                className={`px-3 py-2  rounded-md text-sm
          focus:outline-none border
          ${disabled ? "bg-gray-100 " : "bg-white"}
          ${error ? "border-red-400" : "border-gray-300"}
        `}
            />

            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
}
