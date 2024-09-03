import { cloudstate, invalidate, useCloud } from "freestyle-sh";


@cloudstate
export class CounterCS {
  static id = "counter" as const;
  count = 0;
  NAME = process.env.NAME || "Mit";

  getCount() {
    return {
      count: this.count,
      name: this.NAME
    };
  }

  increment() {
    this.count++;
    invalidate(useCloud<typeof CounterCS>("counter").getCount)
  }

  decrement() {
    this.count--;
    invalidate(useCloud<typeof CounterCS>("counter").getCount)
  }
}
