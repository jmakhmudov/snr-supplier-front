import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'underlined';
  alert?: boolean;
  children?: React.ReactNode;
}

export default function Input({
  label,
  icon,
  className,
  variant = 'default',
  alert,
  children,
  ...inputProps
}: InputProps) {
  const baseClasses = "flex items-center gap-2 text-sm py-2 data-[alert=true]:border-red-500 focus:outline-none fo";
  const variantClasses = {
    default: "border border-gray-normal rounded-lg px-4",
    underlined: "border-b border-blue",
  };

  return (
    <div>
      <div className="font-medium text-xs mb-1">
        {label}
        {inputProps.required && <span className="text-red-500">*</span>}
      </div>
      <div
        data-alert={alert}
        className={clsx(baseClasses, variantClasses[variant], className)}
      >
        {
          icon &&
          <span
            data-alert={alert}
            className="data-[alert=true]:text-red-500 text-gray-normal"
          >
            {icon}
          </span>
        }
        {!children && <input className="outline-none w-full" {...inputProps} />}
        {children}
      </div>
    </div>
  )
}