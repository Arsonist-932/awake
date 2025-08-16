import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ModalFormProps {
  // Props de base
  title: string;
  isOpen: boolean;
  onClose: () => void;

  // Props pour le contenu
  children: ReactNode;

  // Props pour les actions
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  showCancelButton?: boolean;
  showSubmitButton?: boolean;

  // Props de style
  maxWidth?: string;
  className?: string;

  // Props pour la validation
  isSubmitting?: boolean;
  isValid?: boolean;
}

const ModalForm = ({
  title,
  isOpen,
  onClose,
  children,
  onSubmit,
  submitLabel = "Enregistrer",
  cancelLabel = "Annuler",
  showCancelButton = true,
  showSubmitButton = true,
  maxWidth = "max-w-lg",
  className = "",
  isSubmitting = false,
  isValid = true,
}: ModalFormProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && isValid && !isSubmitting) {
      onSubmit();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`flex max-h-[90vh] w-full ${maxWidth} flex-col gap-5 overflow-y-auto rounded-xl bg-white p-6 dark:bg-black ${className}`}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
          <div className="">{children}</div>

          {/* Actions */}
          {(showCancelButton || showSubmitButton) && (
            <div className="flex space-x-3 border-t pt-4">
              {showCancelButton && (
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1 bg-red-700 text-white hover:bg-red-900"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  {cancelLabel}
                </Button>
              )}
              {showSubmitButton && (
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? "En cours..." : submitLabel}
                </Button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
