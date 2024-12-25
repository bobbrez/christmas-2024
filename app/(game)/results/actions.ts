"use server";

export const fetchResults = async () => {
  return {
    keys: ["YES", "NO"],
    data: [
      { id: "YES", value: 0 },
      { id: "NO", value: 0 },
    ],
  };
};
