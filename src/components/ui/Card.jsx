function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`panel-modern ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4 space-y-1">
          {title ? <h2 className="text-lg font-semibold text-gray-100">{title}</h2> : null}
          {subtitle ? <p className="text-sm text-gray-400">{subtitle}</p> : null}
        </div>
      )}
      {children}
    </section>
  )
}

export default Card
