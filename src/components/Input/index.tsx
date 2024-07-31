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
  const baseClasses = "flex items-center gap-2 text-sm py-3 data-[alert=true]:border-red-500 focus:outline-none";
  const variantClasses = {
    default: "border border-gray-normal",
    underlined: "border-b border-blue",
  };

  return (
    <div>
      <div className="font-medium text-xs">{label}</div>
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
        {!children && <input className="outline-none" {...inputProps} />}
        {children}
      </div>
    </div>
  )
}