"use client";

import { Select } from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";

export const COLOR_CLASSIFICATIONS = [
  { value: "", label: "Unclassified" },
  { value: "HEART", label: "Heart / Red" },
  { value: "SAP", label: "Sap / Tan" },
  { value: "MIXED", label: "Mixed" },
];

export const BoardColorClassificationSelector = ({
  value,
  boardId,
}: {
  value?: string;
  boardId: string;
}) => {
  return (
    <Select
      defaultValue={value}
      onChange={async (v) => {
        const resp = await createClient().rpc("update_board_classification", {
          board_id: boardId,
          path: ["color"],
          value: v.target.value,
        });
        if (resp.error) {
          console.error(resp.error);
          toast.error("Failed to update classification");
        } else {
          toast.success("Classification updated");
        }
      }}
    >
      {COLOR_CLASSIFICATIONS.map((classification) => (
        <option key={classification.value} value={classification.value}>
          {classification.label}
        </option>
      ))}
    </Select>
  );
};

export const VISIBILITY_CLASSIFICATIONS = [
  { value: "", label: "Unclassified" },
  { value: "CLEAR", label: "Clear" },
  { value: "PARTIAL", label: "Partially occluded by 20%" },
  { value: "FULL", label: "Occluded by 20%+" },
];

export const BoardVisibilityClassificationSelector = ({
  value,
  boardId,
  position,
}: {
  value?: string;
  boardId: string;
  position: "TOP" | "BOTTOM";
}) => {
  return (
    <Select
      defaultValue={value}
      onChange={async (v) => {
        const resp = await createClient().rpc("update_board_classification", {
          board_id: boardId,
          path: [`visibility_${position.toLowerCase()}`],
          value: v.target.value,
        });
        if (resp.error) {
          console.error(resp.error);
          toast.error("Failed to update classification");
        } else {
          toast.success("Classification updated");
        }
      }}
    >
      {VISIBILITY_CLASSIFICATIONS.map((classification) => (
        <option key={classification.value} value={classification.value}>
          {classification.label}
        </option>
      ))}
    </Select>
  );
};
