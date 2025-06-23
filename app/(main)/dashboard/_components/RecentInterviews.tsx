import { Clock, Dot, Share } from "lucide-react";

const RecentInterviews = () => {
  const recentInterviews = [
    {
      title: "Junior Software Engineer",
      duration: "30 min",
      createdAt: "Jun 22, 2025",
      timeLeft: "6d 23h",
    },
    {
      title: "Frontend Developer Intern",
      duration: "45 min",
      createdAt: "Jun 18, 2025",
      timeLeft: "3d 12h",
    },
    {
      title: "Backend Engineer",
      duration: "60 min",
      createdAt: "Jun 15, 2025",
      timeLeft: "1d 4h",
    },
  ];

  return (
    <main className="flex flex-col gap-4 p-4 bg-white rounded ">
      <h3 className="text-[1.3rem] font-normal">Recent Interviews</h3>
      {recentInterviews.map((interview, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 rounded border"
        >
          <div>
            <h4 className="font-semibold">{interview.title}</h4>
            <div className="flex items-center gap-4 text-sm">
              <p>{interview.duration}</p>
              <Dot />
              <p>Created {interview.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} /> {interview.timeLeft}{" "}
            <Share size={16} className="ml-1" />
          </div>
        </div>
      ))}
    </main>
  );
};

export default RecentInterviews;
