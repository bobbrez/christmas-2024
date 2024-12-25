"use client";

import { Button } from "@/components/ui/button";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveSankey } from "@nivo/sankey";
import { ResponsiveWaffle } from "@nivo/waffle";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FunnelData, getFunnelData } from "./actions";

// const stepColors = ["#1ca5b2", "#5eb8cb", "#8ec1d7", "#79a3cd", "#5981da"];

const genderColors = ["#5981da", "#8ec1d7"];

const Header = styled.h2`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: #999999;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 100px 200px;
  grid-template-rows: 32px 500px;
  grid-column-gap: 12px;
  grid-row-gap: 1px;
  grid-template-areas:
    "1      gender  age"
    "funnel gender0 age0"
    "funnel gender0 age0"
    "funnel gender0 age0";
`;

const barTheme = {
  axis: {
    ticks: {
      line: {
        stroke: "#444444",
      },
      text: {
        fill: "#999999",
      },
    },
  },
  grid: {
    line: {
      stroke: "#444444",
    },
  },
};

export const FunnelWithClustering = () => {
  const [dataByManuf, setDataByManuf] = useState<FunnelData[] | null>(null);
  const [manufIndex, setManufIndex] = useState(0);
  const currentManuf = dataByManuf?.[manufIndex];

  useEffect(() => {
    getFunnelData().then((data) => setDataByManuf(data));
  }, []);

  if (!currentManuf) return null;

  return (
    <div className="w-full rounded-md bg-zinc-700 px-10 py-5">
      <div className="flex items-center justify-between pb-10">
        {dataByManuf.map((series, index) => (
          <Button
            className="mx-2 w-full"
            key={series.title}
            color={manufIndex === index ? "dark/white" : "dark/zinc"}
            onClick={() => {
              setManufIndex(index);
            }}
          >
            {series.title}
          </Button>
        ))}
      </div>
      <Grid>
        <Header style={{ gridArea: "gender" }}>gender</Header>
        <Header style={{ gridArea: "age" }}>age</Header>
        <div style={{ gridArea: "funnel" }}>
          <ResponsiveSankey
            layout="vertical"
            data={currentManuf.data}
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
            labelOrientation="horizontal"
            labelPadding={16}
            motionConfig="wobbly"
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

        <div style={{ gridArea: `gender${0}` }}>
          <ResponsiveWaffle
            margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
            data={currentManuf.byGender}
            colors={genderColors}
            total={currentManuf.total}
            columns={5}
            rows={50}
            padding={2}
            isInteractive={false}
            motionConfig="wobbly"
            motionStagger={5}
            fillDirection="right"
          />
        </div>
        <div style={{ gridArea: `age${0}` }}>
          <ResponsiveBar
            data={currentManuf.byAge}
            theme={barTheme}
            // colors={[stepColors[0]]}
            enableGridY={false}
            enableGridX={true}
            enableLabel={false}
            padding={0.3}
            // axisTop={barAxisTop}
            // axisBottom={barAxisBottom}
            axisLeft={null}
            isInteractive={false}
            motionConfig="wobbly"
          />
        </div>
      </Grid>
    </div>
  );
};
