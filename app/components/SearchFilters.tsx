import type { Platform } from "../../data/niches";

type PriceBand = "budget" | "core" | "premium" | "all";

export interface FilterState {
  query: string;
  platform: Platform | "all";
  priceBand: PriceBand;
  minConversion: number;
  sort: "roi" | "conversion" | "trending";
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  availablePlatforms: Platform[];
}

function FilterSelect<T extends keyof FilterState>({
  label,
  name,
  value,
  options,
  onChange
}: {
  label: string;
  name: T;
  value: FilterState[T];
  options: { value: FilterState[T]; label: string }[];
  onChange: (value: FilterState[T]) => void;
}) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <select
        name={name}
        value={value as string}
        onChange={(event) => onChange(event.target.value as FilterState[T])}
      >
        {options.map((option) => (
          <option key={option.value as string} value={option.value as string}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SearchFilters({ filters, onChange, availablePlatforms }: Props) {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="filters-panel" aria-label="Search filters">
      <label className="filter-control search">
        <span>Search focus</span>
        <input
          type="search"
          placeholder="e.g. pet gifts, moon rituals, classroom"
          value={filters.query}
          onChange={(event) => update("query", event.target.value)}
        />
      </label>

      <FilterSelect
        label="Platform bias"
        name="platform"
        value={filters.platform}
        onChange={(value) => update("platform", value)}
        options={[{ value: "all", label: "All" }, ...availablePlatforms.map((platform) => ({ value: platform, label: platform }))]}
      />

      <FilterSelect
        label="Price positioning"
        name="priceBand"
        value={filters.priceBand}
        onChange={(value) => update("priceBand", value)}
        options={[
          { value: "all", label: "Any" },
          { value: "budget", label: "Budget ($10-$20)" },
          { value: "core", label: "Core ($20-$30)" },
          { value: "premium", label: "Premium ($30+)" }
        ]}
      />

      <label className="filter-control">
        <span>Min conversion</span>
        <input
          type="range"
          min={2}
          max={7}
          step={0.1}
          value={filters.minConversion}
          onChange={(event) => update("minConversion", Number(event.target.value))}
        />
        <div className="range-value">{filters.minConversion.toFixed(1)}%</div>
      </label>

      <FilterSelect
        label="Sort by"
        name="sort"
        value={filters.sort}
        onChange={(value) => update("sort", value)}
        options={[
          { value: "roi", label: "Highest ROI Index" },
          { value: "conversion", label: "Conversion Rate" },
          { value: "trending", label: "Trend Velocity" }
        ]}
      />
    </section>
  );
}
