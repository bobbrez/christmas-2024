"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { setBet } from "./actions";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");
  const [betAmount, setBetAmount] = useState<string | number>("");
  const [players, setPlayers] = useState<Tables<"profiles">[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [round, setRound] = useState<number | null>(null);
  const [roundStatus, setRoundStatus] =
    useState<Tables<"rounds">["status"]>("bets_closed");

  useEffect(() => {
    const client = createClient();
    client.auth.getSession().then(({ data }) => {
      const user_id = data?.session?.user.id;
      if (!user_id) {
        toast.error("You need to be logged in to place a bet");
        return;
      }

      client
        .from("profiles")
        .select("*")
        .eq("user_id", user_id)
        .single()
        .then(({ data }) => {
          if (!data?.first_name) {
            return (location.href = "/profile");
          }
        });

      client
        .from("bets_resolved")
        .select("*")
        .eq("user_id", user_id)
        .single()
        .then(({ data }) => {
          setBalance(data?.total_balance ?? 0);
        });
    });

    client
      .from("rounds")
      .select("*")
      .order("id", { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        setRound(data?.id ?? null);
        setRoundStatus(data?.status ?? "bets_closed");
        client
          .from("profiles")
          .select("*")
          .in("user_id", data?.players ?? [])
          .then(({ data }) => setPlayers(data ?? []));
      });

    console.log("subscribing to changes");

    const channelA = client
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload: any) => {
          if (payload.table === "rounds") {
            setRoundStatus(payload.new.status);
            setRound(payload.new.id);
          }
          // setResults((prevResults) => {
          //   const newResults = { ...prevResults };
          //   newResults[payload.new.user_id] = payload.new.value;

          //   return newResults;
          // });
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channelA);
    };
  }, []);

  return (
    <div className="items-center justify-items-center flex w-full flex-col space-y-12 p-4 text-white">
      <p className="text-xl text-center">
        {`Your Balance: `}
        {
          Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          })
            .format(balance)
            .split(".")[0]
        }
      </p>
      <p className="text-xl text-center">
        {`Betting: `}
        {roundStatus}
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <Input
        disabled={roundStatus !== "bets_open"}
        type="number"
        placeholder="How Much?"
        className="text-3xl"
        value={betAmount}
        onChange={(e) => {
          if (e.target.value === "") {
            setBetAmount("");
            setError("");
            return;
          }
          const value = Number(e.target.value);

          if (value < 0) {
            setBetAmount(0);
            setError("You can't bet negative amounts");
            return;
          }

          if (value > balance) {
            setBetAmount(balance);
            setError("You can't bet more than your balance");
            return;
          }

          setBetAmount(value);
        }}
      />
      <p className="text-3xl text-center">Place your Bet</p>
      {players.map((player) => {
        return (
          <button
            disabled={roundStatus !== "bets_open"}
            key={player.user_id}
            onClick={() => {
              if (round === null) {
                setError("No round to bet on");
                return;
              }
              setBet(round, betAmount as number, player.user_id);
              setSelectedPlayer(player.user_id);
            }}
            type="button"
            className={`rounded-2xl ${
              selectedPlayer === player.user_id
                ? "bg-orange-500 hover:bg-orange-400 focus-visible:outline-orange-500"
                : "bg-none hover:bg-indigo-400 focus-visible:outline-indigo-500 outline-indigo-500 outline"
            } px-10 py-6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-5xl disabled:bg-gray-500 disabled:outline-gray-300`}
          >
            {player.first_name}
          </button>
        );
      })}
    </div>
  );
}
