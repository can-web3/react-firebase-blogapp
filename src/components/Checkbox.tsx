const Checkbox = ({
  name,
  title,
  checked,
  onChange,
  error,
  required = false
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
        className={`w-4 h-4 cursor-pointer accent-orange-600 ${error ? 'border-red-600' : ''}`}
        required={required}
      />

      <label htmlFor={name} className="label cursor-pointer mt-2">
        {title}
      </label>

      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default Checkbox;
