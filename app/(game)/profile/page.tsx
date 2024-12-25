"use client";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("");
  return (
    <div className="items-center justify-items-center flex w-full flex-col space-y-12 p-4 text-white">
      <p className="text-xl text-center">Set Your Profile</p>
      <Input
        type="text"
        placeholder="First Name"
        className="text-3xl"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <button
        onClick={async () => {
          const supabase = createClient();
          const userId = await supabase.auth
            .getSession()
            .then(({ data }) => data?.session?.user?.id);
          if (!userId) return;

          const res = await supabase
            .from("profiles")
            .update({ first_name: firstName })
            .eq("user_id", userId);

          console.log(res);

          location.href = "/";
        }}
        type="button"
        className={`rounded-2xl bg-none hover:bg-indigo-400 focus-visible:outline-indigo-500 outline-indigo-500 outline px-10 py-6 font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-5xl disabled:bg-gray-500 disabled:outline-gray-300`}
      >
        Save
      </button>
    </div>
  );
};

export default ProfilePage;
