"use client";

import { Button } from "@/components/ui/button";
import { Plus, Video } from "lucide-react";
import React, { useState } from "react";

const LatestInterviews = () => {
  const [interviewList, setInterviewList] = useState([]);
  return (
    <div className="my-5">
      <h2 className="font-bold text-xl">Previously Created Interviews</h2>
      {interviewList.length == 0 && (
        <div className="p-5 rounded-sm flex gap-3 flex-col items-center bg-white mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Button>
            <Plus /> Create New Interview
          </Button>
        </div>
      )}
    </div>
  );
};

export default LatestInterviews;
