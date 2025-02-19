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
    <footer className="fixed bottom-1 w-70 rounded-t-2xl p-4 left-1/2 transform -translate-x-1/2 bg-[#1F2123] flex items-center gap-6 justify-between">
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      <span className="flex gap-1">
        <strong className="text-[#F63E3E]">{activeCount}999</strong>
        task(s) left
      </span>
    </footer>
  );
};
