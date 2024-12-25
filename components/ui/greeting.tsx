"use client";

import { User } from "@supabase/supabase-js";

export const Greeting = ({ user }: { user?: User }) => {
  const date = new Date();

  const personalizedGreeting = user ? `, ${user.user_metadata.first_name}` : "";

  const hour = date.getHours();
  if (hour >= 5 && hour < 12) {
    return `Good morning${personalizedGreeting}`;
  } else if (hour >= 12 && hour < 17) {
    return `Good afternoon${personalizedGreeting}`;
  } else if ((hour >= 17 && hour <= 23) || hour < 5) {
    return `Good evening${personalizedGreeting}`;
  }
};
