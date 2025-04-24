"use client";

import { UserDetailsContext } from "@/context/UserDetailsContext";
import { supabase } from "@/services/supabase";
import { useContext, useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const createNewUser = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Error fetching user or user is null:", userError);
      return;
    }

    const { data: Users, error: fetchError } = await supabase
      .from("Users")
      .select("*")
      .eq("email", user.email);

    if (fetchError) {
      console.error("Error fetching users:", fetchError);
      return;
    }

    if (Users.length === 0) {
      const { data, error: insertError } = await supabase.from("Users").insert({
        name: user.user_metadata?.name || "",
        email: user.email,
        picture: user.user_metadata?.picture || "",
      });

      if (insertError) {
        console.error("Error inserting user:", insertError);
      } else {
        console.log("User inserted:", data);
        setUser(data);
      }
    } else {
      console.log("User already exists:", Users);
      setUser(Users[0]);
    }
  };

  useEffect(() => {
    console.log("hello");
    createNewUser();
  }, []);

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailsContext.Provider>
  );
};

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailsContext);
  return context;
};
