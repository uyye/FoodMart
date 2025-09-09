export default function CancelButton({ children, onClose }) {
  return (
    <button onClick={onClose} className="cancel-button">
      <span>{children}</span>
    </button>
  );
}
