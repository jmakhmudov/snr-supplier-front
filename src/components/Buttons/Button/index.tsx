import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'solid',
  type = 'button',
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const baseClasses = "h-9 px-4 rounded-md w-full font-medium text-sm transition-all duration-150 select-none disabled:bg-gray-light disabled:text-gray-normal truncate line-clamp-1";
  const variantClasses = {
    solid: "bg-purple text-white hover:bg-purple-hover",
    outline: "bg-white text-purple border-2 border-purple",
  };

  return (
    <button
      {...rest}
      type={type}
      className={clsx(baseClasses, variantClasses[variant], className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
