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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1px] bg-white/10">
  <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md mx-auto">
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-center gap-4">
          <Button text="Cancel" onClick={onCancel} bg_color="neutraly" size="md" />
          <Button text="Confirm" onClick={onConfirm} bg_color="terty" size="md" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
