import type { Niche, Platform } from "../../data/niches";

function aggregateByPlatform(niches: Niche[]) {
  const accumulator = new Map<Platform, { count: number; conversion: number; trend: number; volume: number }>();

  niches.forEach((niche) => {
    niche.platforms.forEach((platform) => {
      const current = accumulator.get(platform) ?? { count: 0, conversion: 0, trend: 0, volume: 0 };
      current.count += 1;
      current.conversion += niche.conversionRate;
      current.trend += niche.trendingScore;
      current.volume += niche.searchVolume / niche.platforms.length;
      accumulator.set(platform, current as any);
    });
  });

  return Array.from(accumulator.entries())
    .map(([platform, value]) => ({
      platform,
      avgConversion: value.conversion / value.count,
      avgTrend: value.trend / value.count,
      weightedVolume: value.volume
    }))
    .sort((a, b) => b.weightedVolume - a.weightedVolume);
}

interface Props {
  niches: Niche[];
}

export function PlatformInsights({ niches }: Props) {
  const platformMetrics = aggregateByPlatform(niches);
  const totalVolume = platformMetrics.reduce((acc, item) => acc + item.weightedVolume, 0);

  return (
    <section className="platform-insights">
      <header>
        <h3>Marketplace Conversion Pulse</h3>
        <p>Demand-weighted forecast across prioritized distribution channels.</p>
      </header>
      <div className="platform-grid">
        {platformMetrics.map((platform) => {
          const share = (platform.weightedVolume / totalVolume) * 100;
          return (
            <article key={platform.platform} className="platform-card">
              <header>
                <span className="pill subtle">{platform.platform}</span>
                <span className="share">{share.toFixed(1)}% share</span>
              </header>
              <div className="platform-metrics">
                <div>
                  <span className="metric-label">Avg Conversion</span>
                  <strong>{platform.avgConversion.toFixed(1)}%</strong>
                </div>
                <div>
                  <span className="metric-label">Trend Velocity</span>
                  <strong>{platform.avgTrend.toFixed(0)}</strong>
                </div>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${Math.min(100, share)}%` }} />
              </div>
              <p>Run fresh creative every {Math.max(9, Math.round(45 - platform.avgTrend / 2))} days to stay top of feed.</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
