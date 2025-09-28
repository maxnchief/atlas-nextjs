import { fetchTopics } from "../../lib/data";
import ClientLayout from "./client-layout";

export default async function UILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const topics = await fetchTopics();

  return <ClientLayout topics={topics}>{children}</ClientLayout>;
}