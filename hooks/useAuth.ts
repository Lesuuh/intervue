import { supabase } from "@/services/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type LoginVariables = {
  email: string;
  password: string;
};

type LoginResult = {
  user: User | null;
  session: Session | null;
};

type CreateAccountTypes = {
  email: string;
  password: string;
  name: string;
};

export function useAuth() {
  const loginMutation = useMutation<LoginResult, AuthError, LoginVariables>(
    async ({ email, password }: LoginVariables) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return {
        user: data.user,
        session: data.session,
      };
    }
  );

  const createAccountMutation = useMutation<AuthError, CreateAccountTypes>(
    async ({ email, password }: CreateAccountTypes) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    }
  );

  const logoutMutation = useMutation(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  });

  return { loginMutation, createAccountMutation, logoutMutation };
}
