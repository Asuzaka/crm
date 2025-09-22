import { Outlet } from "react-router";
import { Header } from "../../../../widgets/header";
import { Sidebar } from "../../../../widgets/sidebar";

export function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
