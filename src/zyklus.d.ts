declare module 'zyklus' {
  export interface Clock {
    setDuration(fn: (duration: number) => number): void;
    start(): void;
    stop(): void;
    pause(): void;
    duration: number;
  }

  declare global {
    interface AudioContext {
      createClock(p: (time: number, interval: number, count: number) => void, e: number, s?: number, n?: number): Clock;
    }
  }
}
