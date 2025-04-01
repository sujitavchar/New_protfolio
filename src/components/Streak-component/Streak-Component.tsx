import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define Contribution Data Type
type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

// Define Contribution Data Structure
type ContributionData = {
  currentStreak: number;
  totalContributions: number;
  contributionCalendar: ContributionDay[];
  months: string[];
  weekdays: string[];
};

const GitHubStreakTable: React.FC = () => {
  const [githubData, setGithubData] = useState<any>(null);
  const [contributionData, setContributionData] = useState<ContributionData>({
    currentStreak: 0,
    totalContributions: 0,
    contributionCalendar: [],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    weekdays: ["", "Mon", "", "Wed", "", "Fri", ""],
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const username = "sujitavchar";
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!userResponse.ok) throw new Error("GitHub user not found");
        const userData = await userResponse.json();
        setGithubData(userData);

        try {
          const contributionResponse = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}`
          );
          if (!contributionResponse.ok)
            throw new Error("Failed to fetch contributions");
          const contributionData = await contributionResponse.json();

          if (contributionData && contributionData.contributions) {
            processContributionData(contributionData.contributions);
          } else {
            await fetchRecentActivity();
          }
        } catch (err) {
          console.warn("Using fallback GitHub Events API:", err);
          await fetchRecentActivity();
        }
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError("Failed to load GitHub data. Please try again later.");
        setLoading(false);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        const eventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public`
        );
        if (!eventsResponse.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsResponse.json();
        processEventsData(eventsData);
      } catch (err) {
        console.error("Events API Error:", err);
        setError("Unable to fetch recent activity");
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const processEventsData = (events: any[]) => {
    const today = new Date();
    let currentStreak = 0;
    let totalContributions = 0;
    const contributionMap = new Map<string, number>();

    events.forEach((event) => {
      const eventDate = new Date(event.created_at).toISOString().split("T")[0];
      contributionMap.set(
        eventDate,
        (contributionMap.get(eventDate) || 0) + 1
      );
      totalContributions++;
    });

    let checkDate = new Date(today);
    while (contributionMap.has(checkDate.toISOString().split("T")[0])) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    setContributionData((prev) => ({
      ...prev,
      currentStreak,
      totalContributions,
    }));
    setLoading(false);
  };

  const processContributionData = (contributions: any[]) => {
    let currentStreak = 0;
    let totalContributions = 0;

    const filteredContributions = contributions.filter(
      (day) => new Date(day.date).getFullYear() === currentYear
    );
    const contributionCalendar: ContributionDay[] = filteredContributions.map(
      (day) => {
        totalContributions += day.count;
        return {
          date: day.date,
          count: day.count,
          level: Math.min(Math.ceil(day.count / 2), 4),
        };
      }
    );

    for (let i = contributionCalendar.length - 1; i >= 0; i--) {
      if (contributionCalendar[i].count > 0) currentStreak++;
      else break;
    }

    setContributionData((prev) => ({
      ...prev,
      currentStreak,
      totalContributions,
      contributionCalendar,
    }));
    setLoading(false);
  };

  const getContributionColor = (level: number) =>
    [
      "bg-gray-800",
      "bg-teal-900",
      "bg-teal-700",
      "bg-teal-500",
      "bg-teal-300",
    ][level];

  if (loading)
    return <div className="text-center py-6 text-gray-400">Loading...</div>;
  if (error)
    return <div className="text-center text-red-400 py-6">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <div className="relative mt-6">
        <div className="flex">
          <div className="flex flex-col justify-around pr-2 h-32 -mt-5 gap-3">
            {contributionData.weekdays.map((day, index) => (
              <div key={index} className="text-md text-gray-400 h-10">
                {day}
              </div>
            ))}
          </div>

          <div className="flex flex-1 gap-1 overflow-x-auto">
            {contributionData.contributionCalendar.map((day, index) => (
              <motion.div
                key={index}
                className={`h-3 w-3 rounded-sm ${getContributionColor(
                  day.level
                )}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.2 }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStreakTable;
