import { ArrowLeftIcon } from "lucide-react";
import { useState, type JSX } from "react";
import { useParams, Link } from "react-router";
import { Error } from "../../../error";
import { useGetUser } from "../../../../features/user";
import { Activity, Groups, Header, Overview, Permissions } from "../../../../widgets/user";
import { Loader } from "@/shared/ui";
import { ROUTES } from "../../../../shared/consts/routes";
import clsx from "clsx";

export type TabKey = "overview" | "permissions" | "groups" | "activity";

export function ViewUser() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const { id } = useParams();

  const { data, isPending, error } = useGetUser(id!);

  if (isPending) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error) return <Error title="Failed to get user" message={error.message} />;

  if (!data) return;

  const user = data.data;

  const TABS: Record<TabKey, JSX.Element> = {
    overview: <Overview user={user} />,
    permissions: <Permissions user={user} />,
    groups: <Groups user={user} />,
    activity: <Activity user={user} />,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          to={ROUTES.users.main}
          className={clsx("mr-4 p-1 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors")}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">User Details</h1>
      </div>

      <Header user={user} activeTab={activeTab} id={id} setActiveTab={setActiveTab} />

      <div className="animate-fade-in">{TABS[activeTab]}</div>
    </div>
  );
}
