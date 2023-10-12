import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileNavbar from "./MobileNavbar";

async function Sidebar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileNavbar currentUser={currentUser!} />
      <main className="lg:pl-56 h-full">{children}</main>
    </div>
  );
}

export default Sidebar;
