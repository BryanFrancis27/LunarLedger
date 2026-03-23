function Button({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'btn-modern',
    secondary: 'btn-modern-secondary',
    danger: 'btn-modern-danger',
  }

  return (
    <button
      type={type}
      className={`font-medium transition-all duration-300 ease-in-out ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
