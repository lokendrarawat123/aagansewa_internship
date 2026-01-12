import { MapPin, Layers, Building2, Users, TrendingUp, Activity } from "lucide-react";
import {
  useGetProvinceQuery,
  useGetDistrictQuery,
  useGetBranchQuery,
  useGetManagerQuery,
} from "../redux/features/provinceSlilce";
import { Loading } from "./shared/IsLoading";
import { Error } from "./shared/Error";

const Dashboard = () => {
  // API hooks to get data
  const { data: provinceData, isLoading: provinceLoading } = useGetProvinceQuery();
  const { data: districtData, isLoading: districtLoading } = useGetDistrictQuery();
  const { data: branchData, isLoading: branchLoading } = useGetBranchQuery();
  const { data: managerData, isLoading: managerLoading } = useGetManagerQuery();

  const provinces = provinceData?.provinces || [];
  const districts = districtData?.allDistricts || [];
  const branches = branchData?.branch || [];
  const managers = managerData?.managers || [];

  // Loading state
  if (provinceLoading || districtLoading || branchLoading || managerLoading) {
    return <Loading isLoading={true} />;
  }

  // Statistics cards data
  const stats = [
    {
      title: "Total Provinces",
      value: provinces.length,
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      change: "+2.5%",
      changeType: "increase"
    },
    {
      title: "Total Districts",
      value: districts.length,
      icon: <Layers className="w-8 h-8 text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      change: "+5.2%",
      changeType: "increase"
    },
    {
      title: "Total Branches",
      value: branches.length,
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      change: "+8.1%",
      changeType: "increase"
    },
    {
      title: "Total Managers",
      value: managers.length,
      icon: <Users className="w-8 h-8 text-orange-600" />,
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      change: "+3.7%",
      changeType: "increase"
    }
  ];

  // Recent activities (mock data)
  const recentActivities = [
    {
      id: 1,
      action: "New province added",
      details: "Karnali Province was created",
      time: "2 hours ago",
      type: "province"
    },
    {
      id: 2,
      action: "Manager assigned",
      details: "John Doe assigned to Branch #12",
      time: "4 hours ago",
      type: "manager"
    },
    {
      id: 3,
      action: "District updated",
      details: "Kathmandu district information updated",
      time: "6 hours ago",
      type: "district"
    },
    {
      id: 4,
      action: "New branch created",
      details: "Branch office opened in Pokhara",
      time: "1 day ago",
      type: "branch"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your organization.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Province Overview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-900">Provinces</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{provinces.length}</p>
              <p className="text-sm text-gray-600">
                Managing {districts.length} districts across all provinces
              </p>
            </div>

            {/* District Overview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Layers className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium text-gray-900">Districts</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{districts.length}</p>
              <p className="text-sm text-gray-600">
                Operating {branches.length} branches across districts
              </p>
            </div>

            {/* Branch Overview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Building2 className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-gray-900">Branches</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{branches.length}</p>
              <p className="text-sm text-gray-600">
                {managers.length} managers assigned to branches
              </p>
            </div>

            {/* Manager Overview */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Users className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="font-medium text-gray-900">Managers</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">{managers.length}</p>
              <p className="text-sm text-gray-600">
                Active managers managing operations
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <Activity className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'province' ? 'bg-blue-500' :
                  activity.type === 'district' ? 'bg-green-500' :
                  activity.type === 'branch' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all activities →
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-green-800">System Health</p>
              <p className="text-lg font-semibold text-green-900">Excellent</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-blue-800">Database</p>
              <p className="text-lg font-semibold text-blue-900">Connected</p>
            </div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-yellow-800">Last Backup</p>
              <p className="text-lg font-semibold text-yellow-900">2 hours ago</p>
            </div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;