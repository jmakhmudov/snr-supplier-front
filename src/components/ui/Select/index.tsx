import clsx from "clsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SelectProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'underlined';
  alert?: boolean;
  children?: React.ReactNode;
  options: string[];
  editable?: boolean;
}

export default function Select({
  label,
  icon,
  className,
  variant = 'default',
  alert,
  children,
  options,
  editable = true,
  ...inputProps
}: SelectProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [input, setInput] = useState(inputProps.defaultValue || inputProps.value || '');

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setInput(input);

    if (input) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  };

  const handleOptionClick = (option: string) => {
    setInput(option);
    setShowOptions(false);
    
    const mockEvent: ChangeEvent<HTMLInputElement> = {
      target: {
        value: option,
      } as HTMLInputElement
    } as ChangeEvent<HTMLInputElement>;
  
    if (inputProps.onChange) {
      inputProps.onChange(mockEvent);
    }
  };

  const baseClasses = "flex items-center gap-2 text-sm py-2 data-[alert=true]:border-red-500 focus:outline-none cursor-pointer relative";
  const variantClasses = {
    default: "border border-gray-normal rounded-lg px-4",
    underlined: "border-b border-blue",
  };

  return (
    <div className="relative" ref={divRef}>
      <div className="font-medium text-xs mb-1">
        {label}
        {inputProps.required && <span className="text-red-500">*</span>}
      </div>
      <div
        data-alert={alert}
        className={clsx(baseClasses, variantClasses[variant], className)}
        onClick={() => setShowOptions(true)}
      >
        {!children && (
          <input
            {...inputProps}
            className="outline-none w-full"
            onChange={handleSearch}
            value={input}
            onClick={() => setShowOptions(true)}
            readOnly={!editable}
          />
        )}
        <IoIosArrowDown />
      </div>

      {showOptions && (
        <div className="absolute bg-white border border-gray-normal rounded-md shadow-sm w-full divide-y z-50 max-h-[200px] overflow-scroll">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer py-1 hover:bg-gray-light-0 px-4 text-sm"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
