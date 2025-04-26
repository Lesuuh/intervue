import CreateOptions from "./_components/CreateOptions";
import LatestInterviews from "./_components/LatestInterviews";
// import WelcomeContainer from "./_components/WelcomeContainer";

const Dashboard = () => {
  return (
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviews />
    </div>
  );
};

export default Dashboard;
