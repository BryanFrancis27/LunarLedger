function Input({ label, id, className = '', ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1 block text-sm text-gray-300">{label}</span> : null}
      <input
        id={id}
        className={`input-modern ${className}`}
        {...props}
      />
    </label>
  )
}

export default Input
