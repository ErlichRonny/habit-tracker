import { createPortal } from "react-dom";

export default function HabitModal({ children, onClose }) {
  return createPortal(
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md relative">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 mb-2"
        >
          ✖
        </button>
      </div>
    </div>,
    document.body
  );
}
