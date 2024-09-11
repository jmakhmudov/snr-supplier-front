import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
}


export default function Badge({
  children,
  variant = 'default'
}: BadgeProps) {
  const baseClasses = "text-xs p-1 px-2 rounded-md font-semibold ";
  const variantClasses = {
    default: "bg-blue-light text-blue",
    destructive: "bg-red-100 text-red-500",
  };

  return (
    <div
      className={clsx(baseClasses, variantClasses[variant])}
    >
      {children}
    </div>
  )
}