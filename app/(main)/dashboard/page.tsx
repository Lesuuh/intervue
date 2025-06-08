import CreateOptions from "./_components/CreateOptions";
import LatestInterviews from "./_components/LatestInterviews";

const Dashboard = () => {
  return (
    <div>
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviews />
    </div>
  );
};

export default Dashboard;
