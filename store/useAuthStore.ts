import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  // createNewUser: async () => {
  //   const { data, error: userError } = await supabase.auth.getUser();
  //   const user = data?.user;

  //   if (userError || !user) {
  //     toast.error("Error fetching user or user is null");
  //     return;
  //   }

  //   const { data: users, error: fetchError } = await supabase
  //     .from("Users")
  //     .select("*")
  //     .eq("email", user.email);

  //   if (fetchError) {
  //     console.error("Error fetching users:", fetchError);
  //     return;
  //   }

  //   if (users.length === 0) {
  //     const { data: insertedUsers, error: insertError } = await supabase
  //       .from("Users")
  //       .insert({
  //         name: user.user_metadata?.name || "",
  //         username: user.user_metadata?.user_name || "",
  //         email: user.email,
  //         picture: user.user_metadata?.avatar_url || "",
  //       })
  //       .select("*");

  //     if (insertError) {
  //       console.error("Error inserting user:", insertError);
  //     } else {
  //       set({ user: insertedUsers?.[0] });
  //     }
  //   } else {
  //     set({ user: users[0] });
  //   }
  // },
}));
