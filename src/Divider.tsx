export default function Divider({ orientation = "horizontal", className = "", children = null }) {
    if (orientation === "vertical") {
        return <div className={`h-full w-px bg-gray-300 ${className}`} />;
    }

    return (
        <div className={`relative flex items-center ${className}`}>
            <div className="flex-grow border-t border-gray-300" />
            {children && (
                <span className="mx-3 text-gray-500 text-sm whitespace-nowrap">{children}</span>
            )}
            <div className="flex-grow border-t border-gray-300" />
        </div>
    );
}
