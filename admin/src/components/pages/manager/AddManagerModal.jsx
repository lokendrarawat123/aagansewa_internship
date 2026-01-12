{
  /* Add Manager Modal */
}
<DetailsModal
  show={showAddModal}
  onClose={closeAddModal}
  title="Add New Manager"
  size="md"
>
  <form onSubmit={handleAddSubmit} className="space-y-4">
    {/* FIRST: Province Selection */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Province
      </label>
      <select
        id="province_id"
        value={formData.province_id}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Province</option>
        {provinces?.map((province) => (
          <option key={province.province_id} value={province.province_id}>
            {province.province_name}
          </option>
        ))}
      </select>
    </div>

    {/* SECOND: District Selection */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        District
      </label>
      <select
        id="district_id"
        value={formData.district_id}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={!formData.province_id}
      >
        <option value="">
          {!formData.province_id ? "Select Province First" : "Select District"}
        </option>
        {filteredDistricts?.map((district) => (
          <option key={district.district_id} value={district.district_id}>
            {district.district_name}
          </option>
        ))}
      </select>
    </div>

    {/* THIRD: Branch Selection */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Branch
      </label>
      <select
        id="branch_id"
        value={formData.branch_id}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={!formData.district_id}
      >
        <option value="">
          {!formData.district_id ? "Select District First" : "Select Branch"}
        </option>
        {filteredBranches?.map((branch) => (
          <option key={branch.branch_id} value={branch.branch_id}>
            {branch.branch_name}
          </option>
        ))}
      </select>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Manager Details
      </h3>
    </div>

    {/* FOURTH: Manager Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Manager Name
      </label>
      <Input
        type="text"
        id="name"
        placeholder="Enter manager name"
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    {/* FIFTH: Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email
      </label>
      <Input
        type="email"
        id="email"
        placeholder="Enter email address"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    {/* SIXTH: Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password
      </label>
      <Input
        type="password"
        id="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex justify-end gap-3 pt-4">
      <button
        type="button"
        onClick={closeAddModal}
        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Add Manager
      </button>
    </div>
  </form>
</DetailsModal>;
