import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GET_STATS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { Loader2, CheckCircle2, Clock, ClipboardList } from "lucide-react";

export default function Dashboard() {
  const { data, loading, error } = useQuery(GET_STATS);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error.message}
      </div>
    );

  const stats = data?.projectStatistics;
  const tasksByStatus = stats?.tasksByStatus || [];

  const inProgressCount =
    tasksByStatus.find((t: any) => t.status === "IN_PROGRESS")?.count ?? 0;
  const todoCount =
    tasksByStatus.find((t: any) => t.status === "TODO")?.count ?? 0;

  return (
    <div className="p-4">
      {/* Page Title */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Project Management Dashboard
        </h1>
        <p className="text-gray-500">An overview of your projects & tasks</p>
      </header>

      {/* Top Stats */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Projects by Status */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <ClipboardList className="w-5 h-5 text-blue-500" /> Projects by
              Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats?.projectsByStatus?.map((cat: any) => (
              <div
                key={cat.status}
                className="flex justify-between text-sm border-b border-gray-100 pb-1 last:border-none"
              >
                <span className="capitalize text-gray-700">{cat.status}</span>
                <span className="font-medium">{cat.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tasks by Status */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-5 h-5 text-yellow-500" /> Tasks Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">In Progress</span>
              <span className="font-medium">{inProgressCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Pending / TODO</span>
              <span className="font-medium">{todoCount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {stats?.completionRate ?? 0}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3 overflow-hidden">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats?.completionRate ?? 0}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Keep pushing! Almost there.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Detailed Section */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Projects Table */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm">
              Table or list of latest projects can go here...
            </p>
          </CardContent>
        </Card>

        {/* Tasks Progress */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm">
              You can add charts or task breakdown here...
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
