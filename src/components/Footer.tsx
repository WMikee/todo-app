import { FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  onclearClearCompleted: () => void;
  handleFilterChange: (filter: FilterValue) => void;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filterSelected,
  onclearClearCompleted,
  handleFilterChange,
}) => {
  return (
    <footer>
      <span>
        <strong>{activeCount}</strong>
        task(s) left
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {completedCount > 0 && (
        <button
          className="border rounded-2xl border-purple-900 text-purple-600 hover:border-transparent hover:bg-purple-600  hover:text-white"
          onClick={onclearClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
