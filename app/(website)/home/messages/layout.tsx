import getConversations from "@/app/actions/getConversations";
import MessagesList from "@/app/components/messages/MessagesList";
import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <MessagesList initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
