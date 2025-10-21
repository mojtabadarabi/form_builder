import React, { useState, useRef, useEffect } from "react";

/**
 * IconMenu Component
 * Props:
 * - icon: ReactNode → The trigger icon (e.g., <MoreVert />)
 * - items: [{ label: ReactNode, onClick?: () => void }] → Menu options
 * - position: "left" | "right" (default: "right")
 * - className: string (optional)
 */
export default function IconMenu({
  icon = "⋮",
  items = [],
  position = "right",
  className = "",
}:any) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle menu
  const toggleMenu = () => setOpen((prev) => !prev);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Trigger button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        type="button"
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 focus:outline-none"
      >
        {typeof icon === "string" ? <span>{icon}</span> : icon}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          ref={menuRef}
          className={`absolute mt-2 w-44 rounded-xl shadow-lg bg-white border border-gray-200 py-1 z-50 animate-fadeIn
            ${position === "right" ? "right-0" : "left-0"}
          `}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
