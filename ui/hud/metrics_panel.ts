import { TelemetryService, TelemetrySnapshot } from "../../services/telemetry";

export interface RollingSample {
  timestamp: number;
  value: number;
}

/**
 * Maintains a rolling arithmetic mean over a fixed window.
 * The helper is lightweight enough to live close to the HUD so panels can
 * smooth noisy combat metrics (for instance DPS spikes) with minimal setup.
 */
export class RollingWindowAverager {
  private readonly windowMs: number;
  private readonly samples: RollingSample[] = [];

  constructor(windowMs = 10_000) {
    this.windowMs = windowMs;
  }

  add(value: number, timestamp = Date.now()): void {
    this.samples.push({ timestamp, value });
    this.trim(timestamp);
  }

  getAverage(now = Date.now()): number | undefined {
    this.trim(now);
    if (!this.samples.length) return undefined;
    const total = this.samples.reduce((sum, sample) => sum + sample.value, 0);
    return total / this.samples.length;
  }

  private trim(now: number): void {
    const cutoff = now - this.windowMs;
    while (this.samples.length && this.samples[0].timestamp < cutoff) {
      this.samples.shift();
    }
  }
}

export interface HudIndicators {
  dps: number;
  ttk: number | undefined;
  ttd: number | undefined;
  resourceEfficiency: number;
}

export class MetricsPanel {
  private readonly telemetry: TelemetryService;
  private readonly dpsAverage = new RollingWindowAverager();
  private lastSnapshot?: TelemetrySnapshot;

  constructor(telemetry: TelemetryService) {
    this.telemetry = telemetry;
    this.telemetry.on("snapshot", (snapshot) => this.ingest(snapshot));
  }

  private ingest(snapshot: TelemetrySnapshot): void {
    this.lastSnapshot = snapshot;
    this.dpsAverage.add(snapshot.dps, snapshot.timestamp);
  }

  /**
   * Returns the most recent HUD-facing indicators with smoothed DPS and raw
   * survivability estimates. Undefined values indicate insufficient data
   * (for instance when no incoming damage has been seen yet).
   */
  getIndicators(now = Date.now()): HudIndicators | undefined {
    if (!this.lastSnapshot) return undefined;

    return {
      dps: this.dpsAverage.getAverage(now) ?? this.lastSnapshot.dps,
      ttk: this.lastSnapshot.estimatedTTK,
      ttd: this.lastSnapshot.estimatedTTD,
      resourceEfficiency: this.lastSnapshot.resourcePerDamage,
    };
  }
}
