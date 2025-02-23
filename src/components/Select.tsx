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
        >
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              fill="white"
              d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
            ></path>
          </svg>
        </div>
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
