// To create a nested layout to only apply to specific routes in app - add a layout.js file inside the route folder.
import SideNavigation from "@/app/_components/SideNavigation";

// Can then share components with only the page.js files that are contained inside the route folder
export default function NestedLayout({ children }) {
  return (
    // Below JSX will only render under page routes under /account
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      {/* Use the children prop to render nested page.js components under the accounts route */}
      <div className="py-1">{children}</div>
    </div>
  );
}
