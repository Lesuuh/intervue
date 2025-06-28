import { supabase } from "@/services/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

type SignUpPayload = {
  email: string;
  password: string;
};

export function useSignUp() {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpPayload) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpPayload) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { data, error };
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  });
}

export function useCurrentUserSession() {
  return useQuery({
    queryKey: ["currentUserSession"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  });
}

