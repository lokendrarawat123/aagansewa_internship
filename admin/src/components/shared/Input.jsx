const Input = ({
  label,
  type = "text",
  value,
  placeholder,
  id,
  onChange,
  required = false,
  style = "",
  showPreview = true, // Preview on/off garna
}) => {
  if (type === "file") {
    return (
      <div className="flex flex-col text-left w-full">
        {/* label → input → preview sabai yaha */}
        {label && (
          <span className="mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        )}
        <input
          type="file"
          id={id}
          required={required}
          onChange={onChange}
          className="hidden"
        />
        {/* Custom File Input Box */}
        <label
          htmlFor={id}
          className="flex w-full border border-gray-300 rounded-lg overflow-hidden cursor-pointer hover:border-gray-400 transition-colors"
        >
          <div className="bg-gray-200 text-gray-700 px-5 py-3 font-medium whitespace-nowrap">
            Choose File
          </div>
          <div className="px-4 py-3 bg-white text-black w-full truncate flex items-center text-sm">
            {value?.name ? value.name : "No file chosen"}
          </div>
        </label>
        {/* Preview - Input ko thik tala */}
        {showPreview && value && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-1">Preview:</p>
            <img
              src={URL.createObjectURL(value)}
              alt="preview"
              className="w-full max-h-52 object-contain rounded-lg border border-gray-200 bg-gray-50 p-2"
            />
          </div>
        )}
      </div>
    );
  }

  // Normal inputs...
  return (
    <label className="flex flex-col text-left w-full">
      {label && (
        <span className="mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        required={required}
        onChange={onChange}
        className={`border p-3 rounded-lg w-full ${style}`}
        value={value || ""}
      />
    </label>
  );
};

export default Input;
