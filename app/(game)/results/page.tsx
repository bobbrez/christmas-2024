// "use client";

// import { Json } from "@/types/database.types";
// import { createClient } from "@/utils/supabase/client";
// import { useEffect, useState } from "react";

// const ResultsPage = () => {
//   const [dataKeys, setDataKeys] = useState<string[]>([]);
//   const [data, setData] = useState<BarDatum[]>([]);
//   const [results, setResults] = useState<Record<string, Json>>({});

//   useEffect(() => {
//     const supabase = createClient();

//     supabase
//       .from("answers")
//       .select("*")
//       .then((res) => {
//         const newResults = res.data?.reduce((acc, curr) => {
//           acc[curr.user_id] = curr.value;
//           return acc;
//         }, {} as Record<string, Json>);

//         setResults(newResults ?? {});
//       });

//     const channelA = supabase
//       .channel("schema-db-changes")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//         },
//         (payload: any) => {
//           console.log(payload);
//           setResults((prevResults) => {
//             const newResults = { ...prevResults };
//             newResults[payload.new.user_id] = payload.new.value;

//             return newResults;
//           });
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channelA);
//     };
//   }, []);

//   useEffect(() => {
//     const newResults = { YES: 0, NO: 0 } as Record<string, number>;
//     Object.values(results).forEach((key) => {
//       newResults[key as string] = (newResults[key as string] ?? 0) + 1;
//     });
//     setDataKeys(Object.keys(newResults));
//     setData(
//       Object.entries(newResults).map(([key, value]) => ({ id: key, value }))
//     );
//   }, [results]);

//   if (!data.length) return <div>Loading...</div>;

//   return (
//     <div className="w-full">
//       <div className="w-full h-96 mx-auto">
//         <ResponsiveBar
//           data={data}
//           colors={{ scheme: "dark2" }}
//           margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
//           padding={0.3}
//           colorBy="indexValue"
//           role="application"
//           labelTextColor={{
//             theme: "labels.text.fill",
//             modifiers: [["darker", 3]],
//           }}
//           axisBottom={{
//             renderTick: CustomTick,
//           }}
//           tooltip={({ id, value, color }) => (
//             <div
//               style={{
//                 padding: 12,
//                 color,
//                 background: "#222222",
//               }}
//             >
//               {id}: {value}
//             </div>
//           )}
//           ariaLabel="Nivo bar chart demo"
//           barAriaLabel={(e) =>
//             e.id + ": " + e.formattedValue + " in country: " + e.indexValue
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;

const ResultsPage = () => {
  return <div>Results</div>;
};

export default ResultsPage;
