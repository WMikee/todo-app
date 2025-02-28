import { useState } from "react";

interface SelectOption {
  key: string;
  literal: string;
}

interface SelectProps {
  options: SelectOption[];
  optionSelected: string;
  onChange: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  optionSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="bg-[#1E5CE3] text-white text-left px-4 rounded-3xl flex h-13
          items-center justify-between gap-3 min-w-30"
      >
        {optionSelected}
        <div
          className={`w-5 transition-transform
          ${!isOpen && "rotate-[-90deg]"}`}
        ></div>
      </button>
      {isOpen && (
        <ul className="overflow-hidden absolute mt-2 bg-white text-black rounded-2xl w-40 bottom-20">
          {options.map((option) => (
            <li
              key={option.key}
              data-value={option.key}
              onClick={(e) => {
                onChange(e);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-[#1e5ce3] hover:text-white"
            >
              {option.literal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
