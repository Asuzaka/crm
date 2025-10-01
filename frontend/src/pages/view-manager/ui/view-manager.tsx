import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router";
import { ManagerHeaderComponent as Header } from "../../../widgets/manager-header";
import { useGetUser } from "../../../features/edit-manager";
import { Error } from "../../error";
import { ManagerOverviewComponent as Overview } from "../../../widgets/manager-overview";
import { ManagerPermissionComponent as Permission } from "../../../widgets/manager-permissions";
import { ManagerGroupComponent as Group } from "../../../widgets/manager-groups";
import { ManagerActivityComponent as Activity } from "../../../widgets/manager-activity";
import { Loader } from "../../../shared/components/loader";

export function ViewManager() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const { id } = useParams();

  const { data, isPending, error } = useGetUser(id!);

  if (isPending) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error)
    return <Error title="Failed to get user" message={error.message} />;

  if (!data) return;

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/managers" className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">
          Manager Details
        </h1>
      </div>

      <Header
        manager={data.data}
        activeTab={activeTab}
        id={id}
        setActiveTab={setActiveTab}
      />

      {activeTab === "overview" && <Overview manager={data.data} />}
      {activeTab === "permissions" && <Permission manager={data.data} />}
      {activeTab === "groups" && <Group manager={data.data} />}
      {activeTab === "activity" && <Activity manager={data.data} />}
    </div>
  );
}
