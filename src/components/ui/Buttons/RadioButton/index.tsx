interface RadioButtonProps {
  id: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: React.ReactNode
}

export default function RadioButton({
  id,
  name,
  value,
  checked,
  children,
  onChange
}: RadioButtonProps) {
  return (
    <label htmlFor={id} className="gap-2 flex items-center hover:bg-gray-light hover:bg-opacity-30 cursor-pointer p-1 px-1.5 rounded-md">
      <div
        data-checked={checked}
        className="h-4 aspect-square bg-gray-light data-[checked=true]:bg-purple rounded-full grid place-items-center peer transition-all duration-150"
      >
        <div data-checked={checked} className="h-0 aspect-square rounded-full data-[checked=true]:bg-white data-[checked=true]:h-2 bg-gray-light transition-all duration-200"></div>
      </div>
      <input
        id={id}
        value={value}
        type="radio"
        name={name}
        onChange={() => onChange(value)}
        checked={checked}
        className="hidden"
      />
      <span className="text-sm font-medium cursor-pointer select-none flex items-center gap-1">{children}</span>
    </label>
  )
}