import getConversations from "@/app/actions/getConversations";
import getUsers from "@/app/actions/getUsers";
import MessagesList from "@/app/components/messages/MessagesList";
import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers()
  return (
    <Sidebar>
      <div className="h-full">
        <MessagesList users={users} initialConversations={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
