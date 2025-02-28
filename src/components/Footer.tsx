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
  filterSelected,
  handleFilterChange,
}) => {
  return (
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-80 rounded-t-3xl px-4 py-6 bg-[#1F2123] flex items-center gap-6 justify-between">
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      <span className="flex gap-1">
        <strong className="text-[#F63E3E]">{activeCount}</strong>
        task(s) left
      </span>
    </footer>
  );
};
