import { Select } from "./Select";
import { FILTER_OPTIONS } from "../consts";
import { type FilterValue } from "../types";

interface Props {
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange,
}) => {
  // Ahora handleChange recibe el evento de click en un <li>
  const handleChange = (event: React.MouseEvent<HTMLLIElement>) => {
    const value = event.currentTarget.getAttribute("data-value") as FilterValue;
    onFilterChange(value);
  };

  const select_options = Object.entries(FILTER_OPTIONS).map(
    ([key, { literal }]) => ({ key, literal })
  );

  return (
    <div>
      <Select
        options={select_options}
        onChange={handleChange}
        optionSelected={`${filterSelected}`}
      />
    </div>
  );
};
