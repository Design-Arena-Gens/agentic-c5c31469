"use client";

import { useMemo, useState } from "react";
import { niches as baseNiches, type Niche, type Platform } from "../../data/niches";
import { SearchFilters, type FilterState } from "./SearchFilters";
import { NicheCard } from "./NicheCard";

const defaultFilters: FilterState = {
  query: "",
  platform: "all",
  priceBand: "all",
  minConversion: 3.5,
  sort: "roi"
};

const uniquePlatforms: Platform[] = Array.from(
  new Set(baseNiches.flatMap((item) => item.platforms))
) as Platform[];

function scoreNiche(niche: Niche) {
  const roi = niche.conversionRate * 4 + niche.avgOrderValue * 0.6 + niche.trendingScore + Math.log10(niche.searchVolume + 1) * 12;
  return roi;
}

function matchesQuery(niche: Niche, query: string) {
  if (!query) return true;
  const normalized = query.trim().toLowerCase();
  const haystack = [
    niche.name,
    niche.description,
    niche.buyerIntent,
    ...niche.demandSignals,
    ...niche.keywords,
    ...niche.marketingAngles
  ]
    .join(" ")
    .toLowerCase();
  return normalized.split(/\s+/).every((chunk) => haystack.includes(chunk));
}

export function SearchExperience() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filtered = useMemo(() => {
    return baseNiches
      .filter((niche) => niche.conversionRate >= filters.minConversion)
      .filter((niche) => (filters.platform === "all" ? true : niche.platforms.includes(filters.platform)))
      .filter((niche) => (filters.priceBand === "all" ? true : niche.priceBand === filters.priceBand))
      .filter((niche) => matchesQuery(niche, filters.query))
      .map((niche) => ({ ...niche, roi: scoreNiche(niche) }))
      .sort((a, b) => {
        if (filters.sort === "conversion") {
          return b.conversionRate - a.conversionRate;
        }
        if (filters.sort === "trending") {
          return b.trendingScore - a.trendingScore;
        }
        return b.roi - a.roi;
      });
  }, [filters]);

  const heroPick = filtered[0];

  return (
    <section className="search-experience">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2>Opportunity Finder</h2>
            <p>
              Slice the research-grade dataset to uncover the printable wall art niches that convert right now across
              major marketplaces.
            </p>
          </div>
          <div className="inventory-meta">
            <span className="pill subtle">{filtered.length} high-potential niches</span>
            <span className="pill subtle">
              Conversion Floor {filters.minConversion.toFixed(1)}%
            </span>
          </div>
        </div>
        <SearchFilters filters={filters} onChange={setFilters} availablePlatforms={uniquePlatforms} />
      </div>

      {heroPick && (
        <div className="hero-highlight">
          <div>
            <span className="pill gradient">Editor Pick</span>
            <h3>{heroPick.name}</h3>
            <p>{heroPick.description}</p>
          </div>
          <div className="hero-metrics">
            <div>
              <span className="metric-label">ROI Index</span>
              <strong>{Math.round(heroPick.roi)}</strong>
            </div>
            <div>
              <span className="metric-label">Conversion</span>
              <strong>{heroPick.conversionRate.toFixed(1)}%</strong>
            </div>
            <div>
              <span className="metric-label">Trend Score</span>
              <strong>{heroPick.trendingScore}</strong>
            </div>
            <div>
              <span className="metric-label">Search Volume</span>
              <strong>{(heroPick.searchVolume / 1000).toFixed(1)}k</strong>
            </div>
          </div>
        </div>
      )}

      <div className="niche-grid">
        {filtered.map((niche) => (
          <NicheCard key={niche.id} niche={niche} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h3>No matches yet</h3>
          <p>Broaden your filters or reduce the minimum conversion rate to reveal more opportunities.</p>
        </div>
      )}
    </section>
  );
}
