function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="panel-modern w-full max-w-md">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-100">{title}</h3>
          <button type="button" className="text-gray-400 transition-colors hover:text-brand-400" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
