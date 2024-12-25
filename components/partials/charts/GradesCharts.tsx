"use client";

import { AxisTickProps } from "@nivo/axes";
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@nivo/core";
import { useEffect, useState } from "react";
import { fetchGradesBarData } from "./actions";

const CustomTick = (tick: AxisTickProps<string>) => {
  const theme = useTheme();

  return (
    <g transform={`translate(${tick.x},${tick.y + 22})`}>
      <line
        style={{
          ...theme.axis.ticks.line,
        }}
        strokeWidth={1.5}
        y1={-22}
        y2={-12}
      />
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          ...theme.axis.ticks.text,
          opacity: 1,
          fill: "rgb(250, 250, 250)",
        }}
      >
        {tick.value}
      </text>
    </g>
  );
};

export const GradesBarChart = () => {
  const [stats, setStats] = useState<{
    keys: string[];
    data: BarDatum[];
  } | null>(null);
  useEffect(() => {
    fetchGradesBarData().then(setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <ResponsiveBar
      data={stats.data}
      colors={{ scheme: "dark2" }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colorBy="indexValue"
      role="application"
      labelTextColor={{ theme: "labels.text.fill", modifiers: [["darker", 3]] }}
      axisBottom={{
        renderTick: CustomTick,
      }}
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 12,
            color,
            background: "#222222",
          }}
        >
          {id}: {value}
        </div>
      )}
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};
