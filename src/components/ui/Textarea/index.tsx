import clsx from "clsx";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default';
  alert?: boolean;
  children?: React.ReactNode;
}

export default function Textarea({
  label,
  icon,
  className,
  variant = 'default',
  alert,
  children,
  ...props
}: TextareaProps) {
  const baseClasses = "px-4 p-2 focus:outline-none text-sm w-full";

  const variantClasses = {
    default: "border border-gray-normal rounded-lg",
  };
  return (
    <div className="w-full">
      <div className="font-medium text-xs mb-1">
        {label}
        {props.required && <span className="text-red-500">*</span>}
      </div>
      <textarea
        {...props}
        data-alert={alert}
        className={clsx(baseClasses, variantClasses[variant], className)}
      />
    </div>
  )
}