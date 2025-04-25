import DashboardProvider from "./provider";

const DasboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardProvider>{children}</DashboardProvider>
    </div>
  );
};

export default DasboardLayout;
