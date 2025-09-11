import React from "react";
import Button from "../Button/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <Button text="Cancel" onClick={onCancel} bg_color="neutraly" size="sm" />
          <Button text="Confirm" onClick={onConfirm} bg_color="terty" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
