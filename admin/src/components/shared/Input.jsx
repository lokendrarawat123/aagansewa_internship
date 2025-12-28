const Input = ({
  label,
  type = "text",
  value,
  placeholder,
  id,
  onChange,
  required = false,
}) => {
  return (
    <label className="flex flex-col text-left">
      <span>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        className="border p-2 rounded"
      />
    </label>
  );
};

export default Input;
