"use server";

import { Database } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export type SankeyData = {
  nodes: { id: string; nodeColor: string }[];
  links: { source: string; target: string; value: number }[];
};

export const getAggBoardData = async (): Promise<SankeyData> => {
  const supabase = await createClient();
  const [data, error]: [
    Database["public"]["Functions"]["get_board_aggs"]["Returns"],
    PostgrestError | null,
  ] = await supabase
    .rpc("get_board_aggs")
    .then(({ data, error }) => [data ?? [], error]);
  if (error) throw error;

  const links = [] as SankeyData["links"];

  data.forEach((datum) => {
    const manToColIdx = links.findIndex(
      (link) =>
        link.source === datum.manufacturer && link.target === datum.color,
    );

    if (manToColIdx > -1) {
      console.log(links[manToColIdx]);
      links[manToColIdx].value += datum.total;
    } else {
      links.push({
        source: datum.manufacturer,
        target: datum.color,
        value: datum.total,
      });
    }

    const qual =
      datum.visibility_bottom === "FULL" || datum.visibility_top === "FULL"
        ? "OCCLUDED"
        : datum.visibility_bottom === "PARTIAL" ||
            datum.visibility_top === "PARTIAL"
          ? "PARTIAL"
          : "VIABLE";

    const colToQualIdx = links.findIndex(
      (link) => link.source === datum.color && link.target === qual,
    );

    if (colToQualIdx > -1) {
      links[colToQualIdx].value += datum.total;
    } else {
      links.push({
        source: datum.color,
        target: qual,
        value: datum.total,
      });
    }
  });

  return {
    nodes: [
      {
        id: "HRC",
        nodeColor: "hsl(9, 70%, 50%)",
      },
      {
        id: "CONRAD",
        nodeColor: "hsl(178, 70%, 50%)",
      },
      {
        id: "HEART",
        nodeColor: "hsl(9, 70%, 50%)",
      },
      {
        id: "MIXED",
        nodeColor: "hsl(24, 70%, 50%)",
      },
      {
        id: "SAP",
        nodeColor: "hsl(47, 70%, 50%)",
      },
      {
        id: "VIABLE",
        nodeColor: "hsl(184, 70%, 50%)",
      },
      {
        id: "PARTIAL",
        nodeColor: "hsl(184, 70%, 50%)",
      },
      {
        id: "OCCLUDED",
        nodeColor: "hsl(184, 70%, 50%)",
      },
    ],
    links,
  };
};

export type FunnelData = {
  title: string;
  total: number;
  data: SankeyData;
  byGender: { label: string; id: string; value: number }[];
  byAge: { id: string; value: number }[];
};

export const getFunnelData = async (): Promise<FunnelData[]> => {
  const data = await getAggBoardData();

  const manufacturers: Record<string, FunnelData> = {
    Both: {
      title: "Both",
      total: 30,
      data,
      byGender: [
        {
          label: "MALE",
          id: "male",
          value: 10,
        },
        {
          label: "FEMALE",
          id: "female",
          value: 20,
        },
      ],
      byAge: [
        {
          id: "0-18",
          value: 5,
        },
        {
          id: "19-35",
          value: 10,
        },
        {
          id: "36-50",
          value: 10,
        },
        {
          id: "51+",
          value: 5,
        },
      ],
    },
  };

  return Object.values(manufacturers);
};

export const fetchGradesBarData = async () => {
  const supabase = await createClient();
  return supabase.rpc("board_grade_stats").then(({ data }) => ({
    keys: (data ?? []).map((datum) => datum.score),
    data: (data ?? [])
      .map((datum) => ({
        id: datum.score,
        weight: datum.weight,
        value: datum.count,
      }))
      .sort((a, b) => a.weight - b.weight),
  }));
};
