import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'destructive';
}


export default function Badge({
  children,
  variant = 'solid'
}: BadgeProps) {
  const baseClasses = "h-9 px-5 rounded-full font-medium text-sm transition-all duration-150 select-none text-center truncate line-clamp-1";
  const variantClasses = {
    solid: "bg-blue text-white hover:bg-blue-hover disabled:bg-blue-light disabled:text-blue",
    destructive: "bg-white text-purple border-2 border-blue",
  };

  return (
    <div
      // className={clsx(baseClasses, variantClasses[variant])}
      className="text-xs p-1 px-2 rounded-md font-semibold bg-blue-light text-blue"
    >
      {children}
    </div>
  )
}