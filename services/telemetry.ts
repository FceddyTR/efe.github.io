import { EventEmitter } from "events";

export interface DamageRecord {
  timestamp: number;
  amount: number;
  resourceCost: number;
}

export interface HealthState {
  current: number;
  max: number;
}

export interface TelemetrySnapshot {
  timestamp: number;
  dps: number;
  crowdControlUptime: number;
  resourcePerDamage: number;
  estimatedTTK?: number;
  estimatedTTD?: number;
}

const WINDOW_MS = 10_000;

export class TelemetryService extends EventEmitter {
  private readonly outgoingDamage: DamageRecord[] = [];
  private readonly incomingDamage: DamageRecord[] = [];
  private ccAccumulatedMs = 0;
  private ccStartedAt?: number;
  private fightStartedAt: number | undefined;
  private targetHealth?: HealthState;
  private playerHealth?: HealthState;

  startFight(timestamp = Date.now()): void {
    this.fightStartedAt = timestamp;
    this.ccAccumulatedMs = 0;
    this.ccStartedAt = undefined;
    this.outgoingDamage.length = 0;
    this.incomingDamage.length = 0;
  }

  setTargetHealthState(state: HealthState): void {
    this.targetHealth = state;
  }

  setPlayerHealthState(state: HealthState): void {
    this.playerHealth = state;
  }

  recordDamage(amount: number, resourceCost = 0, timestamp = Date.now()): void {
    this.ensureFightStarted(timestamp);
    this.outgoingDamage.push({ amount, resourceCost, timestamp });
    this.trimWindow(this.outgoingDamage, timestamp);
    this.publish(timestamp);
  }

  recordIncomingDamage(amount: number, timestamp = Date.now()): void {
    this.ensureFightStarted(timestamp);
    this.incomingDamage.push({ amount, resourceCost: 0, timestamp });
    this.trimWindow(this.incomingDamage, timestamp);
    this.publish(timestamp);
  }

  startCrowdControl(timestamp = Date.now()): void {
    this.ensureFightStarted(timestamp);
    if (this.ccStartedAt === undefined) {
      this.ccStartedAt = timestamp;
    }
  }

  endCrowdControl(timestamp = Date.now()): void {
    if (this.ccStartedAt !== undefined) {
      this.ccAccumulatedMs += timestamp - this.ccStartedAt;
      this.ccStartedAt = undefined;
      this.publish(timestamp);
    }
  }

  private ensureFightStarted(timestamp: number): void {
    if (this.fightStartedAt === undefined) {
      this.fightStartedAt = timestamp;
    }
  }

  private trimWindow(records: DamageRecord[], now: number): void {
    const cutoff = now - WINDOW_MS;
    while (records.length && records[0].timestamp < cutoff) {
      records.shift();
    }
  }

  private computeDps(records: DamageRecord[], now: number): number {
    this.trimWindow(records, now);
    const totalDamage = records.reduce((sum, record) => sum + record.amount, 0);
    return totalDamage / (WINDOW_MS / 1000);
  }

  private computeResourcePerDamage(now: number): number {
    this.trimWindow(this.outgoingDamage, now);
    const totals = this.outgoingDamage.reduce(
      (acc, record) => {
        acc.damage += record.amount;
        acc.resource += record.resourceCost;
        return acc;
      },
      { damage: 0, resource: 0 }
    );
    if (totals.damage === 0) return 0;
    return totals.resource / totals.damage;
  }

  private computeCcUptime(now: number): number {
    if (this.fightStartedAt === undefined) return 0;
    const elapsed = now - this.fightStartedAt;
    const liveCCTime = this.ccStartedAt ? now - this.ccStartedAt : 0;
    const total = this.ccAccumulatedMs + liveCCTime;
    return elapsed > 0 ? total / elapsed : 0;
  }

  private computeTTK(now: number, dps: number): number | undefined {
    if (!this.targetHealth || dps <= 0) return undefined;
    return this.targetHealth.current / dps;
  }

  private computeTTD(now: number, incomingDps: number): number | undefined {
    if (!this.playerHealth || incomingDps <= 0) return undefined;
    return this.playerHealth.current / incomingDps;
  }

  private publish(timestamp = Date.now()): void {
    const dps = this.computeDps(this.outgoingDamage, timestamp);
    const incomingDps = this.computeDps(this.incomingDamage, timestamp);
    const snapshot: TelemetrySnapshot = {
      timestamp,
      dps,
      crowdControlUptime: this.computeCcUptime(timestamp),
      resourcePerDamage: this.computeResourcePerDamage(timestamp),
      estimatedTTK: this.computeTTK(timestamp, dps),
      estimatedTTD: this.computeTTD(timestamp, incomingDps),
    };
    this.emit("snapshot", snapshot);
  }
}
