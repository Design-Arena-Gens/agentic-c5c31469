import { niches } from "../data/niches";
import { SearchExperience } from "./components/SearchExperience";
import { InsightsPanel } from "./components/InsightsPanel";
import { PlatformInsights } from "./components/PlatformInsights";

export default function Page() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="pill gradient">High-Converting Opportunities</span>
          <h1>Printable Wall Art Conversion Lab</h1>
          <p>
            We reverse-engineered marketplace data, search trends, and social acceleration signals to surface the wall art
            niches built to convert now. Explore opportunity clusters, prioritize launch sequences, and deploy campaigns
            with clarity.
          </p>
          <div className="hero-metrics">
            <div>
              <span className="metric-label">Research Sources</span>
              <strong>48</strong>
              <p>Marketplace analytics, social listening, consumer reports.</p>
            </div>
            <div>
              <span className="metric-label">Refresh cadence</span>
              <strong>Bi-weekly</strong>
              <p>Signals monitored continuously for velocity shifts.</p>
            </div>
            <div>
              <span className="metric-label">Conversion threshold</span>
              <strong>3.5%</strong>
              <p>Only niches exceeding this historical floor make the cut.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="content-grid">
        <div className="primary-column">
          <SearchExperience />
        </div>
        <div className="secondary-column">
          <InsightsPanel niches={niches} />
          <PlatformInsights niches={niches} />
        </div>
      </div>
    </main>
  );
}
