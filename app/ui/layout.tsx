import { fetchTopics } from "../../lib/data";
import ClientLayout from "./client-layout";

export default async function UILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let topics = [];
  
  try {
    // Try to fetch topics from database
    if (process.env.POSTGRES_URL) {
      topics = await fetchTopics();
    } else {
      // Fallback demo topics when database is not configured
      topics = [
        { id: "1", title: "React" },
        { id: "2", title: "Tailwind" },
        { id: "3", title: "TypeScript" },
      ];
    }
  } catch (error) {
    console.error("Error fetching topics:", error);
    // Fallback demo topics on error
    topics = [
      { id: "1", title: "React" },
      { id: "2", title: "Tailwind" },
      { id: "3", title: "TypeScript" },
    ];
  }

  return <ClientLayout topics={topics}>{children}</ClientLayout>;
}