import { Loader as LoaderIcon } from "lucide-react";

const Loader = ({ className }: { className: string }) => {
  return (
    <div className="flex items-center justify-center">
      <LoaderIcon className={`h-6 w-6 animate-spin text-black ${className}`} />
    </div>
  );
};

export default Loader;
