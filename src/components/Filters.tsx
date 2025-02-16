import { FILTERS_BUTTONS } from "../consts";
import { type FilterValue } from "../types";

interface Props {
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange,
}) => {
  const handleClick =
    (filter: FilterValue) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onFilterChange(filter);
    };
  return (
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => (
        <li key={key}>
          <a
            className={key === filterSelected ? "selected" : ""}
            href={href}
            onClick={handleClick(key as FilterValue)}
          >
            {literal}
          </a>
        </li>
      ))}
    </ul>
  );
};
