"use client";

import { supabase } from "@/services/supabase";
import { CircleCheckBig } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const Thankyou = () => {
  const { interview_id } = useParams();
  const [fullName, setFullName] = useState("User");
  const getCandidateName = useCallback(async () => {
    const { data, error } = await supabase
      .from("Candidates")
      .select("fullName")
      .eq("interview_id", interview_id)
      .maybeSingle();

    if (data) {
      setFullName(data.fullName);
    }

    if (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }, [interview_id]);

  useEffect(() => {
    getCandidateName();
  }, []);
  return (
    <section className="bg-blue-50 w-full min-h-screen flex items-center justify-center p-6">
      <main className="flex flex-col justify-center items-center bg-white rounded-lg md:w-4xl p-6">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 ">
          <CircleCheckBig size={40} className="text-green-700" />
        </div>
        <h2 className="text-3xl font-semibold py-2 text-center">
          Thank you, {fullName}
        </h2>
        <p className="text-gray-600 text-center">
          You have completed your interview. We appreciate the time you have
          taken
        </p>
        <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
          <h3 className="font-semibold mb-2">Questions or Concerns?</h3>
          <p className="text-gray-600">
            If you have any questions about your interview or the process,
            please don&apos;t hesitate to contact us at{" "}
            <a
              href="mailto:support@aiinterview.com"
              className="text-blue-600 hover:underline"
            >
              support@aiinterview.com
            </a>
          </p>
        </div>
      </main>
    </section>
  );
};

export default Thankyou;
