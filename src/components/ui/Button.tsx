import React from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

/**
 * Reusable Tailwind button component
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex cursor-pointer items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 disabled:bg-gray-100",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 focus:ring-gray-400 disabled:text-gray-400",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400 disabled:text-gray-400",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || loading) && "cursor-not-allowed opacity-75",
        className
      )}
      type={props?.type||'button'}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
