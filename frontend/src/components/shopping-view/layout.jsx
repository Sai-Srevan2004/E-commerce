import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white w-screen">
      {/* Sticky header */}
      <ShoppingHeader />

      {/* Scrollable content area */}
      <main className="flex-1 w-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}


export default ShoppingLayout;