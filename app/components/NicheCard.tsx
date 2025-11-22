"use client";

import { useMemo } from "react";
import type { Niche } from "../../data/niches";

interface Props {
  niche: Niche;
}

export function NicheCard({ niche }: Props) {
  const roiScore = useMemo(() => {
    const conversionWeight = niche.conversionRate * 4;
    const orderWeight = niche.avgOrderValue * 0.6;
    const trendWeight = niche.trendingScore;
    const demandWeight = Math.log10(niche.searchVolume + 1) * 12;
    return Math.round(conversionWeight + orderWeight + trendWeight + demandWeight);
  }, [niche]);

  return (
    <article className="niche-card">
      <header>
        <div>
          <h3>{niche.name}</h3>
          <p className="niche-description">{niche.description}</p>
        </div>
        <span className="niche-roi">ROI Index {roiScore}</span>
      </header>

      <section className="niche-metrics">
        <div>
          <span className="metric-label">Conversion</span>
          <strong>{niche.conversionRate.toFixed(1)}%</strong>
        </div>
        <div>
          <span className="metric-label">Avg Order</span>
          <strong>${niche.avgOrderValue}</strong>
        </div>
        <div>
          <span className="metric-label">Trending</span>
          <strong>{niche.trendingScore}</strong>
        </div>
        <div>
          <span className="metric-label">Search Volume</span>
          <strong>{(niche.searchVolume / 1000).toFixed(1)}k</strong>
        </div>
      </section>

      <section className="niche-detail-grid">
        <div>
          <h4>Buyer Intent</h4>
          <p>{niche.buyerIntent}</p>
        </div>
        <div>
          <h4>Demand Signals</h4>
          <ul>
            {niche.demandSignals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Winning Platforms</h4>
          <div className="pill-group">
            {niche.platforms.map((platform) => (
              <span className="pill" key={platform}>
                {platform}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4>Keywords</h4>
          <div className="pill-group">
            {niche.keywords.map((keyword) => (
              <span className="pill subtle" key={keyword}>
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4>Campaign Angles</h4>
          <ul>
            {niche.marketingAngles.map((angle) => (
              <li key={angle}>{angle}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Design Direction</h4>
          <p>{niche.designNotes}</p>
        </div>
      </section>

      <footer className="niche-footer">
        <h4>Launch Assets</h4>
        <ul>
          {niche.contentIdeas.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      </footer>
    </article>
  );
}
