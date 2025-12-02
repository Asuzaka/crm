import { useMemo } from "react";
import { UserIcon, UsersIcon, DollarSignIcon, TrendingUpIcon, TrendingDownIcon, ClockIcon } from "lucide-react";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { useAuthStore } from "../../../app/providers/store/authStore";
import { useGetAllStats } from "../hooks/use-get-all-stats";
import { Error } from "../../error";
import { Loader } from "@/shared/ui";

export const Dashboard = () => {
  const [moneyQuery, methodsQuery, statsQuery, activityQuery] = useGetAllStats();

  const { currentUser } = useAuthStore();

  const lineChartData = useMemo(
    () => [
      {
        id: "Income",
        color: "hsl(240, 80%, 50%)",
        data:
          moneyQuery.data?.data.map((d) => ({
            x: new Date(2025, d.month - 1).toLocaleString("en-us", {
              month: "short",
            }),
            y: d.income,
          })) ?? [],
      },
      {
        id: "Expenses",
        color: "hsl(0, 80%, 50%)",
        data:
          moneyQuery.data?.data.map((d) => ({
            x: new Date(2025, d.month - 1).toLocaleString("en-us", {
              month: "short",
            }),
            y: d.expense,
          })) ?? [],
      },
    ],
    [moneyQuery.data]
  );

  const barChartData = useMemo(
    () =>
      statsQuery.data?.data.topGroups.map((g) => ({
        name: g.group,
        students: g.studentCount,
      })) ?? [],
    [statsQuery.data]
  );

  const pieChartData = useMemo(
    () =>
      methodsQuery.data?.data.map((m) => ({
        id: m.method,
        label: m.method,
        value: Math.floor(m.percent * 10) / 10,
      })) ?? [],
    [methodsQuery.data]
  );

  if (moneyQuery.isLoading || methodsQuery.isLoading || statsQuery.isLoading || activityQuery.isLoading) {
    return <Loader />;
  }

  if (moneyQuery.isError || methodsQuery.isError || statsQuery.isError || activityQuery.isError) {
    return (
      <Error
        title="Failed to get Stats"
        message={`${moneyQuery.error?.message}  /  ${methodsQuery.error?.message}  /  ${statsQuery.error?.message}  / ${activityQuery.error?.message} `}
      />
    );
  }

  const stats = [
    {
      name: "Total Students",
      value: statsQuery.data?.data.studentsCount ?? 0,
      icon: UserIcon,
      color: "bg-blue-500",
    },
    {
      name: "Active Groups",
      value: statsQuery.data?.data.groupsCount ?? 0,
      icon: UsersIcon,
      color: "bg-green-500",
    },
    {
      name: "Monthly Income",
      value: `$${moneyQuery.data?.data.reduce((acc, m) => acc + m.income, 0) ?? 0}`,
      icon: TrendingUpIcon,
      color: "bg-yellow-500",
    },
    {
      name: "Monthly Expenses",
      value: `$${moneyQuery.data?.data.reduce((acc, m) => acc + m.expense, 0) ?? 0}`,
      icon: TrendingDownIcon,
      color: "bg-red-500",
    },
  ];

  const activityLog = activityQuery.data?.data ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {currentUser?.name}</h1>
        <p className="text-gray-600">Here's an overview of your learning center's performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-3 mr-4`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <DollarSignIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Income vs Expenses</h2>
          </div>
          <div className="h-72">
            <ResponsiveLine
              data={lineChartData}
              margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto" }}
              axisBottom={{ tickRotation: -45 }}
              colors={{ datum: "color" }}
              pointSize={6}
              curve="monotoneX"
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 100,
                  itemWidth: 80,
                  itemHeight: 20,
                },
              ]}
            />
          </div>
        </div>

        {/* Students by Group */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <UsersIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Students by Group</h2>
          </div>
          <div className="h-72">
            <ResponsiveBar
              data={barChartData}
              keys={["students"]}
              indexBy="name"
              margin={{ top: 20, right: 20, bottom: 50, left: 100 }}
              padding={0.3}
              layout="vertical"
              colors={{ scheme: "category10" }}
              axisBottom={{
                legend: "Students",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                legend: "Group",
                legendPosition: "middle",
                legendOffset: -80,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="#fff"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <DollarSignIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Payment Methods</h2>
          </div>
          <div className="h-72">
            <ResponsivePie
              data={pieChartData}
              margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              colors={{ scheme: "set2" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  translateX: 80,
                  itemWidth: 100,
                  itemHeight: 18,
                },
              ]}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-4 max-h-72 overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {activityLog.map((activity) => (
                <li key={activity._id} className="py-3">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.entityType} {activity.actionType.toLocaleLowerCase()}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleString()}</p>
                    </div>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500">by {activity.user?.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
