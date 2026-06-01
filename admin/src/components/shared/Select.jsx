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
      className="
    w-full
    h-11
    px-3
    rounded-xl
    border
    border-gray-300
    bg-white
    text-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    disabled:bg-gray-100
    disabled:cursor-not-allowed
  "
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
