export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = "확인",
  cancelText = "취소",
}) {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            {cancelText}
          </button>
          <button className="btn btn-error" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop" onClick={onClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}
