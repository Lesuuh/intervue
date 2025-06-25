const Summary = () => {
  const summaryData = [
    {
      title: "Total Interviews",
      value: 12,
      desc: "+2 this week",
    },
    {
      title: "Upcoming Interviews",
      value: 6,
      desc: "4 expiring soon",
    },
    {
      title: "Completed",
      value: 24,
      desc: "This month",
    },
  ];
  return (
    <div>
      <main className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:flex-row mt-10">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-space-between gap-2 p-6 rounded-lg border-1 bg-white"
          >
            <div>
              <h4 className="font-semibold">{item.title}</h4>
              <h2 className="text-4xl font-semibold">{item.value}</h2>
            </div>
            <div className="text-sm text-gray-500">
              <p
                className={`${
                  item.title === "Total Interviews"
                    ? "text-green-500"
                    : item.title === "Upcoming Interviews"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Summary;
