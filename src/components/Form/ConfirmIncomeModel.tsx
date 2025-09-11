import React from "react";
import Button from "../Button/Button";
interface ConfirmIncomeModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmIncomeModal: React.FC<ConfirmIncomeModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-sm z-10">
        <p className="mb-6 text-gray-800">{message}</p>

        <div className="flex justify-end gap-2">
        <Button text="Cancel" onClick={onCancel} bg_color="neutraly" size="md" />
          <Button text="Confirm" onClick={onConfirm} bg_color="terty" size="md" />

        </div>
      </div>
    </div>
  );
};

export default ConfirmIncomeModal;
