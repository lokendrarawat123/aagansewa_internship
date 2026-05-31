const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  id,
  disabled,
}) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="px-3 py-1 border z-20 text-black border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
