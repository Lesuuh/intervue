import { Phone, Video } from "lucide-react";
import Link from "next/link";

const CreateOptions = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-white border-gray-200 rounded-lg p-5">
        <Link href={"/dashboard/create-interview"}>
          <Video className="p-3 text-primary w-10 h-10 bg-blue-50 rounded-lg" />
          <h2 className="font-bold">Create New Interview</h2>
          <p className="text-gray-500">
            Create AI Interview and schedule then with candidates
          </p>
        </Link>
      </div>
      <div className="bg-white border-gray-200 rounded-lg p-5">
        <Link href={"/dashboard/create-call"}>
          <Phone className="p-3 text-primary w-10 h-10 bg-blue-50 rounded-lg" />
          <h2 className="font-bold">Create Phone Screening Call</h2>
          <p className="text-gray-500">
            Schedule Phone screening call with candidates
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CreateOptions;
