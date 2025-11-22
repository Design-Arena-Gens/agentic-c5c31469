import type { Niche } from "../../data/niches";

interface Props {
  niches: Niche[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function InsightsPanel({ niches }: Props) {
  const avgConversion = niches.reduce((acc, niche) => acc + niche.conversionRate, 0) / niches.length;
  const avgOrder = niches.reduce((acc, niche) => acc + niche.avgOrderValue, 0) / niches.length;
  const avgTrend = niches.reduce((acc, niche) => acc + niche.trendingScore, 0) / niches.length;
  const totalVolume = niches.reduce((acc, niche) => acc + niche.searchVolume, 0);

  const bestTrend = niches.slice().sort((a, b) => b.trendingScore - a.trendingScore)[0];
  const strongestConversion = niches.slice().sort((a, b) => b.conversionRate - a.conversionRate)[0];
  const bestValue = niches
    .slice()
    .sort((a, b) => b.avgOrderValue * b.conversionRate - a.avgOrderValue * a.conversionRate)[0];

  return (
    <aside className="insight-panel">
      <header>
        <span className="pill gradient">Deep Research Synthesis</span>
        <h2>Conversion Intelligence</h2>
        <p>
          Macro signals across the curated opportunity set. Use these guardrails to tailor product bundles, messaging,
          and growth experiments.
        </p>
      </header>

      <section className="insight-metric-grid">
        <div>
          <span className="metric-label">Avg Conversion Rate</span>
          <strong>{avgConversion.toFixed(1)}%</strong>
          <p>Benchmark your offer pages above this mark to stay competitive.</p>
        </div>
        <div>
          <span className="metric-label">Avg Order Value</span>
          <strong>{formatCurrency(avgOrder)}</strong>
          <p>Bundle strategy should aim for {formatCurrency(avgOrder + 8)} perceived value.</p>
        </div>
        <div>
          <span className="metric-label">Trend Velocity</span>
          <strong>{avgTrend.toFixed(0)}</strong>
          <p>Maintain social proof rotation every 12 days to ride the demand curve.</p>
        </div>
        <div>
          <span className="metric-label">Monthly Search Demand</span>
          <strong>{(totalVolume / 1000).toFixed(1)}k</strong>
          <p>Allocate ad spend proportional to the platform share below.</p>
        </div>
      </section>

      <section className="insight-spotlight">
        <h3>Category Spotlights</h3>
        <ul>
          <li>
            <strong>{bestTrend.name}</strong> is pacing the trendline with score {bestTrend.trendingScore}. Launch seasonal variants
            now and pitch to Pinterest creators for rapid reach.
          </li>
          <li>
            <strong>{strongestConversion.name}</strong> holds the conversion crown at {strongestConversion.conversionRate.toFixed(1)}%. Study
            its onboarding flow and personalization hooks.
          </li>
          <li>
            <strong>{bestValue.name}</strong> yields the highest revenue density. Offer tiered bundles at
            {formatCurrency(bestValue.avgOrderValue + 10)} anchor price.
          </li>
        </ul>
      </section>

      <section className="insight-tactics">
        <h3>Activation Playbook</h3>
        <ul>
          <li>Launch <strong>tripwire bundles</strong> with immediate upsell to editable Canva templates.</li>
          <li>Deploy <strong>platform-native video ads</strong> showcasing print-to-wall styling moments.</li>
          <li>Use <strong>community UGC challenges</strong> (before & after wall transformations) to compound social proof.</li>
          <li>Automate <strong>post-purchase review requests</strong> 5 days after delivery with staged incentives.</li>
        </ul>
      </section>
    </aside>
  );
}
