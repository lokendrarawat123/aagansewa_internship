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
    <label className="flex flex-col text-left w-full">
      {label && (
        <span>
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
        className="border p-2 rounded w-full"
        {...(type !== "file" ? { value } : {})}
      />
    </label>
  );
};

export default Input;
