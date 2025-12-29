import React, { useState } from "react";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [provinces, setProvinces] = useState([
    { id: 1, name: " karnali", districts: [" surkhet", "salyan "] },
    { id: 2, name: " lumbini", districts: [" banke", "bardiya"] },
  ]);

  const [selectedProvince, setSelectedProvince] = useState(null);
  const [newProvince, setNewProvince] = useState("");
  const [newDistrict, setNewDistrict] = useState("");

  // Add Province
  const handleAddProvince = () => {
    if (!newProvince.trim()) return;
    const nextId = provinces.length
      ? provinces[provinces.length - 1].id + 1
      : 1;
    setProvinces([
      ...provinces,
      { id: nextId, name: newProvince, districts: [] },
    ]);
    setNewProvince("");
  };

  // Delete Province
  const handleDeleteProvince = (id) => {
    setProvinces(provinces.filter((p) => p.id !== id));
    if (selectedProvince?.id === id) setSelectedProvince(null);
  };

  // Add District
  const handleAddDistrict = () => {
    if (!newDistrict.trim() || !selectedProvince) return;
    setProvinces(
      provinces.map((p) =>
        p.id === selectedProvince.id
          ? { ...p, districts: [...p.districts, newDistrict] }
          : p
      )
    );
    setNewDistrict("");
  };

  // Delete District
  const handleDeleteDistrict = (districtName) => {
    setProvinces(
      provinces.map((p) =>
        p.id === selectedProvince.id
          ? { ...p, districts: p.districts.filter((d) => d !== districtName) }
          : p
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="text-2xl font-bold p-6 border-b">Admin Panel</div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setCurrentPage("dashboard")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage("province")}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
              >
                Province Management
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {currentPage === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Welcome Admin</h1>
            <p className="text-gray-700">
              Use the sidebar to manage provinces and districts.
            </p>
          </div>
        )}

        {currentPage === "province" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Province Management</h1>

            {/* Add Province */}
            <div className="flex mb-6 gap-2">
              <input
                type="text"
                placeholder="New Province Name"
                value={newProvince}
                onChange={(e) => setNewProvince(e.target.value)}
                className="border rounded px-3 py-1 flex-1"
              />
              <button
                onClick={handleAddProvince}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
              >
                Add Province
              </button>
            </div>

            {/* Province Table */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Provinces</h2>
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3 border-b">#</th>
                    <th className="p-3 border-b">Province Name</th>
                    <th className="p-3 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {provinces.map((province, index) => (
                    <tr
                      key={province.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedProvince(province)}
                    >
                      <td className="p-3 border-b">{index + 1}</td>
                      <td className="p-3 border-b">{province.name}</td>
                      <td className="p-3 border-b">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProvince(province.id);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {provinces.length === 0 && (
                    <tr>
                      <td colSpan="3" className="p-3 text-center text-gray-500">
                        No provinces found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* District Management */}
            {selectedProvince && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Districts in {selectedProvince.name}
                </h2>

                {/* Add District */}
                <div className="flex mb-4 gap-2">
                  <input
                    type="text"
                    placeholder="New District Name"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="border rounded px-3 py-1 flex-1"
                  />
                  <button
                    onClick={handleAddDistrict}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
                  >
                    Add District
                  </button>
                </div>

                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="p-3 border-b">#</th>
                      <th className="p-3 border-b">District Name</th>
                      <th className="p-3 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProvince.districts.map((district, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-3 border-b">{index + 1}</td>
                        <td className="p-3 border-b">{district}</td>
                        <td className="p-3 border-b">
                          <button
                            onClick={() => handleDeleteDistrict(district)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {selectedProvince.districts.length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          className="p-3 text-center text-gray-500"
                        >
                          No districts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
