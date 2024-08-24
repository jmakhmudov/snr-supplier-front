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
  ...inputProps
}: ButtonProps) {
  const baseClasses = "h-9 px-5 rounded-full font-medium text-sm transition-all duration-150 select-none text-center truncate line-clamp-1";
  const variantClasses = {
    solid: "bg-blue text-white hover:bg-blue-hover disabled:bg-blue-light disabled:text-blue",
    outline: "bg-white text-purple border-2 border-blue",
  };

  return (
    <button
      {...inputProps}
      type={type}
      className={clsx(baseClasses, variantClasses[variant], className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
