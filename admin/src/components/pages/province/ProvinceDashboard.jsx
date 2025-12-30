const ProvinceDashboard = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden ">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Province ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Province Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
              Action
            </th>
          </tr>
        </thead>
        {/* 
        <tbody>
          {provinces?.length > 0 ? (
            provinces.map((province, index) => (
              <tr
                key={province.id || index}
                className="border-b last:border-none hover:bg-slate-50 transition"
              >
                <td className="px-4 py-3 text-sm">{province.id}</td>
                <td className="px-4 py-3 text-sm">{province.name}</td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => onDelete(province.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-6 text-center text-gray-500">
                No provinces found
              </td>
            </tr>
          )}
        </tbody> */}
      </table>
    </div>
  );
};
export default ProvinceDashboard;
