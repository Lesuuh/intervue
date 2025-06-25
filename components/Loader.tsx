import { Loader as LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center min-h-screen justify-center p-4">
      <LoaderIcon className="h-6 w-6 animate-spin text-black" />
    </div>
  );
};

export default Loader;
