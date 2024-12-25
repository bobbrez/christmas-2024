"use client";

import React, { useEffect, useState } from "react";
import { ResponsiveSankey } from "@nivo/sankey";
import { SankeyData, getAggBoardData } from "./actions";

export const BandChart = () => {
  const [aggBoardData, setAggBoardData] = useState<SankeyData | null>(null);
  useEffect(() => {
    getAggBoardData().then((data) => setAggBoardData(data));
  }, []);

  if (!aggBoardData)
    return (
      <div className="mx-auto w-full rounded-md border border-gray-800 p-4 shadow">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-2 h-10 rounded bg-gray-700"></div>
                <div className="col-span-4 h-10 rounded bg-gray-700"></div>
                <div className="col-span-3 h-10 rounded bg-gray-700"></div>
                <div className="col-span-1 h-10 rounded bg-gray-700"></div>
              </div>
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-1 h-10 rounded bg-gray-700"></div>
                <div className="col-span-2 h-10 rounded bg-gray-700"></div>
                <div className="col-span-5 h-10 rounded bg-gray-700"></div>
                <div className="col-span-2 h-10 rounded bg-gray-700"></div>
              </div>
              <div className="grid grid-cols-10 gap-4">
                <div className="col-span-2 h-10 rounded bg-gray-700"></div>
                <div className="col-span-3 h-10 rounded bg-gray-700"></div>
                <div className="col-span-2 h-10 rounded bg-gray-700"></div>
                <div className="col-span-3 h-10 rounded bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-72">
      <ResponsiveSankey
        data={aggBoardData}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: "category10" }}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{
          from: "color",
          modifiers: [["brighter", 0.8]],
        }}
        nodeBorderRadius={3}
        linkOpacity={0.5}
        linkBlendMode="lighten"
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 1]],
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: "right-to-left",
            itemsSpacing: 2,
            itemTextColor: "#999",
            symbolSize: 14,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};
