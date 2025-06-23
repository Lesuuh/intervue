import RecentInterviews from "./_components/RecentInterviews";
import Summary from "./_components/Summary";
import WelcomeContainer from "./_components/WelcomeContainer";

const Dashboard = () => {
  return (
    <div className="space-y-10">
      <WelcomeContainer />
      <RecentInterviews />
      <Summary />
    </div>
  );
};

export default Dashboard;
