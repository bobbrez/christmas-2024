"use server";
import { createClient } from "@/utils/supabase/server";

export const setAnswer = async (
  roundId: number,
  userId: string,
  answer: string
) => {
  const supabase = await createClient();
  return await supabase.rpc("upsert_answer", {
    round_id: roundId,
    user_id: userId,
    new_value: answer,
  });
};

export const setBet = async (
  roundId: number,
  amount: number,
  targetId: string
) => {
  const supabase = await createClient();
  const userId = await supabase.auth.getSession().then(({ data }) => {
    return data?.session?.user.id;
  });

  if (!userId) throw new Error("You need to be logged in to place a bet");

  const bet = await supabase
    .rpc("upsert_bet", {
      user_id: userId,
      bet_amount: amount ?? 0,
      round_id: roundId,
      subject_id: targetId,
    })
    .select("*");

  return bet;
};
