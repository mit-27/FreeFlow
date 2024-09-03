"use client";

import { useCloud } from "freestyle-sh";
import { useState } from "react";
import { CounterCS } from "@/cloudstate/counter";
import { useCloudQuery } from "freestyle-sh/react";

export default function Counter(props: { count: number,name: string }) {
  const counter = useCloud<typeof CounterCS>("counter");
  const { data: myData } = useCloudQuery(counter.getCount);

  const increment = async () => {
    await counter.increment();
  };

  const decrement = async () => {
    await counter.decrement();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <button
        onClick={decrement}
        className="mt-4 p-4 rounded-xl bg-gray-700 transition-all hover:bg-gray-800"
      >
        Decrement
      </button>

      <p className="my-4">Count: <b>{myData?.count ?? props.count}</b></p>
      <p className="my-4">Name: <b>{myData?.name ??props.name}</b></p>

      <button
        onClick={increment}
        className="p-4 rounded-xl bg-gray-700 transition-all hover:bg-gray-800"
      >
        Increment
      </button>
    </div>
  );
}
