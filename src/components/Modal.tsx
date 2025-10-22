//@ts-nocheck
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { Button } from "./ui/Button";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}: any) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      //@ts-ignore
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        //@ts-ignore
        className={`bg-white rounded-2xl h-[80vh] overflow-auto shadow-xl flex flex-col w-full ${sizeClasses[size]} mx-4 transform transition-all duration-300 scale-100 ${className}`}
      >
        {title && (
          <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
            <h6 className="text-sm font-semibold text-gray-800">{title}</h6>
            <Button
              onClick={() => onClose()}
              className=""
            >
              <CgClose />
            </Button>
          </div>
        )}

        <div className="p-5 h-full">{children}</div>
      </div>
    </div>
  );
}
