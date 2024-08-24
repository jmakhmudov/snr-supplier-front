import { useState } from "react";
import RadioButton from "../ui/Buttons/RadioButton"
import { Section } from "@/types";
import CheckboxButton from "../ui/Buttons/CheckboxButton";

interface FilterSectionProps {
  section: Section;
  type: 'radio' | 'checkbox';
}

export default function FilterSection({
  section,
  type,
}: FilterSectionProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    section.options.find(option => option.checked)?.value
  );

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="">
      <div className="font-semibold">{section.title}</div>

      <div className="grid gap-1 mt-2">
        {
          section.options.map((option, idx) => {
            if (type === 'radio') {
              return (
                <RadioButton
                  key={section.name + idx}
                  id={section.name + idx}
                  name={section.name}
                  value={option.value}
                  checked={selectedValue === option.value}
                  onChange={handleRadioChange}
                >{option.icon} {option.label}</RadioButton>
              )
            }
            else if (type === 'checkbox') {
              return (
                <CheckboxButton
                  key={section.name + idx}
                  id={section.name + idx}
                  name={section.name}
                >{option.icon} {option.label}</CheckboxButton>
              )
            }
          })
        }
      </div>
    </div>
  )
}