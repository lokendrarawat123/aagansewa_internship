import React from "react";
import { useGetManagersQuery } from "../../../../redux/features/branchSlice.js";
import { Loading } from "../../../shared/IsLoading";
import { Error } from "../../../shared/Error";

const BranchManager = () => {
  const { data, isLoading, error } = useGetManagersQuery();
  const managers = data?.managers || [];

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <Error error={error} />;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Branch Managers</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          + Add Manager
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-sm text-center">S.N</th>
              <th className="p-4 font-semibold text-sm">Name</th>
              <th className="p-4 font-semibold text-sm">Email</th>
              <th className="p-4 font-semibold text-sm">Branch (ID)</th>
              <th className="p-4 font-semibold text-sm">Joined Date</th>
              <th className="p-4 font-semibold text-sm text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.length > 0 ? (
              managers.map((m, index) => (
                <tr key={m.user_id} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-800">
                    {m.name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{m.email}</td>
                  <td className="p-4 text-sm">
                    {/* Branch Name ra ID format gareko yaha chha */}
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">
                      {m.branch_name
                        ? `${m.branch_name} (${m.branch_id})`
                        : `Branch ID: ${m.branch_id}`}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(m.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <button className="text-blue-600 hover:underline mr-3 text-sm">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline text-sm">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  No managers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchManager;
