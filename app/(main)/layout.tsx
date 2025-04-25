import DashboardProvider from "./provider";

const DasboardLayout = ({ children }) => {
  return (
    <div>
      <DashboardProvider>
        <div className="p-10 bg-gray-200">{children}</div>
      </DashboardProvider>
    </div>
  );
};

export default DasboardLayout;
