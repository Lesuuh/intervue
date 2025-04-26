import DashboardProvider from "./provider";

const DasboardLayout = ({ children }) => {
  return (
    <div className="w-full mx-auto max-w-[100rem]">
      <DashboardProvider>
        <div className="px-10 bg-gray-200">{children}</div>
      </DashboardProvider>
    </div>
  );
};

export default DasboardLayout;
